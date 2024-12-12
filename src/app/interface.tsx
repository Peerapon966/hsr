import { AVAILABLE_LOCALES, AVAILABLE_PAGES, AVAILABLE_NEWS_TYPE } from "const";
import { type news as TNews } from "@prisma/client";
import { ReactNode } from "react";

export type ReactBaseProps = {
  children?: ReactNode;
  params?: { locale: string };
};

export type TOrientation = "landscape" | "portrait";

export type TImages = {
  path: string;
  width: number;
  height: number;
};

export type TLocale = keyof typeof AVAILABLE_LOCALES;

export type TPages = (typeof AVAILABLE_PAGES)[keyof typeof AVAILABLE_PAGES];

export type TNewsType =
  (typeof AVAILABLE_NEWS_TYPE)[keyof typeof AVAILABLE_NEWS_TYPE];

export type TNewsItems = Pick<
  TNews,
  "news_id" | "title" | "intro" | "image" | "created_at"
>;
