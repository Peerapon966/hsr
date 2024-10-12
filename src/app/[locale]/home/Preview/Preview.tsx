import { HomeDownload } from "@/[locale]/home/Preview/HomeDownload";
import dynamic from "next/dynamic";

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
    import("@/[locale]/home/Preview/VideoPlayer").then((module) => ({
      default: module.VideoPlayer,
    })),
  { ssr: false }
);

export function Preview() {
  return (
    <section className="flex relative">
      <div className="w-screen h-screen">
        <VideoPlayer />
      </div>
      <HomeDownload />
    </section>
  );
}
