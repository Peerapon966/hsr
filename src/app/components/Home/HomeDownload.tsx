import "@/assets/css/homeDownload.css"
import Image from "next/image"

export default function HomeDownload() {
  return (
    <div data-flex className="download-dialog-content home-download-container">
      <div className="download-qr"></div>
      <div className="download-methods">
        <div data-flex className="download-methods-row download-methods-upper-row">
          <div className="mr-22">
            <a href="https://www.playstation.com/th-th/games/honkai-star-rail/" target="_blank" rel="noopener">
              <Image src={"/header/ps5.png"} alt="ps5 logo" width={165} height={51} />
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
      <div>
        <Image src={"/header/rating.png"} alt="teen rated ESRB logo" width={165} height={51} className="game-rating" />
      </div>
    </div>
  )
}