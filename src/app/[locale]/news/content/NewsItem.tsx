import { TImages, TLocale } from "@/interface";
import { Link } from "i18n/routing";
import Image from "next/image";

export type NewsItemProps = {
  image: TImages;
  title: string;
  content: string;
  info: {
    date: string;
    label?: string;
  };
  id: number;
  locale: TLocale;
};

export function NewsItem({
  image,
  title,
  content,
  info,
  id,
  locale,
}: NewsItemProps) {
  return (
    <div className="select-none">
      <Link className="text-white" href={`/news/${id}`} locale={locale}>
        <div className="flex justify-center items-center w-[17.65rem] h-[2.68rem] mt-[.11rem] bg-[url('/news/news_item_bg.png')] bg-[length:17.47rem_2.5rem] bg-center bg-no-repeat after:content-[''] after:hidden hover:after:block after:w-[17.31rem] after:h-[2.38rem] after:border after:border-[#db9a45] after:absolute after:rounded-tr-[.56rem]">
          <div className="flex justify-center items-center pl-[.54rem] h-full">
            <div className="w-[3.23rem] h-[1.82rem]">
              <Image
                src={image.path}
                alt={title}
                width={image.width}
                height={image.height}
                className="w-auto h-full"
              />
            </div>
          </div>
          <div className="font-yahei w-full h-full pl-[.7rem]">
            <div className="h-[1.2rem] overflow-hidden text-ellipsis pt-[.41rem] pr-[.4rem] text-[#e9e9e9] text-[.3rem] font-[500] leading-[.38rem]">
              {title}
            </div>
            <div className="w-full h-[.66rem] overflow-hidden text-ellipsis pr-[.34rem] mb-[.1rem] text-[#9c9c9c] text-[.22rem] font leading-[.33rem]">
              {content}
            </div>
            <div className="flex justify-end text-[.2rem] font leading-[.33rem]">
              <div className="text-[#989898]">{info.date}</div>
              <div className="text-[#dbbf91] w-[1.4rem] pl-[.3rem]">
                {info.label}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
