import { ReactNode } from "react";

export type ReactBaseProps = {
  children?: ReactNode;
  params?: { locale: string };
};

export type TOrientation = "landscape" | "portrait";
