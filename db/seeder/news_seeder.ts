import puppeteer from "puppeteer";
import { AVAILABLE_LOCALES, AVAILABLE_NEWS_TYPE } from "const";

const TARGET_PAGE = "https://hsr.hoyoverse.com/en-us/news";
const VERBOSE = Number(process.env.VERBOSE) === 1;
const LOCALES = ["en-us", "ja-jp"];

class NewsSeeder {
  public async news() {
    const newsIds = await this.scrapNewsIds();
    await this.fetchNewsContent(newsIds, LOCALES);
  }

  protected async scrapNewsIds(): Promise<string[]> {
    console.log("Launching a browser page ...");
    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/google-chrome",
    });
    const page = await browser.newPage();

    console.log(`Navigating to the target page: ${TARGET_PAGE} ...`);
    await page.goto(TARGET_PAGE);
    await page.setViewport({ width: 1920, height: 1080 });

    console.log("Searching for the 'Read more' button ...");
    let hasMoreNews = true;
    let count = 0;
    const moreBtn = await page.waitForSelector(
      "xpath/html/body/div[1]/div/div/div[2]/div[1]/div[4]",
      { timeout: 1000 }
    );

    console.log(
      "Clicking on the 'Read more' button to fetch all news item ..."
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
        console.log(`Clicked on the "Read more" button (${count})`);
      }

      hasMoreNews =
        (await page.evaluate((element) => {
          if (element) return window.getComputedStyle(element).display;
        }, moreBtn)) !== "none";

      await this.wait(1000);
    }

    console.log("Scraped all news item");
    const newsContainer = await page.waitForSelector(
      "xpath/html/body/div[1]/div/div/div[2]/div[1]/div[3]"
    );

    console.log("Extracting news ids ...");
    const newsIds = await page.evaluate((element) => {
      if (element)
        return Array.from(element.children).map((news) => {
          const href = (news as HTMLAnchorElement).href.split("/");
          return href[href.length - 1];
        });
    }, newsContainer);

    console.log("NewsId scraped successfully, closing the browser ...");
    await browser.close();

    return newsIds ? newsIds : [];
  }

  protected async fetchNewsContent(newsIds: string[], locales: string[]) {
    let count = 0;
    await Promise.all(
      locales.map(async (locale) => {
        const newsContents = await Promise.all(
          newsIds.map(async (id) => {
            const endpoint = `https://sg-public-api-static.hoyoverse.com/content_v2_user/app/113fe6d3b4514cdd/getContent?iPage=1&iPageSize=10&sLangKey=${locale}&isPreview=0&iInfoId=${id}`;
            try {
              count++;
              await this.wait(count * 1000); // Wait 1 sec between each fetch

              if (VERBOSE)
                console.log(
                  `Fetched news content for locale: ${locale} and id: ${id}`
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
              const data = await response.json();

              return data.data;
            } catch (error) {
              console.error(error);
              return null;
            }
          })
        );

        console.log({ [locale]: newsContents });

        // exportNewsContents({ [locale]: newsContents });

        return null;
      })
    );
  }

  protected async wait(ms: number) {
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        resolve();
      }, ms)
    );
  }

  protected async writeToDatabase() {}
}

const newsSeeder = new NewsSeeder();
newsSeeder.news();
