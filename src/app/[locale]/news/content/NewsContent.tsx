"use server";

import "@/assets/css/newscontent.css";
import { headers } from "next/headers";
import { Title } from "@/components/Title";
import { NewsItem } from "@/[locale]/news/content/NewsItem";
import { Link } from "i18n/routing";
import { type TLocale } from "@/interface";

export async function NewsContent({ locale }: { locale: TLocale }) {
  const url = headers().get("x-url");
  const queries = url
    ?.split("?")[1]
    .split("&")
    .reduce((acc: { [key: string]: string | string[] }, query) => {
      const [key, value] = query.split("=");
      Object.keys(acc).includes(key)
        ? (acc[key] =
            typeof acc[key] === "string"
              ? [acc[key], value]
              : [...acc[key], value])
        : (acc[key] = value);
      return acc;
    }, {});
  const type = queries
    ? typeof queries.type === "string"
      ? queries.type
      : queries.type[0]
    : null;
  const title =
    "Keeping up with Star Rail — Rappa: Whiteowl Ninja's Bursting Scroll | Honkai: Star Rail";
  const date = "10/16/2024";
  const content = `
    The studio is ablaze.

    "Hee-yah!" Mr. Silvergun Shura bursts into the studio set and casts Whiteowl Ninja into the provisions concoction cauldron.

    How merciless! Even the Great Lan has avoided THEIR gaze.

    Can Whiteowl Ninja thwart Mr. Silvergun Shura's incursion and forfend the outcome of becoming delicious avian wing tip?

    Thank you for tuning in to this special Interastral Peace Entertainment program, Keeping up with Star Rail — Rappa: Whiteowl Ninja's Bursting Scroll

    This is another side of the ninja world.
  `;

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center w-[17.47rem] mt-[2.61rem] mb-[2rem]">
        <div className="w-full ml-[.1rem] mb-[.6rem]">
          <Title title="Voice of the Galaxy" />
        </div>
        <div className="w-full flex font-[500] font-yahei text-[#e6e6e6] text-[.3rem]">
          <Link
            className="star flex items-center"
            href={`/news?type=news_all`}
            locale={locale}
          >
            <div
              data-type="news_all"
              className={`${
                (type === "news_all" || !type) && "text-[#dbbf91]"
              } ml-[.42rem] w-[1.5rem] mr-[.5rem]`}
            >
              Latest
            </div>
          </Link>
          <Link
            className="star flex items-center"
            href={`/news?type=news`}
            locale={locale}
          >
            <div
              data-type="news"
              className={`${
                type === "news" && "text-[#dbbf91]"
              } text-center ml-[.42rem] w-[2rem] mr-[.5rem]`}
            >
              News
            </div>
          </Link>
          <Link
            className="star flex items-center"
            href={`/news?type=events`}
            locale={locale}
          >
            <div
              data-type="events"
              className={`${
                type === "events" && "text-[#dbbf91]"
              } text-center ml-[.42rem] w-[2rem] mr-[.5rem]`}
            >
              Events
            </div>
          </Link>
          <Link
            className="flex items-center"
            href={`/news?type=notices`}
            locale={locale}
          >
            <div
              data-type="notices"
              className={`${
                type === "notices" && "text-[#dbbf91]"
              } text-center ml-[.42rem] w-[2rem] mr-[.5rem]`}
            >
              Notices
            </div>
          </Link>
        </div>
        <div className="mt-[.37rem]">
          <NewsItem
            image={{
              path: `/news/${locale}/22.png`,
              width: 1920,
              height: 1080,
            }}
            title={title}
            info={{ date }}
            content={content}
            id={22}
            locale={locale}
          />
          <NewsItem
            image={{
              path: `/news/${locale}/22.png`,
              width: 1920,
              height: 1080,
            }}
            title={title}
            info={{ date }}
            content={content}
            id={22}
            locale={locale}
          />
          <NewsItem
            image={{
              path: `/news/${locale}/22.png`,
              width: 1920,
              height: 1080,
            }}
            title={title}
            info={{ date }}
            content={content}
            id={22}
            locale={locale}
          />
          <NewsItem
            image={{
              path: `/news/${locale}/22.png`,
              width: 1920,
              height: 1080,
            }}
            title={title}
            info={{ date }}
            content={content}
            id={22}
            locale={locale}
          />
          <NewsItem
            image={{
              path: `/news/${locale}/22.png`,
              width: 1920,
              height: 1080,
            }}
            title={title}
            info={{ date }}
            content={content}
            id={22}
            locale={locale}
          />
          <NewsItem
            image={{
              path: `/news/${locale}/22.png`,
              width: 1920,
              height: 1080,
            }}
            title={title}
            info={{ date }}
            content={content}
            id={22}
            locale={locale}
          />
        </div>
        <div className="flex justify-center items-center w-[17.47rem] h-[.48rem] mt-[.6rem] mb-[1rem] cursor-pointer select-none bg-[rgba(74,74,74,.5)] font-yahei text-[#e6e6e6] text-[.2rem] border border-[rgba(230,230,230,.5)]">
          Read more
        </div>
      </div>
    </div>
  );
}
