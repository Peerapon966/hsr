"use client";

import { disableScrollWithKeyDown } from "@/utils/disableScroll";
import { ReactBaseProps } from "@/interface";
import { useEffect, useRef, useState } from "react";
import { scrollToTop } from "@/utils/scrollToTop";
import { createContext } from "react";

export type TSwiperContext = {
  minimumScrollDistance: number;
};

export const SwiperContext = createContext<TSwiperContext | undefined>(
  undefined
);

export function Swiper({ children }: ReactBaseProps) {
  const [componentDidMount, setComponentDidMount] = useState<boolean>(false);
  const swiper = useRef<HTMLElement | null>(null);
  const swiperThrottlingTime = 200;
  const minimumScrollDistance = 100;
  let isSwiperReady: boolean = true;
  let isSwiperActive: boolean = false;
  let initialClientY: number = 0;
  let finalClientY: number = 0;

  const wheelSnapScrollHandler = (e: WheelEvent) => {
    e.preventDefault();
    if (!isSwiperReady) return;

    if (!isSwiperActive && e.deltaY > 0) {
      swiper.current?.classList.add("active");
      isSwiperActive = true;
    }

    if (e.deltaY < 0) {
      swiper.current?.classList.remove("active");
      isSwiperActive = false;
    }
  };
  const setInitialClientY = (e: TouchEvent) => {
    initialClientY = e.touches[0].clientY;
  };
  const setFinalClientY = (e: TouchEvent) => {
    finalClientY = e.touches[0].clientY;
  };
  const touchSnapScrollHandler = (e: TouchEvent) => {
    if (!isSwiperReady) return;

    const scrollDistance = initialClientY - finalClientY;
    if (!isSwiperActive && scrollDistance >= minimumScrollDistance) {
      swiper.current?.classList.add("active");
      isSwiperActive = true;
    }

    if (isSwiperActive && scrollDistance <= -minimumScrollDistance) {
      console.log(scrollDistance);
      swiper.current?.classList.remove("active");
      isSwiperActive = false;
    }
  };

  useEffect(() => {
    setComponentDidMount(true);
  }, []);

  useEffect(() => {
    isSwiperActive
      ? swiper.current?.classList.add("active")
      : swiper.current?.classList.remove("active");
  }, [isSwiperActive]);

  useEffect(() => {
    if (!componentDidMount) return;

    // disable scroll via mousewheel and keyboard
    disableScrollWithKeyDown();
    swiper.current?.addEventListener("wheel", wheelSnapScrollHandler, false);

    // disable scroll via touchmove
    swiper.current?.addEventListener("touchstart", setInitialClientY, false);
    swiper.current?.addEventListener("touchmove", setFinalClientY, false);
    swiper.current?.addEventListener("touchend", touchSnapScrollHandler, false);

    // throttle swiper transition
    swiper.current?.addEventListener(
      "transitionstart",
      () => (isSwiperReady = false)
    );
    swiper.current?.addEventListener("transitionend", () =>
      setTimeout(() => {
        isSwiperReady = true;
      }, swiperThrottlingTime)
    );
  }, [componentDidMount]);

  useEffect(() => {
    scrollToTop();
  }, [componentDidMount]);

  return (
    <SwiperContext.Provider value={{ minimumScrollDistance }}>
      <div className="overflow-hidden">
        <main ref={swiper} className="swiper-wrapper">
          {children}
        </main>
      </div>
    </SwiperContext.Provider>
  );
}
