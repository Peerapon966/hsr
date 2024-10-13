import { ReactBaseProps } from "@/interface";
import { useLocale } from "next-intl";
import Image from "next/image";
import { Children, useEffect, useRef, useState } from "react";
import { Link } from "i18n/routing";

export type CarouselProps = {
  infiniteLoop: boolean;
  slidesPerView: number;
  pathToDetailsPage: string;
  additionalStyle?: {
    list?: string;
    options?: string;
  };
};

export function Carousel({
  children,
  infiniteLoop,
  slidesPerView,
  pathToDetailsPage,
  additionalStyle,
}: ReactBaseProps & CarouselProps) {
  const locale = useLocale();
  const [isSwiperReady, setIsSwiperReady] = useState<boolean>(false);
  const numberOfSlides = Children.count(children);
  const numberOfHeadDupSlides = infiniteLoop
    ? Math.ceil(numberOfSlides / 2)
    : 0;
  const currentPosition = useRef<number>(
    infiniteLoop ? Math.ceil(numberOfSlides / 2) : 0
  );
  const slideWidth = useRef<number>(0);
  const slides = useRef<Node[] | null>(null);
  const firstSlide = useRef<Element | null>(null);
  const slidesWrapper = useRef<HTMLDivElement | null>(null);
  const currentSlide = useRef<HTMLSpanElement | null>(null);
  const totalSlides = useRef<HTMLSpanElement | null>(null);
  const resizeHandler = () => {
    if (!slidesWrapper.current || !firstSlide.current) return;

    slideWidth.current = firstSlide.current.clientWidth;
    slidesWrapper.current.style.width = `${
      slidesPerView * slideWidth.current
    }px`;
    slidesWrapper.current.style.transform = `translateX(${
      currentPosition.current * slideWidth.current * -1
    }px)`;
  };
  const goToNextSlide = () => {
    if (!slidesWrapper.current || !slides.current || !isSwiperReady) return;

    if (
      !infiniteLoop &&
      currentPosition.current >= numberOfSlides - slidesPerView
    )
      return;

    currentPosition.current += 1;
    slidesWrapper.current.style.transitionDuration = "300ms";
    slidesWrapper.current.style.transform = `translateX(${
      currentPosition.current * slideWidth.current * -1
    }px)`;

    if (infiniteLoop && currentSlide.current) {
      (
        slides.current[currentPosition.current - 1].firstChild as HTMLDivElement
      ).dataset.main = "false";
      (
        slides.current[currentPosition.current].firstChild as HTMLDivElement
      ).dataset.main = "true";
      const newCurrentSlide = Math.abs(
        (currentPosition.current + numberOfHeadDupSlides) % numberOfSlides
      );
      currentSlide.current.innerText = (
        newCurrentSlide === 0 ? 5 : newCurrentSlide
      )
        .toString()
        .padStart(2, "0");
    }
  };
  const goToPrevSlide = () => {
    if (!slidesWrapper.current || !slides.current || !isSwiperReady) return;

    if (!infiniteLoop && currentPosition.current <= 0) return;

    currentPosition.current -= 1;
    slidesWrapper.current.style.transitionDuration = "300ms";
    slidesWrapper.current.style.transform = `translateX(${
      currentPosition.current * slideWidth.current * -1
    }px)`;

    if (infiniteLoop && currentSlide.current) {
      (
        slides.current[currentPosition.current + 1].firstChild as HTMLDivElement
      ).dataset.main = "false";
      (
        slides.current[currentPosition.current].firstChild as HTMLDivElement
      ).dataset.main = "true";
      const newCurrentSlide = Math.abs(
        (currentPosition.current + numberOfHeadDupSlides) % numberOfSlides
      );
      currentSlide.current.innerText = (
        newCurrentSlide === 0 ? 5 : newCurrentSlide
      )
        .toString()
        .padStart(2, "0");
    }
  };
  const transitionStartHandler = () => {
    setIsSwiperReady(false);
  };
  const transitionEndHandler = () => {
    if (!slidesWrapper.current || !slides.current) return;

    slidesWrapper.current.style.transitionDuration = "0ms";

    if (infiniteLoop) {
      if (currentPosition.current <= 0) {
        (
          slides.current[currentPosition.current].firstChild as HTMLDivElement
        ).dataset.main = "false";
        currentPosition.current = numberOfSlides;
        (
          slides.current[currentPosition.current].firstChild as HTMLDivElement
        ).dataset.main = "true";
        slidesWrapper.current.style.transform = `translateX(${
          currentPosition.current * slideWidth.current * -1
        }px)`;
      }

      if (
        currentPosition.current >=
        numberOfSlides + numberOfHeadDupSlides - 1
      ) {
        (
          slides.current[currentPosition.current].firstChild as HTMLDivElement
        ).dataset.main = "false";
        currentPosition.current -= numberOfSlides;
        (
          slides.current[currentPosition.current].firstChild as HTMLDivElement
        ).dataset.main = "true";
        slidesWrapper.current.style.transform = `translateX(${
          currentPosition.current * slideWidth.current * -1
        }px)`;
      }
    }

    setIsSwiperReady(true);
  };

  useEffect(() => {
    if (!slidesWrapper.current) return;
    if (
      infiniteLoop &&
      slides.current &&
      slides.current?.length >= numberOfSlides * 2
    )
      return;

    const carouselItems = Array.from(
      slidesWrapper.current?.querySelectorAll(
        ".carousel-item"
      ) as NodeListOf<Element>
    );

    slidesWrapper.current.style.width = `${
      slidesPerView * slideWidth.current
    }px`;
    slides.current = [...carouselItems];
    firstSlide.current = carouselItems[0];
    slideWidth.current = firstSlide.current.clientWidth;

    if (infiniteLoop && currentSlide.current && totalSlides.current) {
      const dupCarouselItems = carouselItems.map((item) =>
        item.cloneNode(true)
      );
      const firstHalfItems = dupCarouselItems.slice(
        0,
        Math.floor(dupCarouselItems.length / 2)
      );
      const secondHalfItems = dupCarouselItems.slice(
        Math.floor(dupCarouselItems.length / 2)
      );

      slidesWrapper.current.prepend(...secondHalfItems);
      slidesWrapper.current.append(...firstHalfItems);
      slides.current = [
        ...secondHalfItems,
        ...carouselItems,
        ...firstHalfItems,
      ];

      (
        slides.current[currentPosition.current].firstChild as HTMLDivElement
      ).dataset.main = "true";

      currentSlide.current.innerText = Math.abs(
        (currentPosition.current + numberOfHeadDupSlides) % numberOfSlides
      )
        .toString()
        .padStart(2, "0");
      totalSlides.current.innerText = numberOfSlides
        .toString()
        .padStart(2, "0");
    }

    slidesWrapper.current.style.transform = `translateX(${
      currentPosition.current * slideWidth.current * -1
    }px)`;

    setIsSwiperReady(true);
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

    return () => {
      window.removeEventListener("resize", resizeHandler);
      slidesWrapper.current?.removeEventListener(
        "transitionend",
        transitionEndHandler
      );
      slidesWrapper.current?.removeEventListener(
        "transitionstart",
        transitionStartHandler
      );
    };
  }, []);

  return (
    <>
      <div className="flex items-center relative select-none">
        {numberOfSlides > slidesPerView && (
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
        )}
        <div
          className={`overflow-hidden flex relative items-center mt-[.42rem] ${additionalStyle?.list}`}
        >
          <div
            ref={slidesWrapper}
            style={{ width: slidesPerView * slideWidth.current }}
            className="flex ease-out"
          >
            {children}
          </div>
        </div>
        {numberOfSlides > slidesPerView && (
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
        )}
      </div>
      <div
        className={`options flex ${
          infiniteLoop ? "justify-between" : "justify-center"
        } items-center select-none font-[500] ${additionalStyle?.options}`}
      >
        {infiniteLoop && (
          <div className="counter-text ml-[.4rem] text-[#989898] text-[.24rem]">
            <span
              className="text-[#dbbf91] text-[.45rem]"
              ref={currentSlide}
            ></span>
            <span> / </span>
            <span ref={totalSlides}></span>
          </div>
        )}
        <div className={`${infiniteLoop && "mr-[3.78rem]"}`}>
          <Link
            href={pathToDetailsPage}
            locale={locale}
            className="to-news flex justify-center items-center w-[2.6rem] h-[.48rem] text-[.2rem] text-[rgba(230,230,230,.5)] border border-[rgba(230,230,230,.5)] hover:bg-[rgba(230,230,230,.4)]"
          >
            <div>More +</div>
          </Link>
        </div>
      </div>
    </>
  );
}
