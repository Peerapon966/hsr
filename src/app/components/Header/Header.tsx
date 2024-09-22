"use client";

import "@/assets/css/header.css";
import {
  useEffect,
  useState,
  Suspense,
  useRef,
  createContext,
  useContext,
  useCallback,
} from "react";
import { checkLoginStatus } from "@/services/auth/checkLoginStatus";
import Download from "@/components/Header/Download";
import LoginButton from "@/components/Header/LoginButton";
import UserButton from "@/components/Header/UserButton";
import { useDOMObject } from "@/hooks/useDOMObject";
import { disableScroll } from "@/utils/disableScroll";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

type TPages = {
  pagename: string;
  pathname: string;
};

const LoginContext = createContext<Function>(() => void 0);

export function useLoginContext() {
  return useContext(LoginContext);
}

export function Header(): JSX.Element {
  const params = useParams();
  const lang = params.lang;
  const currentPage = usePathname().split("/").slice(2)[0];
  const pages: TPages[] = [
    { pagename: "Home", pathname: "home" },
    { pagename: "News", pathname: "news" },
    { pagename: "Characters", pathname: "characters" },
    { pagename: "Worlds", pathname: "worlds" },
  ];
  const header = useRef<HTMLDivElement | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [audioRectangles] = useDOMObject<[HTMLDivElement[]]>([
    { from: "classname", value: "rectangle", getAll: true },
  ]);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showDownloadModal, setShowDownloadModal] = useState<boolean>(false);
  const musicAnimation = () => {
    for (let rectangle of audioRectangles) {
      rectangle.classList.toggle("paused");
    }
  };
  const closeLoginModal = useCallback(() => {
    setShowLoginModal(false);
  }, [showLoginModal]);
  const closeDownloadModal = useCallback(() => {
    setShowDownloadModal(false);
  }, [showDownloadModal]);

  useEffect(function checkAuthStatus() {
    (async () => {
      const result: boolean = await checkLoginStatus();
      setIsAuth(result);
    })();
  }, []);

  useEffect(
    function resetLoginModal() {
      if (isAuth) {
        setShowLoginModal(false);
      }
    },
    [isAuth]
  );

  useEffect(() => {
    if (header.current && currentPage === "home") {
      disableScroll(header.current);
    }
  }, [currentPage]);

  return (
    // <Suspense fallback={<h1>Loading...</h1>} >
    <LoginContext.Provider value={setIsAuth}>
      <div ref={header} className="header-container">
        <div className="header-wrapper">
          <div data-flex className="flex-item bgm">
            <div
              data-flex
              className="music-control"
              onClick={() => musicAnimation()}
            >
              <div className="rectangle rectangle-1"></div>
              <div className="rectangle rectangle-2"></div>
              <div className="rectangle rectangle-3"></div>
              <div className="rectangle rectangle-4"></div>
              <div className="rectangle rectangle-5"></div>
            </div>
          </div>
          <div data-flex className="flex-item nav-list">
            {pages.map(({ pagename, pathname }) => (
              <div
                key={pathname}
                data-flex
                className={pathname === currentPage ? "active" : ""}
              >
                <Link href={`/${lang}/${pathname}`}>
                  <div data-flex className="nav-item">
                    {pagename}
                  </div>
                </Link>
              </div>
            ))}
            <div data-flex className="" id="top-up">
              <a
                data-flex
                href="https://sdk.hoyoverse.com/payment/hsr/index.html#/"
                target="_blank"
                rel="noopener"
              >
                <div data-flex className="nav-item top-up">
                  Top-Up
                </div>
              </a>
            </div>
            <div data-flex className="more" id="more">
              <a data-flex className="drop-menu">
                <div data-flex className="nav-item">
                  More
                </div>
              </a>
              <div data-flex className="menu-list">
                <div data-flex className="menu-list-item hoyolab">
                  <a
                    href="https://www.hoyolab.com/circles/6/39/official?page_type=39&page_sort=news"
                    target="_blank"
                    rel="noopener"
                  >
                    <div>HoYoLAB</div>
                  </a>
                </div>
                <div data-flex className="menu-list-item tour">
                  <a
                    href="https://hsr.hoyoverse.com/worldtour?lang=en-us"
                    target="_blank"
                    rel="noopener"
                  >
                    <div>Tour</div>
                  </a>
                </div>
                <div data-flex className="menu-list-item redeem-code">
                  <a
                    href="https://hsr.hoyoverse.com/gift"
                    target="_blank"
                    rel="noopener"
                  >
                    <div>Redeem code</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div data-flex className="flex-item main-axis-center login">
            {isAuth ? (
              <UserButton setIsAuth={setIsAuth} username={"username"} />
            ) : (
              <LoginButton
                showLoginModal={showLoginModal}
                closeLoginModal={closeLoginModal}
                setShowLoginModal={setShowLoginModal}
              />
            )}
          </div>
          <div
            data-flex
            className="flex-item download"
            onClick={() => setShowDownloadModal(true)}
          >
            <div className="download-content">Download Now</div>
            {showDownloadModal && (
              <Download
                openModal={showDownloadModal}
                closeModal={closeDownloadModal}
              />
            )}
          </div>
        </div>
      </div>
    </LoginContext.Provider>
    // </Suspense>
  );
}
