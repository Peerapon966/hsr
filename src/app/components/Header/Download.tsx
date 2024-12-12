"use client";

import "@/assets/css/download.css";
import { useEffect, useRef, useState } from "react";
import { useDOMObject } from "@/hooks/useDOMObject";
import { createPortal } from "react-dom";
import Image from "next/image";
import { disableScroll, enableScroll } from "@/utils/disableScroll";
import { DownloadMethods } from "@/components/DownloadMethods";
import {
  TDownloadModalContext,
  useDownloadModalContext,
} from "@/components/Header/Header";

export default function Download() {
  const [componentDidMount, setComponentDidMount] = useState<boolean>(false);
  const { showDownloadModal, setShowDownloadModal } =
    useDownloadModalContext() as TDownloadModalContext;
  const [downloadModal] = useDOMObject<[HTMLDivElement]>([
    { from: "id", value: "download-dialog-container" },
  ]);
  const overlay = useRef<HTMLDivElement | null>(null);
  const closeModalHandler = () => {
    setTimeout(() => {
      setShowDownloadModal(false);
    }, 300);
    downloadModal?.classList.remove("download-dialog-animation");
    overlay.current?.classList.remove("download-overlay-dialog-animation");
    if (overlay.current) {
      enableScroll(overlay.current);
    }
  };

  if (showDownloadModal) {
    downloadModal?.classList.add("download-dialog-animation");
    overlay.current?.classList.add("download-overlay-dialog-animation");
  }

  useEffect(() => {
    setComponentDidMount(true);
  }, []);

  useEffect(() => {
    if (showDownloadModal && overlay.current) {
      disableScroll(overlay.current);
    }
  }, [showDownloadModal]);

  const component = (
    <div
      data-flex
      ref={overlay}
      className="download-overlay-dialog-container main-axis-center cross-axis-center"
      onClick={() => closeModalHandler()}
    >
      <div className="download-overlay-dialog">
        <div
          className="download-dialog-container"
          id="download-dialog-container"
          onClick={(e) => e.stopPropagation()}
        >
          <div data-flex-col className="download-dialog cross-axis-center">
            <div className="download-close-btn-container">
              <button
                type="button"
                className="download-close-btn"
                onClick={() => closeModalHandler()}
              ></button>
            </div>
            <div className="download-dialog-header">
              <span>Download</span>
            </div>
            <DownloadMethods withESRB={false} gapSize="22px" />
          </div>
          <div className="game-rating">
            <Image
              src="/shared/rating.png"
              alt="game rating image"
              width={194}
              height={115}
              className="w-auto h-full"
              priority
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof window === "object") {
    return createPortal(
      component,
      document.querySelector("body") as HTMLElement
    );
  }

  return component;
}
