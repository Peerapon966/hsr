"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex justify-center bg-[url('/error/pc_error_bg.png')] bg-cover bg-buttom select-none">
      <div className="flex flex-col justify-center items-center text-[#f3f2f2] text-[1.5rem] font-500 font-yahei">
        <div className="w-[.31rem] h-[.02rem] bg-[#f3f2f2]"></div>
        <div className="pt-[.6rem]">404</div>
        <div
          className="cursor-pointer w-[2.6rem] h-[.48rem] mt-[1.35rem] border-[.01rem] border-solid border-[#e6e6e6] text-[.2rem] flex justify-center items-center font-400"
          onClick={() => router.back()}
        >
          Back
        </div>
      </div>
    </div>
  );
}
