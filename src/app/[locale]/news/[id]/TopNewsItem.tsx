import { Link } from "i18n/routing";
import Image from "next/image";
import { type TImages, type TLocale } from "@/interface";

export type TopNewsItemProps = {
  image: TImages;
  locale: TLocale;
  title: string;
  date: string;
};

export function TopNewsItem({ image, locale, title, date }: TopNewsItemProps) {
  return (
    <Link
      className="flex flex-col font-yahei px-[.24rem] mt-[.33rem] mb-[.37rem]"
      href={`/news/${locale}/21`}
      locale={locale}
    >
      <div className="flex">
        <div className="w-[1.94rem]">
          <Image
            src={image.path}
            alt={`Image for the news with title of ${title}`}
            width={image.height}
            height={image.width}
            className="w-full h-auto"
          />
        </div>
        <div className="w-[2.27rem] px-[.08rem] text-[.18rem] text-[#1e1e1e] leading-[.25rem]">
          {title}
        </div>
      </div>
      <div className="mr-[.25rem] text-right text-[#9c9c9c] text-[.16rem]">
        {date}
      </div>
    </Link>
  );
}
