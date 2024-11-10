import puppeteer from "puppeteer";
import { Base, Table } from "./Base";
import { AVAILABLE_LOCALES, AVAILABLE_NEWS_TYPE } from "./const";

type TLocales = (typeof AVAILABLE_LOCALES)[keyof typeof AVAILABLE_LOCALES];
type TNewsType = (typeof AVAILABLE_NEWS_TYPE)[keyof typeof AVAILABLE_NEWS_TYPE];

type TNewsIds = {
  [key in TLocales]: string[];
} & {
  [Symbol.iterator]: () => {
    next: () => {
      value: {
        locale: TLocales;
        ids: string[];
      };
      done: boolean;
    };
  };
};

type TData = {
  sChanId: (keyof typeof AVAILABLE_NEWS_TYPE)[];
  sTitle: string;
  sIntro: string;
  sUrl: string;
  sAuthor: string;
  sContent: string;
  sExt: string;
  dtStartTime: string;
  dtEndTime: string;
  sCategoryName: string;
  sTagName: string[];
  dtCreateTime: string;
  iInfoId: number;
  around: Object;
  sSign: string;
};

type TProcessedData = {
  news_id: number;
  locale: TLocales;
  news_type: TNewsType;
  title: string;
  intro: string;
  image: string;
  content: string;
  created_at: string;
};

type TColumns = keyof TProcessedData;

const TARGET_PAGE_BASE_URL = "https://hsr.hoyoverse.com/<locale>/news";
const VERBOSE = Number(process.env.VERBOSE) === 1;
const LOCALES: TLocales[] = Object.values(AVAILABLE_LOCALES);
const BUFFER_ITEMS = 10;

class NewsSeeder extends Base {
  constructor() {
    super();
  }

  public async news() {
    for (let locale of LOCALES) {
      console.log(`[INFO] Current locale: ${locale}`);
      const newsIds = await this.scrapNewsIds([locale]);
      await this.scrapNewsContents(newsIds);
    }
  }

