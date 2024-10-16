import "@/assets/css/characterBanner.css";
import { Link } from "i18n/routing";
import Image from "next/image";
import { AVAILABLE_LOCALES } from "const";

type TImages = {
  normal: {
    path: string;
    width: number;
    height: number;
  };
  active: {
    path: string;
    width: number;
    height: number;
  };
};

export type CharacterBannerProps = {
  name: string;
  images: TImages;
  worldIndex: number;
  charIndex: number;
  locale: (typeof AVAILABLE_LOCALES)[keyof typeof AVAILABLE_LOCALES];
};

export function CharacterBanner({
  name,
  images,
  worldIndex,
  charIndex,
  locale,
}: CharacterBannerProps) {
  return (
    <div className="char-banner-wrapper w-[4.02rem] mr-[0.5rem] relative">
      <Link
        href={`/character/?worldIndex=${worldIndex}&charIndex=${charIndex}`}
        locale={locale}
      >
        <Image
          src={images.normal.path}
          alt={name}
          width={images.normal.width}
          height={images.normal.height}
          className="normal-char w-full h-auto"
        />
        <Image
          src={images.active.path}
          alt={name}
          width={images.active.width}
          height={images.active.height}
          className="active-char w-full h-auto"
        />
        <div className="w-full absolute bottom-[.9rem] text-[.3rem] font-[500] text-white text-center">
          {name}
        </div>
      </Link>
    </div>
  );
}
