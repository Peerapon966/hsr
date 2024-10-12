import { ReactBaseProps } from "@/interface";
import { Link } from "i18n/routing";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useEffect, useRef } from "react";

export function Carousel({ children }: ReactBaseProps) {
  const locale = useLocale();
  const slideWidth = useRef<number>(0);
  const numberOfSlides = useRef<number>(0);
  const numberOfHeadDupSlides = useRef<number>(0);
  const isSwiperReady = useRef<boolean>(false);
  const currentPosition = useRef<number>(0);
  const slides = useRef<Node[] | null>(null);
  const firstSlide = useRef<Element | null>(null);
  const slidesWrapper = useRef<HTMLDivElement | null>(null);
  const currentSlide = useRef<HTMLSpanElement | null>(null);
  const totalSlides = useRef<HTMLSpanElement | null>(null);
  const resizeHandler = () => {
    if (!slidesWrapper.current || !isSwiperReady.current || !firstSlide.current)
      return;

    slideWidth.current = firstSlide.current.clientWidth;
    slidesWrapper.current.style.transform = `translateX(${
      currentPosition.current * slideWidth.current * -1
    }px)`;
  };
  const goToNextSlide = () => {
    if (
      !slidesWrapper.current ||
      !currentSlide.current ||
      !slides.current ||
      !isSwiperReady.current
    )
      return;

    (
      slides.current[currentPosition.current].firstChild as HTMLDivElement
    ).dataset.main = "false";
    currentPosition.current += 1;
    (
      slides.current[currentPosition.current].firstChild as HTMLDivElement
    ).dataset.main = "true";

    const newCurrentSlide = Math.abs(
      (currentPosition.current + numberOfHeadDupSlides.current) %
        numberOfSlides.current
    );
    currentSlide.current.innerText = (
      newCurrentSlide === 0 ? 5 : newCurrentSlide
    )
      .toString()
      .padStart(2, "0");
    slidesWrapper.current.style.transitionDuration = "300ms";
    slidesWrapper.current.style.transform = `translateX(${
      currentPosition.current * slideWidth.current * -1
    }px)`;
  };
  const goToPrevSlide = () => {
    if (
      !slidesWrapper.current ||
      !currentSlide.current ||
      !slides.current ||
      !isSwiperReady.current
    )
      return;

    (
      slides.current[currentPosition.current].firstChild as HTMLDivElement
    ).dataset.main = "false";
    currentPosition.current -= 1;
    (
      slides.current[currentPosition.current].firstChild as HTMLDivElement
    ).dataset.main = "true";

    const newCurrentSlide = Math.abs(
      (currentPosition.current + numberOfHeadDupSlides.current) %
        numberOfSlides.current
    );
    currentSlide.current.innerText = (
      newCurrentSlide === 0 ? 5 : newCurrentSlide
    )
      .toString()
      .padStart(2, "0");
    slidesWrapper.current.style.transitionDuration = "300ms";
    slidesWrapper.current.style.transform = `translateX(${
      currentPosition.current * slideWidth.current * -1
    }px)`;
  };
  const transitionStartHandler = () => {
    isSwiperReady.current = false;
  };
  const transitionEndHandler = () => {
    if (!slidesWrapper.current || !slides.current) return;

    slidesWrapper.current.style.transitionDuration = "0ms";

    if (currentPosition.current <= 0) {
      (
        slides.current[currentPosition.current].firstChild as HTMLDivElement
      ).dataset.main = "false";
      currentPosition.current = numberOfSlides.current;
      (
        slides.current[currentPosition.current].firstChild as HTMLDivElement
      ).dataset.main = "true";
      slidesWrapper.current.style.transform = `translateX(${
        currentPosition.current * slideWidth.current * -1
      }px)`;
    }

    if (
      currentPosition.current >=
      numberOfSlides.current + numberOfHeadDupSlides.current - 1
    ) {
      (
        slides.current[currentPosition.current].firstChild as HTMLDivElement
      ).dataset.main = "false";
      currentPosition.current -= numberOfSlides.current;
      (
        slides.current[currentPosition.current].firstChild as HTMLDivElement
      ).dataset.main = "true";
      slidesWrapper.current.style.transform = `translateX(${
        currentPosition.current * slideWidth.current * -1
      }px)`;
    }

    isSwiperReady.current = true;
  };

  useEffect(() => {
    if (!slidesWrapper.current || !currentSlide.current || !totalSlides.current)
      return;
    if (
      slidesWrapper.current?.querySelectorAll(".carousel-item").length ===
      numberOfSlides.current * 2
    )
      return;

    const carouselItems = Array.from(
      slidesWrapper.current?.querySelectorAll(
        ".carousel-item"
      ) as NodeListOf<Element>
    );
    const dupCarouselItems = carouselItems.map((item) => item.cloneNode(true));
    const firstHalfItems = dupCarouselItems.slice(
      0,
      Math.floor(dupCarouselItems.length / 2)
    );
    const secondHalfItems = dupCarouselItems.slice(
      Math.floor(dupCarouselItems.length / 2)
    );

    slidesWrapper.current.prepend(...secondHalfItems);
    slidesWrapper.current.append(...firstHalfItems);

    slides.current = [...secondHalfItems, ...carouselItems, ...firstHalfItems];

    firstSlide.current = carouselItems[0];
    numberOfSlides.current = carouselItems.length;
    slideWidth.current = firstSlide.current.clientWidth;
    numberOfHeadDupSlides.current = secondHalfItems.length;
    currentPosition.current = numberOfHeadDupSlides.current;

    (
      slides.current[currentPosition.current].firstChild as HTMLDivElement
    ).dataset.main = "true";

    slidesWrapper.current.style.transform = `translateX(${
      currentPosition.current * slideWidth.current * -1
    }px)`;

    currentSlide.current.innerText = Math.abs(
      (currentPosition.current + numberOfHeadDupSlides.current) %
        numberOfSlides.current
    )
      .toString()
      .padStart(2, "0");
    totalSlides.current.innerText = numberOfSlides.current
      .toString()
      .padStart(2, "0");

    isSwiperReady.current = true;
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    slidesWrapper.current?.addEventListener(
      "transitionend",
      transitionEndHandler
    );
    slidesWrapper.current?.addEventListener(
      "transitionstart",
      transitionStartHandler
    );
  }, []);

  return (
    <>
      <div className="flex items-center relative select-none">
        <div
          className="prev-btn-wrapper flex absolute items-center rotate-180 cursor-pointer h-[1.2rem] z-[9999] left-[-3.12rem]"
          onClick={goToPrevSlide}
        >
          <Image
            src="/home/content/arrow_btn.png"
            alt="Previous button"
            width={62}
            height={62}
            className="h-full w-auto"
          />
        </div>
        <div className="overflow-hidden flex relative items-center mt-[.42rem] h-[7.08rem]">
          <div
            ref={slidesWrapper}
            className="flex ease-out w-[calc(((3*7.32rem)+0.5rem))]"
          >
            {children}
          </div>
        </div>
        <div
          className="next-btn-wrapper flex absolute items-center cursor-pointer z-[9999] h-[1.2rem] right-[2rem]"
          onClick={goToNextSlide}
        >
          <Image
            src="/home/content/arrow_btn.png"
            alt="Next button"
            width={62}
            height={62}
            className="h-full w-auto"
          />
        </div>
      </div>
      <div className="options flex justify-between items-center select-none font-[500]">
        <div className="counter-text ml-[.4rem] text-[#989898] text-[.24rem]">
          <span
            className="text-[#dbbf91] text-[.45rem]"
            ref={currentSlide}
          ></span>
          <span> / </span>
          <span ref={totalSlides}></span>
        </div>
        <Link
          href="/news"
          locale={locale}
          className="to-news flex justify-center items-center mr-[3.78rem] w-[2.6rem] h-[.48rem] text-[.2rem] text-[rgba(230,230,230,.5)] border border-[rgba(230,230,230,.5)] hover:bg-[rgba(230,230,230,.4)]"
        >
          <div>More +</div>
        </Link>
      </div>
    </>
  );
}
