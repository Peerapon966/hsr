"use client";

import "@/assets/css/newscontent.css";
import { Title } from "@/components/Title";
import { NewsItem } from "@/[locale]/news/content/NewsItem";
import { Link } from "i18n/routing";
import { TNewsType, type TLocale, type TNewsItems } from "@/interface";
import { AVAILABLE_NEWS_TYPE } from "const";
import { notFound, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { fetchNewsItems } from "@/services/content/fetchNewsItems";

export function NewsContent() {
  const params = useSearchParams();
  const currentNewsType = (params.get("type") as TNewsType) ?? "news_all";

  if (!Object.values(AVAILABLE_NEWS_TYPE).includes(currentNewsType)) notFound();

  const locale = useLocale() as TLocale;
  const initialized = useRef(false);
  const prevNewsType = useRef<TNewsType>(currentNewsType);
  const [newsItems, setNewsItems] = useState<TNewsItems[]>([]);
  const [currendNewsId, setCurrentNewsId] = useState<number>();
  const [hasMore, setHasMore] = useState<boolean>(false);
  const getNewsItems = async (
    locale: TLocale,
    newsType: TNewsType,
    startFromId?: number
  ) => {
    const { newsItems: fetchedNewsItems, hasMore } = await fetchNewsItems({
      locale,
      startFromId,
      newsType: newsType === "news_all" ? undefined : newsType,
    });

    setHasMore(hasMore);
    newsType === prevNewsType.current
      ? setNewsItems((newsItems) => newsItems.concat(fetchedNewsItems))
      : setNewsItems(fetchedNewsItems);
    if (hasMore)
      setCurrentNewsId(fetchedNewsItems[fetchedNewsItems.length - 1].news_id);
    prevNewsType.current = newsType;
  };

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      getNewsItems(locale, currentNewsType);
    }
  }, [currentNewsType]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center w-[17.47rem] mt-[2.61rem] mb-[2rem]">
        <div className="w-full ml-[.1rem] mb-[.6rem]">
          <Title title="Voice of the Galaxy" />
        </div>
        <div className="w-full flex font-[500] font-yahei text-[#e6e6e6] text-[.3rem]">
          {Object.entries(AVAILABLE_NEWS_TYPE).map(([menu, newsType], idx) => (
            <Link
              key={newsType}
              onClick={() => (initialized.current = false)}
              className="star flex items-center select-none"
              href={`/news?type=${newsType}`}
              locale={locale}
            >
              <div
                data-type={newsType}
                className={`${
                  currentNewsType === newsType && "text-[#dbbf91]"
                } ${
                  idx !== 0
                    ? "text-center ml-[.42rem] w-[2rem] mr-[.5rem]"
                    : "ml-[.42rem] w-[1.5rem] mr-[.5rem]"
                }`}
              >
                {menu}
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-[.37rem] min-h-[calc(2.79rem*5)]">
          {newsItems.map(({ news_id, title, intro, image, created_at }) => {
            const [y, m, d] = new Date(created_at)
              .toLocaleDateString()
              .split("/");
            const date = [m, d, y].join("/");
            return (
              <NewsItem
                key={news_id}
                image={{
                  path: image,
                  width: 1920,
                  height: 1080,
                }}
                title={title}
                info={{ date }}
                content={intro}
                id={news_id}
                locale={locale}
              />
            );
          })}
        </div>
        {hasMore && (
          <div
            onClick={() => getNewsItems(locale, currentNewsType, currendNewsId)}
            className="flex justify-center items-center w-[17.47rem] h-[.48rem] mt-[.6rem] mb-[1rem] cursor-pointer select-none bg-[rgba(74,74,74,.5)] font-yahei text-[#e6e6e6] text-[.2rem] border border-[rgba(230,230,230,.5)]"
          >
            Read more
          </div>
        )}
      </div>
    </div>
  );
}
