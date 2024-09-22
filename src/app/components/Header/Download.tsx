"use client";

import "@/assets/css/download.css";
import { useEffect, useRef, useState } from "react";
import { useDOMObject } from "@/hooks/useDOMObject";
import { createPortal } from "react-dom";
import Image from "next/image";
import { disableScroll, enableScroll } from "@/utils/disableScroll";

interface modal {
  openModal: boolean;
  closeModal: Function;
  auxiliary?: any;
}

export default function Download({ openModal, closeModal }: modal) {
  const [componentDidMount, setComponentDidMount] = useState<boolean>(false);
  const [downloadModal] = useDOMObject<[HTMLDivElement]>([
    { from: "id", value: "download-dialog-container" },
  ]);
  const overlay = useRef<HTMLDivElement | null>(null);
  const closeModalHandler = () => {
    setTimeout(() => {
      closeModal();
    }, 300);
    downloadModal?.classList.remove("download-dialog-animation");
    overlay.current?.classList.remove("download-overlay-dialog-animation");
    if (overlay.current) {
      enableScroll(overlay.current);
    }
  };

  if (openModal) {
    downloadModal?.classList.add("download-dialog-animation");
    overlay.current?.classList.add("download-overlay-dialog-animation");
  }

  useEffect(() => {
    setComponentDidMount(true);
  }, []);

  useEffect(() => {
    if (openModal && overlay.current) {
      disableScroll(overlay.current);
    }
  }, [openModal]);

  const component = (
    <>
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
              <div data-flex className="download-dialog-content">
                <div className="download-qr"></div>
                <div className="download-methods">
                  <div
                    data-flex
                    className="download-methods-row download-methods-upper-row"
                  >
                    <div className="mr-22">
                      <a
                        href="https://www.playstation.com/th-th/games/honkai-star-rail/"
                        target="_blank"
                        rel="noopener"
                      >
                        <Image
                          src={"/header/ps5.png"}
                          alt="ps5 logo"
                          width={256}
                          height={79}
                          loading="lazy"
                        />
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://www.playstation.com/th-th/games/honkai-star-rail/"
                        target="_blank"
                        rel="noopener"
                      >
                        <Image
                          src={"/header/windows.png"}
                          alt="windows logo"
                          width={256}
                          height={79}
                        />
                      </a>
                    </div>
                  </div>
                  <div data-flex className="download-methods-row">
                    <div className="mr-22">
                      <a
                        href="https://www.playstation.com/th-th/games/honkai-star-rail/"
                        target="_blank"
                        rel="noopener"
                      >
                        <Image
                          src={"/header/app_store.png"}
                          alt="apple app store logo"
                          width={256}
                          height={79}
                        />
                      </a>
                    </div>
                    <div className="mr-22">
                      <a
                        href="https://www.playstation.com/th-th/games/honkai-star-rail/"
                        target="_blank"
                        rel="noopener"
                      >
                        <Image
                          src={"/header/google_play.png"}
                          alt="google play logo"
                          width={256}
                          height={79}
                        />
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://www.playstation.com/th-th/games/honkai-star-rail/"
                        target="_blank"
                        rel="noopener"
                      >
                        <Image
                          src={"/header/epic_store.png"}
                          alt="epic store logo"
                          width={256}
                          height={79}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="game-rating">
              <Image
                src={"/header/rating.png"}
                alt="teen rated ESRB logo"
                width={159}
                height={96}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (typeof window === "object") {
    return createPortal(
      component,
      document.querySelector("body") as HTMLElement
    );
  }

  return component;
}
