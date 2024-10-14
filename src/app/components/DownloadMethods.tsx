import Image from "next/image";

export type DownloadMethodsProps = {
  withESRB: boolean;
  containerStyles?: string;
  gapSize?: string;
};

export function DownloadMethods({
  withESRB,
  containerStyles,
  gapSize,
}: DownloadMethodsProps) {
  return (
    <div className={`flex ${containerStyles}`}>
      <div
        style={{ marginRight: gapSize }}
        className="w-[124px] bg-[image:var(--qr-code)] bg-no-repeat bg-contain bg-right"
      ></div>
      <div className="download-methods">
        <div style={{ marginBottom: gapSize }} className="flex h-[51px]">
          <div style={{ marginRight: gapSize }}>
            <a
              href="https://www.playstation.com/th-th/games/honkai-star-rail/"
              target="_blank"
              rel="noopener"
            >
              <Image
                src="/header/ps5.png"
                alt="ps5 logo"
                width={256}
                height={79}
                className="w-auto h-full"
                priority
                draggable={false}
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
                src="/header/windows.png"
                alt="windows logo"
                width={256}
                height={79}
                className="w-auto h-full"
                priority
                draggable={false}
              />
            </a>
          </div>
        </div>
        <div data-flex className="flex h-[51px]">
          <div style={{ marginRight: gapSize }}>
            <a
              href="https://www.playstation.com/th-th/games/honkai-star-rail/"
              target="_blank"
              rel="noopener"
            >
              <Image
                src="/header/app_store.png"
                alt="apple app store logo"
                width={256}
                height={79}
                className="w-auto h-full"
                priority
                draggable={false}
              />
            </a>
          </div>
          <div style={{ marginRight: gapSize }}>
            <a
              href="https://www.playstation.com/th-th/games/honkai-star-rail/"
              target="_blank"
              rel="noopener"
            >
              <Image
                src="/header/google_play.png"
                alt="google play logo"
                width={256}
                height={79}
                className="w-auto h-full"
                priority
                draggable={false}
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
                src="/header/epic_store.png"
                alt="epic store logo"
                width={256}
                height={79}
                className="w-auto h-full"
                priority
                draggable={false}
              />
            </a>
          </div>
        </div>
      </div>
      {withESRB && (
        <div style={{ marginLeft: gapSize }} className="flex">
          <Image
            src="/shared/rating.png"
            alt="game rating image"
            width={194}
            height={115}
            className="h-[1.14em] w-auto"
            priority
            draggable={false}
          />
        </div>
      )}
    </div>
  );
}
