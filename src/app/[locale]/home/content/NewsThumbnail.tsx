import "@/assets/css/newsThumbnail.css";
import { Link } from "i18n/routing";
import { useLocale } from "next-intl";

export type NewsThumbnailProps = {
  poster: string;
  date: string;
  id: number;
  title: string;
};

export function NewsThumbnail({ poster, date, id, title }: NewsThumbnailProps) {
  const locale = useLocale();

  return (
    <div key={id} className="news-thumbnail-wrapper">
      <Link className="flex" href={`/news/${id}`} locale={locale}>
        <div className="news-thumbnail flex flex-col shrink-0 items-center relative px-[.5rem]">
          <div className="flex w-[7.16rem] min-h-[4.16rem] p-[.08rem] ml-[.14rem] mt-[.04rem] rounded-tr-[.56rem] overflow-hidden">
            <div
              style={{ backgroundImage: `url('${poster}')` }}
              className="w-full bg-cover bg-center bg-no-repeat"
            ></div>
          </div>
          <div className="flex justify-between w-full mt-[.18rem] text-[.2rem] text-[#bfbfbf]">
            <div className="text-[#dbbf91]">{date}</div>
            <div>+ more</div>
          </div>
          <div className="flex w-full h-[1rem] pt-[.2rem] leading-[.365rem] text-[.22rem] text-left text-ellipsis font-yuugo text-[500] text-white">
            {title}
          </div>
        </div>
      </Link>
    </div>
  );
}
