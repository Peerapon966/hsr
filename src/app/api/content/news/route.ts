import { NextRequest, NextResponse } from "next/server";
import { FetchNewsItemsProps } from "@/services/content/fetchNewsItems";
import { prisma } from "@/api/utils/prisma";
import { createClient, RedisClientType } from "redis";
import { createHash } from "crypto";
import { FetchNewsItemsResponse } from "@/services/content/fetchNewsItems";
import { Logger } from "@/logger";

export async function GET(
  req: NextRequest
): Promise<NextResponse<FetchNewsItemsResponse>> {
  let client: RedisClientType | undefined;
  let cacheKey: string | undefined;
  const params = Object.fromEntries(req.nextUrl.searchParams.entries());
  const { locale, startFromId, newsType } = Object.entries(params).reduce(
    (acc: { [key: string]: any }, [key, value]) => {
      if (value === "") {
        acc[key] = undefined;
      } else if (!isNaN(Number(value))) {
        acc[key] = Number(value);
      } else {
        acc[key] = value;
      }

      return acc;
    },
    {}
  ) as FetchNewsItemsProps;

  if (!startFromId) {
    cacheKey = await getCacheKey({ locale, newsType });

    try {
      client = createClient({
        url: process.env.REDIS_URL,
      });
      await client.connect();

      const cachedNewsItems = await client.get(cacheKey);

      if (cachedNewsItems) {
        await client.disconnect();
        return NextResponse.json(
          JSON.parse(cachedNewsItems) as FetchNewsItemsResponse,
          {
            status: 200,
          }
        );
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
    take: 6,
  });

  const result: FetchNewsItemsResponse = {
    newsItems: newsItems.slice(0, 5),
    hasMore: newsItems.length > 5 ? true : false,
  };

  if (!startFromId && client && cacheKey) {
    try {
      await client.set(cacheKey, JSON.stringify(result));
    } catch (error) {
      console.error("Redis set error:", error);
    } finally {
      await client.disconnect();
    }
  }

  return NextResponse.json(result, { status: 200 });
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
