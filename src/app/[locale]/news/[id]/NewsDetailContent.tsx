"use server";

import "@/assets/css/newsdetailcontent.css";
import { TLocale } from "@/interface";
import { Link } from "i18n/routing";
import Image from "next/image";
import { TopNewsItem } from "./TopNewsItem";

export async function NewsDetailContent({ locale }: { locale: TLocale }) {
  return (
    <div className="flex flex-col items-center pt-[2.2rem]">
      <Link
        className="flex justify-center items-center w-[2.6rem] h-[.48rem] ml-[1.98rem] mr-auto text-[.2rem] text-[rgba(230,230,230,.5)] font-yahei border border-[rgba(230,230,230,.5)] hover:bg-[rgba(230,230,230,.4)]"
        href={"/news"}
        locale={locale}
      >
        <div>Back</div>
      </Link>
      <div className="flex items-start mt-[.57rem]">
        <div className="border-t-[.1rem] border-t-[#dbbf91] w-[12.32rem] bg-[#dee3ec] mb-[.4rem] px-[.49rem] font-yahei text-[#1e1e1e] leading-[.36rem]">
          <div className="text-[.42rem] leading-[.5rem] mt-[1.15rem] mb-[.15rem]">
            Animated Short: "Cosmic Ninjutsu Inscriptions — Havoc Exorcism:
            Lunar Vileslayer Scroll" | Honkai: Star Rail
          </div>
          <div className="text-center text-[.22rem] text-[#9c9c9c]">
            10/18/2024
          </div>
          <div className="news-detail-content mt-[.3rem] mb-[.2rem] text-[.24rem] font-yahei">
            <p>
              <Image
                src={`/news/${locale}/22.png`}
                alt="title"
                width={1920}
                height={1080}
                className="w-full h-auto"
              ></Image>
            </p>
            <p></p>
            <p>
              The vast expanse of the boundless silver sea conceals countless
              fiendlings beneath its surface. Border villages fall under the
              onslaught of these fiendlings, and even the once-bright moon above
              has turned into a tyrant.
            </p>
            <p>
              "Whomst defends the world's justice? Whomst sees through the
              deceit of vice and indulgence? Whomst will wipe out these
              evildoers? Whomst will protect the light of ten thousand homes?"
            </p>
            <p>
              The weak are silenced by sinister laughter, leaving only a
              sorrowful sigh. But when the people raise their heads to the sky,
              the falling stars beyond the heavens have already answered—
            </p>
            <p>
              A dazzling blaze of otherworldly fire will soon obliterate the
              calamities of this realm. This is the divine retribution of the
              Mappou Age of the Dharma, delivered by the Ninja Heroes patrolling
              the sea of stars.
            </p>
            <p></p>
            <p>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/mJCUl-UU9KQ?si=l2gQ7pH21wT_iHhZ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </p>
            <p></p>
            <p>English Voice:</p>
            <p>The Dazzling Ninja a.k.a. Rappa! — Kendell Byrd</p>
          </div>
          <div className="flex h-[.67rem] my-[.67rem] px-[.98rem]">
            <a href="">
              <Image
                src={"/news/dark_left_arrow_btn.png"}
                alt="button"
                width={67}
                height={67}
                className="h-full w-auto"
                priority
                draggable={false}
              />
            </a>
            <a className="ml-auto" href="">
              <Image
                src={"/news/dark_right_arrow_btn.png"}
                alt="button"
                width={67}
                height={67}
                className="h-full w-auto"
                priority
                draggable={false}
              />
            </a>
          </div>
        </div>
        <div className="border-t-[.1rem] border-t-[#dbbf91] w-[4.87rem] ml-[.6rem] bg-[#dee3ec] select-none text-[#1e1e1e]">
          <div className="h-[.52rem] mt-[.63rem] text-[.22rem] text-center">
            Latest News
          </div>
          <TopNewsItem
            image={{
              path: `/news/${locale}/21.png`,
              width: 1920,
              height: 1080,
            }}
            locale={locale}
            title={`Animated Short: "Cosmic Ninjutsu Inscriptions — Havoc Exorcism:
                Lunar Vileslayer Scroll" | Honkai: Star Rail`}
            date="10/18/2024"
          />
        </div>
      </div>
    </div>
  );
}
