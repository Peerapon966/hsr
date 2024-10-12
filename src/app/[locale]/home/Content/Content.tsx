"use client";

import { ReactBaseProps } from "@/interface";
import { Title } from "@/components/Title";
import { NewsThumbnail } from "@/[locale]/home/Content/NewsThumbnail";
import { Carousel } from "@/[locale]/home/Content/Carousel";
import { CarouselItem } from "@/[locale]/home/Content/CarouselItem";
import { useLocale } from "next-intl";

export function Content({ children }: ReactBaseProps) {
  const locale = useLocale();
  const ids = [22, 21, 20, 19, 18];
  const title = "『崩壊：スターレイル』霊砂キャラクターPV——「沈香を焚く」";
  return (
    <div className="pt-[1.6rem] font-[yahei]">
      <div className="news-thumbnail-section w-full max-w-[2000px] h-[9.6rem] pl-[4rem]">
        <Title title={"Voice of the Galaxy"} />
        <Carousel>
          {ids.map((id) => (
            <CarouselItem key={`item-${id}`}>
              <NewsThumbnail
                poster={`/news/${locale}/${id}.png`}
                date="2024/9/27"
                id={id}
                title={title}
              />
            </CarouselItem>
          ))}
        </Carousel>
      </div>
      <div className="character-preview-section w-full max-w-[2000px] pl-[4rem] mt-[1.6rem]">
        <Title title={"Characters"} />
      </div>
    </div>
  );
}
