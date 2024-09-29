"use client";

import { Checkbox } from "@/features/authentication/components/InputField/Checkbox";
import { InputField } from "@/features/authentication/components/InputField/InputField";
import { useLocale, useTranslations } from "next-intl";

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("Footer");
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
  return (
    <div id="footer" className="flex-col relative">
      <div className="bg-[#111] py-[40px] border-t border-solid border-[#323232]">
        <form>
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
                    <span>
                      I agree for my personal data to be collected and used to
                      receive event invitations and other game info.
                    </span>
                    <a
                      target="__blank"
                      href={`https://hsr.hoyoverse.com/${locale}/company/privacy`}
                    >
                      &nbsp;Read details &gt;&gt;
                    </a>
                  </Checkbox>
                </div>
                <div className="flex grow-0 shrink-0 basis-[30%]">
                  <button>Subscribe Now</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="bg-black px-[30px] h-[100px]">
        <div className="pt-[30px] pb-[40px] flex flex-col"></div>
      </div>
    </div>
  );
}
