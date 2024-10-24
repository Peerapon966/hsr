"use client";

import "@/assets/css/footer.css";
import { Checkbox } from "@/features/authentication/components/InputField/Checkbox";
import { InputField } from "@/features/authentication/components/InputField/InputField";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { AVAILABLE_LOCALES } from "const";
import { FormEvent, useContext, useRef, useState } from "react";
import { useRouter } from "i18n/routing";
import { PageContext, type TPageContext } from "@/layouts/PageLayout";

export function Footer() {
  const router = useRouter();
  const currentLocale = useLocale();
  const t = useTranslations("Footer");
  const { currentPage, queryString } = useContext(PageContext) as TPageContext;
  const [isLocaleListVisible, setIsLocaleListVisible] =
    useState<boolean>(false);
  const localeSelector = useRef<HTMLDivElement | null>(null);
  const submitBtn = useRef<HTMLButtonElement | null>(null);
  const { component } = InputField({
    for: "register",
    fieldName: "newsletter",
    label: "Email",
    type: "text",
    options: {
      realtimeUpdate: false,
      theme: "dark",
    },
  });
  const subscribeHandler = (e: FormEvent) => {
    e.preventDefault();
    alert(
      "Congrat! We will begin sending spam advertise emails to your address starting today"
    );
  };
  const showLocaleListHandler = () => {
    setIsLocaleListVisible((isLocaleListVisible) => !isLocaleListVisible);
    localeSelector.current?.classList.toggle("active");
  };
  return (
    <div className="flex-col relative select-none">
      <div className="bg-[#111] py-[40px] border-t border-solid border-[#323232]">
        <form onSubmit={subscribeHandler}>
          <div className="text-[100px] max-w-[1560px] w-[90%] m-auto">
            <div className="flex justify-between">
              <div className="select-none text-[color:var(--global-color-grey-8)] grow-0 shrink-0 basis-[35%]">
                <div className="font-bold text-[.24em] leading-[1.166em] text-left mb-[.5em]">
                  {t("hyv_subsciption_title")}
                </div>
                <div className="font-400 text-[.14em] leading-[1.5em] text-left mb-[1.5em]">
                  {t("hyv_subsciption_desc")}
                </div>
              </div>
              <div className="max-w-[600px] flex justify-between grow-0 shrink-0 basis-[40%] mt-[-20px]">
                <div className="flex flex-col grow-0 shrink-0 basis-[65%]">
                  {component}
                  <Checkbox
                    for="subscription"
                    fieldName="newsletter"
                    options={{ theme: "dark" }}
                  >
                    <span className="text-[color:var(--global-color-grey-8)]">
                      I agree for my personal data to be collected and used to
                      receive event invitations and other game info.
                    </span>
                    <a
                      target="__blank"
                      href={`https://hsr.hoyoverse.com/${currentLocale}/company/privacy`}
                    >
                      &nbsp;Read details &gt;&gt;
                    </a>
                  </Checkbox>
                </div>
                <div className="flex grow-0 shrink-0 basis-[30%]">
                  <button
                    ref={submitBtn}
                    type="submit"
                    className="footer-submit-btn"
                  >
                    <span>Subscribe Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="bg-black px-[30px]">
        <footer className="pt-[30px] pb-[40px] flex justify-center relative">
          <div className="footer-wrapper flex flex-col text-[#919191] text-[12px] font-sans text-center font-[500]">
            <div className="footer-details flex justify-center items-center mt-[10px] max-w-full">
              <a>
                <Image
                  src={"/shared/hsr_logo.png"}
                  alt="honkai starrail logo"
                  width={333}
                  height={166}
                  draggable={false}
                ></Image>
              </a>
              <a
                href={`https://hsr.hoyoverse.com/worldtour?lang=${currentLocale}&utm_source=officialweb&utm_medium=footer`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image
                  src={"/shared/sr_world_tour_logo.png"}
                  alt="starrail world tour logo"
                  width={1108}
                  height={528}
                  draggable={false}
                ></Image>
              </a>
            </div>
            <div className="footer-details flex justify-center items-center mt-[10px] max-w-full">
              <div className="flex flex-wrap justify-between">
                <a
                  href={`https://hsr.hoyoverse.com/${currentLocale}/company/privacy`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-[#bbb] mx-[10px] no-underline hover:underline cursor-pointer"
                >
                  Privacy Policy
                </a>
                <a
                  href={`https://hsr.hoyoverse.com/${currentLocale}/company/terms`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-[#bbb] mx-[10px] no-underline hover:underline cursor-pointer"
                >
                  Terms of Service
                </a>
                <a
                  href={`https://hsr.hoyoverse.com/${currentLocale}/about-us?utm_source=hsr&utm_medium=footer`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-[#bbb] mx-[10px] no-underline hover:underline cursor-pointer"
                >
                  About Us
                </a>
                <a
                  href="mailto:hsrcs_en@hoyoverse.com"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-[#bbb] mx-[10px] no-underline hover:underline cursor-pointer"
                >
                  Contact Us
                </a>
                <a
                  href={`https://cs.hoyoverse.com/static/hoyoverse-new-csc-service-hall-fe/index.html?page_id=19&login_type=visitor&game_biz=platform_hyvpass&lang=${currentLocale}&utm_source=genshin&utm_medium=footer#/home`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-[#bbb] mx-[10px] no-underline hover:underline cursor-pointer"
                >
                  Help Center
                </a>
              </div>
            </div>
            <div className="footer-details flex justify-center items-center mt-[10px] max-w-full">
              <a>
                <Image
                  src={"/shared/rating.png"}
                  alt="game rating image"
                  width={194}
                  height={115}
                  draggable={false}
                ></Image>
              </a>
            </div>
            <div className="footer-details flex flex-col justify-center items-center mt-[10px] max-w-full leading-[1.6]">
              <p className="whitespace-pre-wrap">
                “PlayStation Family Mark”, “PlayStation” and “PS5 logo” are
                registered trademarks or trademarks of Sony Interactive
                Entertainment Inc.
              </p>
              <p className="whitespace-pre-wrap">
                Epic, Epic Games, Epic Games Store, the Epic Games Store logo,
                and Epic Online Services are trademarks and/or registered
                trademarks of Epic Games. All other trademarks are the property
                of their respective owners.
              </p>
            </div>
            <div className="footer-details flex justify-center items-center mt-[10px] max-w-full">
              <a
                href={`https://www.hoyoverse.com/${currentLocale}?utm_source=hsr&utm_medium=footer`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image
                  src={"/shared/hyv_logo_dark.png"}
                  alt="hoyoverse logo"
                  width={384}
                  height={69}
                  className="rescaled"
                  draggable={false}
                ></Image>
              </a>
            </div>
            <div className="footer-details flex justify-center items-center mt-[10px] max-w-full">
              <p className="text-white">
                Copyright © COGNOSPHERE. All Rights Reserved.
              </p>
            </div>
          </div>
          <div className="flex absolute locale-wrapper font-sans font-[500]">
            <div
              className={`locale-options-wrapper flex flex-col items-center absolute ${
                isLocaleListVisible || "hidden"
              }`}
            >
              <div className="bg-[#1c1c1c] p-[8px] rounded-[6px] w-full">
                <div className="locale-options pl-[8px] text-[12px]">
                  {Object.entries(AVAILABLE_LOCALES).map(([lang, locale]) => (
                    <div
                      key={locale}
                      className={`locale-option relative pl-[12px] cursor-pointer leading-[2.57] ${
                        currentLocale === locale
                          ? "text-white active"
                          : "text-[#919191]"
                      } hover:text-white`}
                      onClick={() =>
                        router.push(`/${currentPage + queryString}`, {
                          locale: locale,
                        })
                      }
                    >
                      {lang}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              ref={localeSelector}
              onClick={showLocaleListHandler}
              className="locale-selector flex cursor-pointer items-center overflow-hidden box-content"
            >
              <div className="locale-selector-sub flex items-center h-full w-full">
                <div className="globe-icon-wrapper flex items-center justify-center relative">
                  <div className="globe-icon bg-[url('/footer/globe_icon.png')]"></div>
                </div>
                <div className="locale text-[#919191] text-[12px] leading flex items-center justify-between">
                  English
                  <div
                    className={`arrow-icon ${
                      isLocaleListVisible && "rotate-180"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
