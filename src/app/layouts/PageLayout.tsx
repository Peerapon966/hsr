"use client";

import Svg from "@/assets/Svg";
import { Header } from "@/components/Header/Header";
import { useOrientation } from "@/hooks/useOrientation";
import { ReactBaseProps, TOrientation } from "@/interface";
import dynamic from "next/dynamic";
import { createContext, Suspense, useState } from "react";
import { AVAILABLE_PAGES } from "const";

type Page = (typeof AVAILABLE_PAGES)[number];

const ChangeOrientation = dynamic(() =>
  import("@/components/ChangeOrientation").then((module) => ({
    default: module.ChangeOrientation,
  }))
);

export const OrientationContext = createContext<TOrientation | null>(null);

export function PageLayout(props: ReactBaseProps & { page: Page }) {
  const [optimalOrientation, getCurrentOrientation] = useOrientation();
  const [isUserIgnore, setIsUserIgnore] = useState<boolean>(false);

  return (
    <OrientationContext.Provider value={optimalOrientation}>
      <div
        style={{
          backgroundImage:
            props.page === "home"
              ? "url('/home/content/star_bg_home.jpg')"
              : "url('/shared/star_bg_shared.png')",
        }}
        className="bg-no-repeat bg-fixed bg-cover bg-center sticky top-0 min-w-[1270px]"
      >
        <Svg />
        {/* {!isUserIgnore && (
          <ChangeOrientation setIsUserIgnore={setIsUserIgnore} />
        )} */}
        <Header />
        {props.children}
      </div>
    </OrientationContext.Provider>
  );
}
