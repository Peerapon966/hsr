"use server";

import "@/assets/css/newsdetailcontent.css";
import { TLocale } from "@/interface";
import { Link } from "i18n/routing";
import Image from "next/image";
import { TopNewsItem } from "@/[locale]/news/[id]/content/TopNewsItem";
import { prisma } from "@/api/utils/prisma";
import { notFound } from "next/navigation";

type NewsId = { news_id: number };

type NewsDetailContentProps = {
  locale: TLocale;
  newsId: number;
};

export async function NewsDetailContent({
  locale,
  newsId,
}: NewsDetailContentProps) {
  const newsContent = await prisma.news.findFirst({
    select: {
      title: true,
      image: true,
      content: true,
      created_at: true,
    },
    where: {
      news_id: {
        equals: newsId ? Number(newsId) : undefined,
      },
      locale: {
        equals: locale,
      },
    },
  });

  if (!newsContent) notFound();

  const { title, image, content, created_at } = newsContent;
  const [prevNewsId, nextNewsId]: NewsId[] = await prisma.$queryRaw`
    SELECT news_id 
    FROM news
    WHERE locale = ${locale} AND (
      news_id = (SELECT MAX(news_id) FROM news WHERE locale = ${locale} AND news_id < ${newsId}) OR
      news_id = (SELECT MIN(news_id) FROM news WHERE locale = ${locale} AND news_id > ${newsId})
    )
  `;
  return (
    <div className="flex flex-col items-center pt-[2.2rem]">
      <Link
        className="flex justify-center items-center w-[2.6rem] h-[.48rem] ml-[1.98rem] mr-auto text-[.2rem] text-[rgba(230,230,230,.5)] font-yahei border border-[rgba(230,230,230,.5)] hover:bg-[rgba(230,230,230,.4)]"
        href={"/news"}
        locale={locale}
      >
        <div>Back</div>
      </Link>
      <div className="flex items-start mt-[.57rem]">
        <div className="border-t-[.1rem] border-t-[#dbbf91] w-[12.32rem] bg-[#dee3ec] mb-[.4rem] px-[.49rem] font-yahei text-[#1e1e1e] leading-[.36rem]">
          <div className="text-[.42rem] leading-[.5rem] mt-[1.15rem] mb-[.15rem]">
            {title}
          </div>
          <div className="text-center text-[.22rem] text-[#9c9c9c]">
            {created_at.toLocaleDateString()}
          </div>
          <div className="news-detail-intro mt-[.3rem] text-[.24rem] font-yahei">
            <p>
              <Image
                src={image}
                alt="banner image"
                width={1920}
                height={1080}
                className="w-full h-auto"
              ></Image>
            </p>
          </div>
          <div
            className="news-detail-content mb-[.2rem] text-[.24rem] font-yahei"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
          <div className="flex h-[.67rem] my-[.67rem] px-[.98rem]">
            {/* TODO: on the last page, prev btn appears instead of next btn */}
            {nextNewsId && (
              <Link
                className="select-none"
                href={`/news/${nextNewsId.news_id}`}
                locale={locale}
              >
                <Image
                  src={"/news/dark_left_arrow_btn.png"}
                  alt="button"
                  width={67}
                  height={67}
                  className="h-full w-auto"
                  priority
                  draggable={false}
                />
              </Link>
            )}
            {prevNewsId && (
              <Link
                className="select-none ml-auto"
                href={`/news/${prevNewsId.news_id}`}
                locale={locale}
              >
                <Image
                  src={"/news/dark_right_arrow_btn.png"}
                  alt="button"
                  width={67}
                  height={67}
                  className="h-full w-auto"
                  priority
                  draggable={false}
                />
              </Link>
            )}
          </div>
        </div>
        <div className="border-t-[.1rem] border-t-[#dbbf91] w-[4.87rem] ml-[.6rem] bg-[#dee3ec] select-none text-[#1e1e1e]">
          <div className="h-[.52rem] mt-[.63rem] text-[.22rem] text-center">
            Latest News
          </div>
          <TopNewsItem locale={locale} currentNewsId={newsId} />
        </div>
      </div>
    </div>
  );
}
