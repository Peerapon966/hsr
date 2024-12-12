"use server";

import { TLocale, TNewsItems, TNewsType } from "@/interface";

export type FetchNewsItemsProps = {
  locale: TLocale;
  startFromId?: number;
  newsType?: TNewsType;
};

export type FetchNewsItemsResponse = {
  newsItems: TNewsItems[];
  hasMore: boolean;
};

export async function fetchNewsItems({
  locale,
  startFromId,
  newsType,
}: FetchNewsItemsProps): Promise<FetchNewsItemsResponse> {
  const endpoint =
    `${process.env.BASE_URL}/api/content/news?` +
    new URLSearchParams({
      locale,
      startFromId: startFromId?.toString() ?? "",
      newsType: newsType ?? "",
    }).toString();
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/JSON",
    },
    cache: "no-cache",
  });
  const data = await response.json();

  return data;
}
