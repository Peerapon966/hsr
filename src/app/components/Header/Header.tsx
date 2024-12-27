"use client";

import "@/assets/css/header.css";
import {
  useEffect,
  useState,
  useRef,
  createContext,
  useContext,
  SetStateAction,
} from "react";
import Download from "@/components/Header/Download";
import LoginButton from "@/components/Header/LoginButton";
import UserButton from "@/components/Header/UserButton";
import { useDOMObject } from "@/hooks/useDOMObject";
import { disableScroll } from "@/utils/disableScroll";
import { Link } from "i18n/routing";
import { useLocale } from "next-intl";
import { PageContext, type TPageContext } from "@/layouts/PageLayout";
import { AVAILABLE_PAGES } from "const";
import { useSession } from "next-auth/react";

export type TLoginModalContext = {
  showLoginModal: boolean;
  setShowLoginModal: React.Dispatch<SetStateAction<boolean>>;
};

export type TDownloadModalContext = {
  showDownloadModal: boolean;
  setShowDownloadModal: React.Dispatch<SetStateAction<boolean>>;
};

const LoginContext = createContext<Function>(() => void 0);
const LoginModalContext = createContext<TLoginModalContext | null>(null);
const DownloadModalcontext = createContext<TDownloadModalContext | null>(null);

export function useLoginContext() {
  return useContext(LoginContext);
}

export function useLoginModalContext() {
  return useContext(LoginModalContext);
}

export function useDownloadModalContext() {
  return useContext(DownloadModalcontext);
}
export function Header(): JSX.Element {
  const { currentPage } = useContext(PageContext) as TPageContext;
  const { data: session, status } = useSession();
  const locale = useLocale();
  const header = useRef<HTMLDivElement | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(status === "authenticated");
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
  const loginContextProvider: TLoginModalContext = {
    showLoginModal,
    setShowLoginModal,
  };
  const downloadContextProvider: TDownloadModalContext = {
    showDownloadModal,
    setShowDownloadModal,
  };

  useEffect(() => {
    if (status) setShowLoginModal(false);
    setIsAuth(status === "authenticated");
  }, [status]);

  useEffect(() => {
    if (header.current && currentPage === "home") {
      disableScroll(header.current);
    }
  }, [currentPage]);

  return (
    <DownloadModalcontext.Provider value={downloadContextProvider}>
      <LoginModalContext.Provider value={loginContextProvider}>
        <LoginContext.Provider value={setIsAuth}>
          <div ref={header} className="header-container font-yahei">
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
                {Object.entries(AVAILABLE_PAGES).map(([pagename, pathname]) => (
                  <div
                    key={pathname}
                    data-flex
                    className={pathname === currentPage ? "active" : ""}
                  >
                    <Link href={`/${pathname}`} locale={locale} scroll={false}>
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
                  <UserButton
                    setIsAuth={setIsAuth}
                    username={session?.user?.name || "Anonymous"}
                  />
                ) : (
                  <LoginButton />
                )}
              </div>
              <div
                data-flex
                className="flex-item download"
                onClick={() => setShowDownloadModal(true)}
              >
                <div className="download-content">Download Now</div>
                {showDownloadModal && <Download />}
              </div>
            </div>
          </div>
        </LoginContext.Provider>
      </LoginModalContext.Provider>
    </DownloadModalcontext.Provider>
  );
}
