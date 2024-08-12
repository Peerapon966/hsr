"use client"

import "@/assets/css/download.css"
import { useEffect, useState } from "react";
import { useDOMObject } from "@/hooks";
import ReactDOM from "react-dom";
import Image from 'next/image'

interface modal {
  openModal: boolean
  closeModal: Function
  auxiliary?: any
}

export default function Download({ openModal, closeModal }: modal) {
  const [componentDidMount, setComponentDidMount] = useState<boolean>(false);
  const [downloadModal, overlay] = useDOMObject<[HTMLDivElement, HTMLDivElement]>([
    { from: 'id', value: 'download-dialog-container' },
    { from: 'id', value: 'download-overlay-dialog-container' }
  ]);
  const closeModalHandler = () => {
    setTimeout(() => {
      closeModal()
    }, 300)
    downloadModal?.classList.remove('download-dialog-animation');
    overlay?.classList.remove('download-overlay-dialog-animation');
  }
  useEffect(() => {
    setComponentDidMount(true)
  }, [])

  if (openModal) {
    downloadModal?.classList.add('download-dialog-animation');
    overlay?.classList.add('download-overlay-dialog-animation');
  }

  const component = (
    <>
      <div data-flex className="download-overlay-dialog-container main-axis-center cross-axis-center" id="download-overlay-dialog-container" onClick={() => closeModalHandler()}>
        <div className="download-overlay-dialog">
          <div className="download-dialog-container" id="download-dialog-container" onClick={(e) => e.stopPropagation()}>
            <div data-flex-col className="download-dialog cross-axis-center">
              <div className="download-close-btn-container">
                <button type="button" className="download-close-btn" onClick={() => closeModalHandler()}></button>
              </div>
              <div className="download-dialog-header">
                <span>Download</span>
              </div>
              <div data-flex className="download-dialog-content">
                <div className="download-qr"></div>
                <div className="download-methods">
                  <div data-flex className="download-methods-row download-methods-upper-row">
                    <div className="mr-22">
                      <a href="https://www.playstation.com/th-th/games/honkai-star-rail/" target="_blank" rel="noopener">
                        <Image src={"/header/ps5.png"} alt="ps5 logo" width={165} height={51} loading="lazy" />
                      </a>
                    </div>
                    <div>
                      <a href="https://www.playstation.com/th-th/games/honkai-star-rail/" target="_blank" rel="noopener">
                        <Image src={"/header/windows.png"} alt="windows logo" width={165} height={51} />
                      </a>
                    </div>
                  </div>
                  <div data-flex className="download-methods-row">
                    <div className="mr-22">
                      <a href="https://www.playstation.com/th-th/games/honkai-star-rail/" target="_blank" rel="noopener">
                        <Image src={"/header/app_store.png"} alt="apple app store logo" width={165} height={51} />
                      </a>
                    </div>
                    <div className="mr-22">
                      <a href="https://www.playstation.com/th-th/games/honkai-star-rail/" target="_blank" rel="noopener">
                        <Image src={"/header/google_play.png"} alt="google play logo" width={165} height={51} />
                      </a>
                    </div>
                    <div>
                      <a href="https://www.playstation.com/th-th/games/honkai-star-rail/" target="_blank" rel="noopener">
                        <Image src={"/header/epic_store.png"} alt="epic store logo" width={165} height={51} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Image src={"/header/rating.png"} alt="teen rated ESRB logo" width={165} height={51} className="game-rating" />
          </div>
        </div>
      </div>
    </>
  )

  if (typeof window === "object") {
    return ReactDOM.createPortal(
      component,
      document.querySelector('body') as HTMLElement
    )
  }

  return component
}