"use client";

import { useContext } from "react";
import { TOrientation } from "@/interface";
import { OrientationContext } from "@/layouts/PageLayout";

export function VideoPlayer() {
  const optimalOrientation = useContext(OrientationContext) as TOrientation;
  return (
    <div className="bg-black overflow-hidden">
      <video
        className="min-w-[1270px] w-screen h-screen object-bottom object-cover"
        autoPlay={true}
        loop={true}
        muted={true}
      >
        <source
          src={
            optimalOrientation === "landscape"
              ? "/home/preview/main_video.mp4"
              : "/home/preview/main_video_portrait.mp4"
          }
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
