"use server";

import { prisma } from "@/api/utils/prisma";
import { TLocale, TNewsItems, TNewsType } from "@/interface";
import { createClient, RedisClientType } from "redis";
import { createHash } from "crypto";

export type FetchNewsItemsProps = {
  locale: TLocale;
  startFromId?: number;
  newsType?: TNewsType;
};

export async function fetchNewsItems({
  locale,
  startFromId,
  newsType,
}: FetchNewsItemsProps): Promise<TNewsItems[]> {
  let client: RedisClientType | undefined;
  let cacheKey: string | undefined;

  if (!startFromId) {
    cacheKey = await getCacheKey({ locale, newsType });

    try {
      client = createClient({
        url: "redis://default:P@ssw0rd@localhost:6379",
      });
      await client.connect();

      const cachedNewsItems = await client.get(cacheKey);

      if (cachedNewsItems) {
        await client.disconnect();
        return JSON.parse(cachedNewsItems) as TNewsItems[];
      }
    } catch (error) {
      console.error("Redis fetch error:", error);
    }
  }

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
        news_id: "desc",
      },
    ],
    take: 5,
  });

  if (!startFromId && client && cacheKey) {
    try {
      await client.set(cacheKey, JSON.stringify(newsItems));
    } catch (error) {
      console.error("Redis set error:", error);
    } finally {
      await client.disconnect();
    }
  }

  return newsItems;
}

async function getCacheKey({
  locale,
  newsType,
}: Omit<FetchNewsItemsProps, "startFromId">) {
  const fiveLatestNewsIds = (
    await prisma.news.findMany({
      select: {
        news_id: true,
      },
      where: {
        locale: {
          equals: locale,
        },
        news_type: {
          equals: newsType,
        },
      },
      orderBy: [
        {
          news_id: "desc",
        },
      ],
      take: 5,
    })
  ).map(({ news_id }) => news_id);
  const cacheKey = createHash("sha256")
    .update([locale, newsType, ...fiveLatestNewsIds].join("_"))
    .digest("hex");

  return cacheKey;
}