  protected async scrapNewsIds(locales: TLocales[]): Promise<TNewsIds> {
    console.log("[INFO] Launching a browser ...");
    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/google-chrome",
    });
    console.log("[INFO] Opening a new browser page ...");
    const page = await browser.newPage();

    console.log("[INFO] Setting viewport ...");
    await page.setViewport({ width: 1920, height: 1080 });

    const newsIds: TNewsIds = locales.reduce(
      (acc: TNewsIds, locale: TLocales) => {
        acc[locale] = [];
        return acc;
      },
      {
        [Symbol.iterator]: function () {
          const locales = Object.keys(this) as TLocales[];
          let idx = 0;
          return {
            next: () => {
              if (idx < locales.length) {
                const locale = locales[idx++];
                return {
                  value: { locale, ids: this[locale] },
                  done: false,
                };
              } else {
                return { value: undefined, done: true };
              }
            },
          };
        },
      } as TNewsIds
    );

    for (let locale of locales) {
      const targetPage = TARGET_PAGE_BASE_URL.replace("<locale>", locale);

      console.log(`[INFO] Navigating to the target page: ${targetPage} ...`);
      await page.goto(targetPage);

      console.log("[INFO] Searching for the 'Read more' button ...");
      let hasMoreNews = true;
      let count = 0;
      const moreBtn = await page.waitForSelector(
        "xpath/html/body/div[1]/div/div/div[2]/div[1]/div[4]",
        { timeout: 5000 }
      );

      console.log(
        "[INFO] Clicking on the 'Read more' button to fetch all news item ..."
      );
      while (hasMoreNews) {
        try {
          await page.evaluate((element) => {
            if (element) (element as HTMLButtonElement).click();
          }, moreBtn);
        } catch (error) {
          hasMoreNews = false;
          throw error;
        }

        if (VERBOSE) {
          count++;
          console.log(`[TRACE] Clicked on the "Read more" button (${count})`);
        }

        hasMoreNews =
          (await page.evaluate((element) => {
            if (element) return window.getComputedStyle(element).display;
          }, moreBtn)) !== "none";

        await this.wait(1000);
      }

      console.log(`[INFO] Scraped all news item for locale: ${locale}`);
      const newsContainer = await page.waitForSelector(
        "xpath/html/body/div[1]/div/div/div[2]/div[1]/div[3]"
      );

      console.log("[INFO] Extracting news ids ...");
      const localeNewsIds = await page.evaluate((element) => {
        if (element)
          return Array.from(element.children).map((news) => {
            const href = (news as HTMLAnchorElement).href.split("/");
            return href[href.length - 1];
          });
      }, newsContainer);

      console.log(`[INFO] Successfully extract news ids for locale: ${locale}`);
      if (localeNewsIds) newsIds[locale] = localeNewsIds;

      console.log("[INFO] Closing the page ...");
      await page.close();
    }

    console.log("[INFO] NewsId scraped successfully, closing the browser ...");
    await browser.close();

    return newsIds;
  }

  protected async scrapNewsContents(newsIds: TNewsIds) {
    for (let { locale, ids } of newsIds) {
      const chunkedIds = this.chunker(ids, BUFFER_ITEMS);
      for (let chunk of chunkedIds) {
        const newsContents = await Promise.all(
          chunk.map(async (id, idx) => {
            const endpoint = `https://sg-public-api-static.hoyoverse.com/content_v2_user/app/113fe6d3b4514cdd/getContent?iPage=1&iPageSize=10&sLangKey=${locale}&isPreview=0&iInfoId=${id}`;
            try {
              await this.wait(idx * 1000); // Wait 1 sec between each fetch

              if (VERBOSE)
                console.log(
                  `[TRACE] Scraping news content for locale: ${locale} and id: ${id} ...`
                );
              const response = await fetch(endpoint, {
                headers: {
                  "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Origin: "https://hsr.hoyoverse.com",
                },
              });
              const data: TData = (await response.json()).data;

              return data;
            } catch (error) {
              console.error(error);
              return null;
            }
          })
        );

        console.log(
          `[INFO] Writing items to the database | locale: ${locale} | ids: ${JSON.stringify(
            chunk
          )}`
        );
        const { columns, values } = this.generateSQL(newsContents, locale);
        await this.writeToDatabase(Table.news, columns, values);
      }
    }

    return null;
  }

  protected chunker(array: string[], chunkSize: number) {
    const chunkedArray: string[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunkedArray.push(array.slice(i, i + chunkSize));
    }

    return chunkedArray;
  }

  protected generateSQL(
    newsContents: (TData | null)[],
    locale: TLocales
  ): {
    columns: string[];
    values: (string | number)[][];
  } {
    const columns = [
      "news_id",
      "locale",
      "news_type",
      "title",
      "intro",
      "image",
      "content",
      "created_at",
    ] as TColumns[];
    const values = newsContents
      .filter((news) => news !== null)
      .map((news) => {
        const {
          iInfoId,
          sChanId,
          sTitle,
          sIntro,
          sExt,
          sContent,
          dtStartTime,
        } = news;
        const filteredContent = sContent.match(/(?<=img src.*>)(<p style.*)/g);
        const content = filteredContent ? filteredContent[0] : sContent;
        const filteredExt = sExt.match(/https.*.(jpg|jpeg|webp|png)/g);
        const ext = filteredExt ? filteredExt[0] : sExt;
        const utc0DtStartTime = new Date(dtStartTime)
          .toISOString()
          .substring(0, 19)
          .replace("T", " ");
        const value = [
          iInfoId,
          locale,
          AVAILABLE_NEWS_TYPE[sChanId[0] as keyof typeof AVAILABLE_NEWS_TYPE],
          sTitle,
          sIntro,
          ext,
          content,
          utc0DtStartTime,
        ];

        return value;
      });
    return { columns, values };
  }
}

async function handler(newsSeeder: NewsSeeder) {
  await newsSeeder.news();
  await newsSeeder.disconnect();
}

const newsSeeder = new NewsSeeder();
handler(newsSeeder);
