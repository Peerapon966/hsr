import Image from "next/image";

export function HomeDownload() {
  return (
    <div className="flex absolute bottom-[1.21rem] left-[2rem] text-[100px]">
      <div className="h-[1.14em] w-[1.14em] relative mr-[0.12em]">
        <Image src="/header/download_qr.png" alt="QR code" fill />
      </div>
      <div className="flex-col">
        <div className="flex h-[0.51em] mb-[0.12em]">
          <div className="mr-[0.12rem]">
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
                className="h-full w-auto"
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
                className="h-full w-auto"
              />
            </a>
          </div>
        </div>
        <div className="flex h-[0.51em]">
          <div className="mr-[0.12rem]">
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
                className="h-full w-auto"
              />
            </a>
          </div>
          <div className="mr-[0.12rem]">
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
                className="h-full w-auto"
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
                className="h-full w-auto"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="flex ml-[0.12em]">
        <Image
          src="/shared/rating.png"
          alt="game rating image"
          width={194}
          height={115}
          className="h-[1.14em] w-auto"
        />
      </div>
    </div>
  );
}
