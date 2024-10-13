import { Link } from "i18n/routing";
import { AVAILABLE_LOCALES } from "const";

export type MoreBtnProps = {
  href: string;
  locale: (typeof AVAILABLE_LOCALES)[keyof typeof AVAILABLE_LOCALES];
};

export function MoreBtn({ href, locale }: MoreBtnProps) {
  return (
    <Link
      href={href}
      locale={locale}
      className="to-news flex justify-center items-center w-[2.6rem] h-[.48rem] text-[.2rem] text-[rgba(230,230,230,.5)] border border-[rgba(230,230,230,.5)] hover:bg-[rgba(230,230,230,.4)]"
    >
      <div>More +</div>
    </Link>
  );
}
