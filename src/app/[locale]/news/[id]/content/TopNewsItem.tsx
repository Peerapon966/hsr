"use server";

import { Link } from "i18n/routing";
import Image from "next/image";
import { type TLocale } from "@/interface";
import { fetchNewsItems } from "@/utils/fetchNewsItems";

export type TopNewsItemProps = {
  locale: TLocale;
  currentNewsId: number;
};

export async function TopNewsItem({ locale, currentNewsId }: TopNewsItemProps) {
  const newsItems = await fetchNewsItems({ locale });
  return newsItems
    .filter((item) => item.news_id !== currentNewsId)
    .map(({ news_id, title, image, created_at }) => (
      <Link
        key={news_id}
        className="flex flex-col font-yahei px-[.24rem] mt-[.33rem] mb-[.37rem]"
        href={`/news/${news_id}`}
        locale={locale}
      >
        <div className="flex">
          <div className="w-[1.94rem]">
            <Image
              src={image}
              alt={`Image for the news with title of ${title}`}
              width={1920}
              height={1080}
              className="w-full h-auto"
            />
          </div>
          <div className="w-[2.27rem] px-[.08rem] text-[.18rem] text-[#1e1e1e] leading-[.25rem]">
            {title}
          </div>
        </div>
        <div className="mr-[.25rem] text-right text-[#9c9c9c] text-[.16rem]">
          {new Date(created_at).toLocaleDateString()}
        </div>
      </Link>
    ));
}
