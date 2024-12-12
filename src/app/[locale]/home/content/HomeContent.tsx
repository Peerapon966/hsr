"use client";

import { Title } from "@/components/Title";
import { NewsThumbnail } from "@/[locale]/home/content/NewsThumbnail";
import { Carousel } from "@/[locale]/home/content/Carousel";
import { CarouselItem } from "@/[locale]/home/content/CarouselItem";
import { useLocale } from "next-intl";
import {
  CharacterBanner,
  CharacterBannerProps,
} from "@/[locale]/home/content/CharacterBanner";
import { TNewsItems, type TLocale } from "@/interface";
import { useEffect, useRef, useState } from "react";
import { fetchNewsItems } from "@/services/content/fetchNewsItems";

export function HomeContent() {
  const initialized = useRef(false);
  const locale: TLocale = useLocale() as TLocale;
  const [newsItems, setNewsItems] = useState<TNewsItems[]>([]);
  const getNewsItems = async (locale: TLocale) => {
    const { newsItems } = await fetchNewsItems({ locale });
    setNewsItems(newsItems);
  };
  const chars: CharacterBannerProps[] = [
    {
      name: "Himeko",
      images: {
        normal: {
          path: "/home/content/himeko.png",
          width: 402,
          height: 864,
        },
        active: {
          path: "/home/content/active_himeko.png",
          width: 402,
          height: 864,
        },
      },
      worldIndex: 1,
      charIndex: 1,
      locale: locale,
    },
    {
      name: "Welt",
      images: {
        normal: {
          path: "/home/content/welt.png",
          width: 402,
          height: 864,
        },
        active: {
          path: "/home/content/active_welt.png",
          width: 402,
          height: 864,
        },
      },
      worldIndex: 2,
      charIndex: 2,
      locale: locale,
    },
    {
      name: "Dan Heng",
      images: {
        normal: {
          path: "/home/content/dan_heng.png",
          width: 402,
          height: 864,
        },
        active: {
          path: "/home/content/active_dan_heng.png",
          width: 402,
          height: 864,
        },
      },
      worldIndex: 3,
      charIndex: 3,
      locale: locale,
    },
    {
      name: "March 7th",
      images: {
        normal: {
          path: "/home/content/march_7th.png",
          width: 402,
          height: 864,
        },
        active: {
          path: "/home/content/active_march_7th.png",
          width: 402,
          height: 864,
        },
      },
      worldIndex: 4,
      charIndex: 4,
      locale: locale,
    },
  ];

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      getNewsItems(locale);
    }
  }, []);

  return (
    <div className="pt-[1.6rem] font-[yahei]">
      <div className="news-thumbnail-section w-full max-w-[2000px] h-[9.6rem] pl-[4rem]">
        <Title title={"Voice of the Galaxy"} />
        {newsItems.length > 0 && (
          <Carousel
            infiniteLoop={true}
            slidesPerView={3}
            pathToDetailsPage="/news"
            additionalStyle={{ list: "h-[7.08rem]" }}
          >
            {newsItems.map(({ news_id, title, image, created_at }) => (
              <CarouselItem key={news_id}>
                <NewsThumbnail
                  poster={image}
                  date={new Date(created_at).toLocaleDateString()}
                  id={news_id}
                  title={title}
                />
              </CarouselItem>
            ))}
          </Carousel>
        )}
      </div>
      <div className="character-preview-section w-full max-w-[2000px] h-[11.6rem] pl-[4rem] mt-[1.6rem]">
        <Title title={"Characters"} />
        <Carousel
          infiniteLoop={false}
          slidesPerView={4}
          pathToDetailsPage="/character"
          additionalStyle={{
            list: "h-[8.59rem]",
            options: "mt-[.65rem] ml-[-1.9rem]",
          }}
        >
          {chars.map(({ name, images, worldIndex, charIndex, locale }, idx) => (
            <CarouselItem key={`char-banner-${idx}`}>
              <CharacterBanner
                key={name}
                name={name}
                images={images}
                worldIndex={worldIndex}
                charIndex={charIndex}
                locale={locale}
              />
            </CarouselItem>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
