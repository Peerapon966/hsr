"use client"

import "@/assets/css/home.css";
import { useEffect, useRef, useState } from "react";
import { PageLayout } from "@/layouts";
import { Footer, Sidebar } from "@/components";
import { useDOMObject, useBOMObject } from "@/hooks";
import HomeDownload from "@/components/Home/HomeDownload";
// import Title from "components/Title";

export default function Home() {
  const [innerWidth, innerHeight] = useBOMObject<[number, number]>([
    { object: 'window', property: 'innerWidth' },
    { object: 'window', property: 'innerHeight' }
  ]);
  const layout: string = (innerWidth < innerHeight) ? 'portrait' : 'landscape';
  const [content, swiper] = useDOMObject<[HTMLElement, HTMLDivElement]>([
    { from: 'id', value: 'content-section' },
    { from: 'id', value: 'swiper' }
  ]);
  const swiperActive = useRef<boolean>(false);
  const scrollActive = useRef<boolean>(false);
  const scrollAmount = useRef<number>(0); // useRef f*cked up when react strict mode is on
  // let scrollAmount = 0; // let f*cked up when the component is re-rendered
  const maxScrollAmount = (content) ? content.clientHeight : 0;
  // console.log(maxScrollAmount);
  const wheelSnapScrollHandler = (e: WheelEvent) => {
    e.preventDefault();
    const deltaY = e.deltaY;

    if (scrollAmount.current !== 0) return;

    if (!swiperActive.current && deltaY > 0) {
      swiper.classList.add('active');
      swiperActive.current = true;
    }

    if (swiperActive.current && deltaY < 0) {
      scrollActive.current = false;
      swiper.classList.remove('active');
      swiperActive.current = false;
    }
  };

  const scrollHandler = (e: WheelEvent) => {
    e.preventDefault();

    if (!swiperActive.current) return;

    if (swiperActive.current && !scrollActive.current) {
      scrollActive.current = true;
      return
    }

    const deltaY = e.deltaY;
    (deltaY > 0) ? scrollAmount.current -= 100 : scrollAmount.current += 100;
    content.style.transform = `translate3d(0, ${scrollAmount.current}px, 0)`
  }

  // swiper.ontransitionstart?(() => {
  //     document.addEventListener('*', preventAllEvents, false);
  // })

  // swiper.ontransitionend?(() => {
  //     document.removeEventListener('*', preventAllEvents, false);
  // }):

  if (swiper) {
    swiper.addEventListener('wheel', wheelSnapScrollHandler, false);
    swiper.addEventListener('wheel', scrollHandler, false);
  }

  return (
    <PageLayout>
      <div className="home-container" id="home-container">
        <Sidebar />
        <main className="swiper-wrapper" id="swiper">
          <section data-flex className="home-preview-container" id="preview-section">
            <div className="video-wrapper">
              <video className="video" autoPlay={true} loop={true} muted={true}>
                <source src={(layout === 'landscape') ? '/home/main_video.mp4' : '/home/main_video_portrait.mp4'} type="video/mp4" />
              </video>
            </div>
            <HomeDownload />
          </section>
          <section className="home-content-container" id="content-section" style={{ transform: `translate3d(0, 0, 0)`, transitionDuration: '0s' }}>
            <div className="home-content" style={{ width: '100%', height: '5000px' }}>
              {/* <Title title={"Voice of the Galaxy"} />
                            <Title title={"Characters"} /> */}
              {/* <div style={{width: '100%', height: '1000px', backgroundColor: 'black'}}></div>
                            <div style={{width: '100%', height: '1000px', backgroundColor: 'blue'}}></div> */}
            </div>
            <Footer />
          </section>
        </main>
      </div>
    </PageLayout>
  )
}