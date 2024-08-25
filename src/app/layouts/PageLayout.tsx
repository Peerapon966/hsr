import "@/assets/css/page.css";
import Svg from "@/assets/Svg";
import { Header } from "@/components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import { ReactBaseProps } from "@/interface";
import { useBOMObject } from "@/hooks/useBOMObject";
import { useState } from "react";
import dynamic from "next/dynamic";

const ChangeView = dynamic(() =>
  import("src/app/components/ChangeView").then((module) => ({
    default: module.ChangeView,
  }))
);

export function PageLayout(props: ReactBaseProps) {
  const [displayChangeViewPrompt, setDisplayChangeViewPrompt] =
    useState<boolean>(false);
  const [innerWidth, innerHeight] = useBOMObject<[number, number]>([
    { object: "window", property: "innerWidth" },
    { object: "window", property: "innerHeight" },
  ]);
  const layout: string = innerWidth < innerHeight ? "portrait" : "landscape";
  const closeChangeViewPrompt = () => {
    setDisplayChangeViewPrompt(false);
  };
  const displayChangeView = () => {
    setDisplayChangeViewPrompt(true);
  };

  useBOMObject([
    {
      object: "window",
      property: "addEventListener",
      args: { event: "orientationchange", callback: displayChangeView },
    },
  ]);

  return (
    <div className="page-container">
      <Svg />
      {displayChangeViewPrompt && (
        <ChangeView layout={layout} closePrompt={closeChangeViewPrompt} />
      )}
      <Header />
      {props.children}
    </div>
  );
}
