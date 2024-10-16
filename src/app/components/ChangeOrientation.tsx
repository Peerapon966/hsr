"use client";

import "@/assets/css/changeorientation.css";
import Image from "next/image";
import { useOrientation } from "@/hooks/useOrientation";
import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { OrientationContext } from "@/layouts/PageLayout";
import { TOrientation } from "@/interface";
import { disableScroll } from "@/utils/disableScroll";

export function ChangeOrientation({
  setIsUserIgnore,
}: {
  setIsUserIgnore: Function;
}) {
  const [_, getCurrentOrientation] = useOrientation();
  const optimalOrientation = useContext(OrientationContext) as TOrientation;
  const prompt = useRef<HTMLDivElement | null>(null);
  const resizeHandler = () => {
    if (!prompt.current) return;
    const currentOrientation = getCurrentOrientation(window);

    if (
      optimalOrientation !== currentOrientation &&
      optimalOrientation !== "landscape"
    ) {
      prompt.current?.classList.remove("hidden");
      prompt.current?.classList.add("fixed");
    }

    if (optimalOrientation === currentOrientation) {
      prompt.current?.classList.remove("fixed");
      prompt.current?.classList.add("hidden");
    }
  };
  const component = (
    <div
      ref={prompt}
      className="min-h-full min-w-full z-[9999] bg-[#32373b] top-0 hidden"
    >
      <div className="close-button-wrapper">
        <svg
          className="close-button"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4223"
          width="30"
          height="30"
          onClick={() => setIsUserIgnore(true)}
        >
          <path
            d="M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z"
            fill="#ffffff"
            p-id="4224"
          ></path>
        </svg>
      </div>
      <div className="content-wrapper">
        <Image
          src="/change_view/phone_icon.png"
          alt="Phone Icon"
          width={236}
          height={329}
          className="h-full w-auto phone-icon"
        />
        <span className="text">端末を縦にして閲覧してください</span>
      </div>
    </div>
  );

  useEffect(() => {
    if (optimalOrientation !== getCurrentOrientation(window)) {
      prompt.current?.classList.remove("hidden");
      prompt.current?.classList.add("fixed");
    }
  }, [optimalOrientation]);

  useEffect(() => {
    window.removeEventListener("resize", resizeHandler);
    window.addEventListener("resize", resizeHandler);
  }, [optimalOrientation]);

  useEffect(() => {
    if (prompt.current) disableScroll(prompt.current);
  }, []);

  if (typeof window === "object") {
    return createPortal(
      component,
      document.querySelector("body") as HTMLElement
    );
  }

  return component;
}
