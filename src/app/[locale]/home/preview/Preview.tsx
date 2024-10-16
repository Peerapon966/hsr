import { DownloadMethods } from "@/components/DownloadMethods";
import dynamic from "next/dynamic";
import Image from "next/image";

/**
 * using dynamic import to force this component to be imported and rendered on the client after the current screen orientation is determined
 *
 * set ssr to false to prevent nextjs from prerender this component before the final (and correct) screen orientation is known
 * (which must wait until the component reaches the client). since prerendering might cause browser to download a wrong video
 * thus, the browser (client) needs to download both videos for both orientation which is inefficient
 *
 * this might be bad for seo (because this component won't be included in the initial html) in some case but not this one
 */
const VideoPlayer = dynamic(
  () =>
    import("@/[locale]/home/preview/VideoPlayer").then((module) => ({
      default: module.VideoPlayer,
    })),
  { ssr: false }
);

export function Preview() {
  return (
    <section className="flex relative">
      <div className="w-screen h-screen bg-[url('/home/preview/main_video_portrait_thumbnail.png')] min-[1920px]:bg-[url('/home/preview/main_video_thumbnail.png')] bg-cover bg-bottom">
        <VideoPlayer />
      </div>
      <Image
        src="/shared/hsr_logo.png"
        alt="honkai star rail logo"
        width={333}
        height={166}
        className="w-[3.1rem] h-auto absolute left-[1.64rem] top-[1.4rem] z-[9999]"
        priority
        draggable={false}
      ></Image>
      <div className="flex flex-col items-center absolute bottom-[.5rem] h-[138px] text-[.23rem] text-[#e6e6e6] select-none font-yahei font-[500] left-0 ">
        <div className="text-[12px] rotate-90">Scroll Down</div>
        <div className="line w-px h-[80px] mt-[36px] ml-[-3px] bg-[#e6e6e6]"></div>
      </div>
      <DownloadMethods
        withESRB
        containerStyles="absolute bottom-[1.21rem] left-[1.8rem] text-[100px]"
        gapSize="0.12em"
      />
    </section>
  );
}
