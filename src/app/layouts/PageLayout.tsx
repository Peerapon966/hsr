"use client";

import Svg from "@/assets/Svg";
import { Header } from "@/components/Header/Header";
import { useOrientation } from "@/hooks/useOrientation";
import {
  type ReactBaseProps,
  type TOrientation,
  type TPages,
} from "@/interface";
import dynamic from "next/dynamic";
import { createContext, useEffect, useState } from "react";
import { usePathname } from "i18n/routing";
import { useSearchParams } from "next/navigation";
import { enableScrollWithKeyDown } from "@/utils/disableScroll";

export type TPageContext = {
  currentPage: TPages;
  queryString: string;
};

const ChangeOrientation = dynamic(() =>
  import("@/components/ChangeOrientation").then((module) => ({
    default: module.ChangeOrientation,
  }))
);

export const OrientationContext = createContext<TOrientation | null>(null);
export const PageContext = createContext<TPageContext | null>(null);

export function PageLayout(props: ReactBaseProps) {
  let queryString = "";
  const currentPage = usePathname().split("/")[1] as TPages;
  const searchParams = useSearchParams();
  const [optimalOrientation, getCurrentOrientation] = useOrientation();
  const [isUserIgnore, setIsUserIgnore] = useState<boolean>(false);

  searchParams.forEach((value, key) => {
    queryString += queryString === "" ? `?${key}=${value}` : `&${key}=${value}`;
  });

  useEffect(() => {
    if (currentPage !== "home") enableScrollWithKeyDown();
  }, [currentPage]);

  return (
    <PageContext.Provider value={{ currentPage, queryString } as TPageContext}>
      <OrientationContext.Provider value={optimalOrientation}>
        <div
          style={{
            backgroundImage:
              currentPage === "home"
                ? "url('/home/content/star_bg_home.jpg')"
                : "url('/shared/star_bg_shared.png')",
          }}
          className="bg-no-repeat bg-fixed bg-cover bg-center min-w-[1270px]"
        >
          <Svg />
          {!isUserIgnore && (
            <ChangeOrientation setIsUserIgnore={setIsUserIgnore} />
          )}
          <Header />
          {props.children}
        </div>
      </OrientationContext.Provider>
    </PageContext.Provider>
  );
}
