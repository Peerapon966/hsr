"use client";

import Svg from "@/assets/Svg";
import { Header } from "@/components/Header/Header";
import { useOrientation } from "@/hooks/useOrientation";
import { ReactBaseProps, TOrientation } from "@/interface";
import dynamic from "next/dynamic";
import { createContext, Suspense, useState } from "react";

const ChangeOrientation = dynamic(() =>
  import("@/components/ChangeOrientation").then((module) => ({
    default: module.ChangeOrientation,
  }))
);

export const OrientationContext = createContext<TOrientation | null>(null);

export function PageLayout(props: ReactBaseProps) {
  const [optimalOrientation, getCurrentOrientation] = useOrientation();
  const [isUserIgnore, setIsUserIgnore] = useState<boolean>(false);

  return (
    <OrientationContext.Provider value={optimalOrientation}>
      <div className="bg-[url('/shared/star_bg.a353121.jpg')] bg-no-repeat bg-fixed sticky top-0 min-w-[1270px]">
        <Svg />
        {!isUserIgnore && (
          <ChangeOrientation setIsUserIgnore={setIsUserIgnore} />
        )}
        <Header />
        {props.children}
      </div>
    </OrientationContext.Provider>
  );
}
