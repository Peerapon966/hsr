"use server";

import { prisma } from "@/api/utils/prisma";
import { TLocale, TNewsType } from "@/interface";

export type FetchNewsItemsProps = {
  locale: TLocale;
  startFromId?: number;
  newsType?: TNewsType;
};

export async function fetchNewsItems({
  locale,
  startFromId,
  newsType,
}: FetchNewsItemsProps) {
  const newsItems = await prisma.news.findMany({
    select: {
      news_id: true,
      title: true,
      intro: true,
      image: true,
      created_at: true,
    },
    where: {
      locale: {
        equals: locale,
      },
      news_id: {
        lt: startFromId,
      },
      news_type: {
        equals: newsType,
      },
    },
    orderBy: [
      {
        created_at: "desc",
      },
      {
        news_id: "desc",
      },
    ],
    take: 5,
  });

  return newsItems;
}
