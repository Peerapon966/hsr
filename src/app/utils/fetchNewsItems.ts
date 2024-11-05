"use server";

import { prisma } from "@/api/utils/prisma";
import { TLocale, TNewsItems, TNewsType } from "@/interface";
import { createClient } from "redis";

export type FetchNewsItemsProps = {
  locale: TLocale;
  startFromId?: number;
  newsType?: TNewsType;
};

// 'latestItems' JSON.stringify(results) ttl=300

export async function fetchNewsItems({
  locale,
  startFromId,
  newsType,
}: FetchNewsItemsProps): Promise<TNewsItems[]> {
  // try {
  //   const client = createClient()
  //   await client.connect()
  // } catch (error) {

  // }
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
      news_type: {
        equals: newsType,
      },
      news_id: {
        lt: startFromId,
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
