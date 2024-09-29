"use client";

import { ReactBaseProps } from "@/interface";
import { useState, useContext, useRef, useEffect } from "react";
import { SwiperContext, TSwiperContext } from "./Swiper";

export function Scroller({ children }: ReactBaseProps) {
  const [componentDidMount, setComponentDidMount] = useState<boolean>(false);
  const { minimumScrollDistance } = useContext(SwiperContext) as TSwiperContext;
  const content = useRef<HTMLElement | null>(null);
  const scrollAmountPerScroll: number = 50;
  let scrollAmount: number = 0;
  let initialClientY: number = 0;
  let finalClientY: number = 0;

  const wheelScrollHandler = (e: WheelEvent) => {
    e.preventDefault();
    if (!content.current) return;

    // propagate event back to the Swiper component
    if (scrollAmount >= 0 && e.deltaY < 0) {
      scrollAmount = 0;
      return;
    }

    // scroll up/down [scrollAmountPerScroll] px at a time
    if (scrollAmount < 0) e.stopPropagation();

    const maxScrollAmount = window.innerHeight - content.current?.clientHeight;
    e.deltaY > 0
      ? (scrollAmount -= Math.min(
          Math.abs(maxScrollAmount - scrollAmount),
          scrollAmountPerScroll
        ))
      : (scrollAmount += Math.min(
          Math.abs(scrollAmount),
          scrollAmountPerScroll
        ));
    content.current.style.transform = `translate3d(0, ${scrollAmount}px, 0)`;
  };
  const setInitialClientY = (e: TouchEvent) => {
    initialClientY = e.touches[0].clientY;
  };
  const setFinalClientY = (e: TouchEvent) => {
    finalClientY = e.touches[0].clientY;
    content.current!.style.transform = `translate3d(0, ${
      scrollAmount - (initialClientY - finalClientY)
    }px, 0)`;
  };
  const TouchmoveScrollHandler = (e: TouchEvent) => {
    if (!content.current) return;

    // memorize current scrollAmount
    scrollAmount -= initialClientY - finalClientY;

    if (scrollAmount <= 0) e.stopPropagation();

    if (scrollAmount > 0) {
      content.current.style.transitionDuration = "300ms";
      content.current.style.transform = "translate3d(0, 0, 0)";
      if (scrollAmount < 2 * minimumScrollDistance) e.stopPropagation();
      scrollAmount = 0;
    }

    const maxScrollAmount = window.innerHeight - content.current?.clientHeight;
    if (scrollAmount < maxScrollAmount) {
      e.stopPropagation();
      content.current.style.transitionDuration = "300ms";
      content.current.style.transform = `translate3d(0, ${maxScrollAmount}px, 0)`;
      scrollAmount = maxScrollAmount;
    }
  };

  useEffect(() => {
    if (!componentDidMount) return;

    content.current?.addEventListener("wheel", wheelScrollHandler, false);

    content.current?.addEventListener("touchstart", setInitialClientY, false);
    content.current?.addEventListener("touchmove", setFinalClientY, false);
    content.current?.addEventListener(
      "touchend",
      TouchmoveScrollHandler,
      false
    );

    content.current?.addEventListener(
      "transitionend",
      (e) => ((e.currentTarget as HTMLElement).style.transitionDuration = "0ms")
    );
  }, [componentDidMount]);

  useEffect(() => {
    setComponentDidMount(true);
  }, []);

  return <section ref={content}>{children}</section>;
}
