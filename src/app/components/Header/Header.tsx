"use client"

import "@/assets/css/header.css";
import { useEffect, useState, Suspense, useRef, createContext, Dispatch, SetStateAction, useContext, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { checkLoginStatus } from "@/services/auth";
import Download from "@/components/Header/Download";
import LoginButton from "@/components/Header/LoginButton";
import UserButton from "@/components/Header/UserButton";
import { ReactBaseProps } from "@/interface";
// import { Link } from "react-router-dom";

const LoginContext = createContext<Function>(() => void (0));

export function useLoginContext() {
  return useContext(LoginContext)
}

export default function Header(): JSX.Element {
  const router = useRouter();
  const currentPage = usePathname().slice(1);
  const pages = ['home', 'news', 'characters', 'worlds'];
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [html, setHtml] = useState<HTMLElement>();
  const [modalContainer, setModalContainer] = useState<HTMLDivElement>();
  const [playAnimation, setPlayAnimation] = useState<boolean>(true)
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
  const [showDownloadModal, setShowDownloadModal] = useState<boolean>(false)
  const musicAnimation = useCallback(() => {
    if (playAnimation) {
      return 'running'
    }
    return 'paused'
  }, [playAnimation]);
  const closeLoginModal = useCallback(() => {
    setShowLoginModal(false)
  }, [showLoginModal]);
  const closeDownloadModal = useCallback(() => {
    setShowDownloadModal(false)
  }, [showDownloadModal]);

  useEffect(function checkAuthStatus() {
    (async () => {
      const result: boolean = await checkLoginStatus();
      setIsAuth(result)
    })()
  }, [])

  useEffect(function setCurrentPage() {
    pages.map((page) => {
      (page === currentPage)
        ? document.getElementById(page)?.classList.add('active')
        : document.getElementById(page)?.classList.remove('active')
    })
  }, [currentPage])

  useEffect(function resetLoginModal() {
    if (isAuth) {
      setShowLoginModal(false)
    }
  }, [isAuth])

  useEffect(function bootstrap() {
    const modalContainer = document.createElement('div');
    modalContainer.id = 'modal';
    setModalContainer(modalContainer);
  }, [])

  // useEffect(() => {
  //     console.log(showLoginModal);
  //     (showLoginModal)? disableScroll(): enableScroll()
  // }, [showLoginModal])

  // const preventDefault = useCallback((e: Event) => {
  //     e.preventDefault()
  // }, [])

  // function disableScroll() {
  //     window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  //     // window.addEventListener('wheel', preventDefault, {passive: false}); // modern desktop
  //     // window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  //     window.addEventListener('keydown', preventDefault, false);
  // }

  // function enableScroll() {
  //     window.removeEventListener('DOMMouseScroll', preventDefault, false); // older FF
  //     // window.removeEventListener('wheel', preventDefault, false); // modern desktop
  //     // window.removeEventListener('touchmove', preventDefault, wheelOpt); // mobile
  //     window.removeEventListener('keydown', preventDefault, false);
  // }

  return (
    // <Suspense fallback={<h1>Loading...</h1>} >
    <LoginContext.Provider value={setIsAuth} >
      <div className="header-container">
        <div className="header-wrapper">
          <div data-flex className="flex-item bgm">
            <div data-flex className="music-control" onClick={() => setPlayAnimation(!playAnimation)}>
              <div className="rectangle rectangle-1" style={{ animationPlayState: `${musicAnimation()}` }}></div>
              <div className="rectangle rectangle-2" style={{ animationPlayState: `${musicAnimation()}` }}></div>
              <div className="rectangle rectangle-3" style={{ animationPlayState: `${musicAnimation()}` }}></div>
              <div className="rectangle rectangle-4" style={{ animationPlayState: `${musicAnimation()}` }}></div>
              <div className="rectangle rectangle-5" style={{ animationPlayState: `${musicAnimation()}` }}></div>
            </div>
          </div>
          <div data-flex className="flex-item nav-list">
            <div data-flex className="" id="home">
              <a onClick={() => router.push('/home')}>
                <div data-flex className="nav-item">
                  Home
                </div>
              </a>
            </div>
            <div data-flex className="" id="news">
              <a onClick={() => router.push('/news')}>
                <div data-flex className="nav-item">
                  News
                </div>
              </a>
            </div>
            <div data-flex className="" id="characters">
              <a onClick={() => router.push('/characters')}>
                <div data-flex className="nav-item">
                  Characters
                </div>
              </a>
            </div>
            <div data-flex className="" id="worlds">
              <a onClick={() => router.push('/worlds')}>
                <div data-flex className="nav-item">
                  Worlds
                </div>
              </a>
            </div>
            <div data-flex className="" id="top-up">
              <a data-flex href="https://sdk.hoyoverse.com/payment/hsr/index.html#/" target="_blank" rel="noopener">
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
                  <a href="https://www.hoyolab.com/circles/6/39/official?page_type=39&page_sort=news" target="_blank" rel="noopener">
                    <div>HoYoLAB</div>
                  </a>
                </div>
                <div data-flex className="menu-list-item tour">
                  <a href="https://hsr.hoyoverse.com/worldtour?lang=en-us" target="_blank" rel="noopener">
                    <div>Tour</div>
                  </a>
                </div>
                <div data-flex className="menu-list-item redeem-code">
                  <a href="https://hsr.hoyoverse.com/gift" target="_blank" rel="noopener">
                    <div>Redeem code</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div data-flex className="flex-item main-axis-center login">
            {(isAuth) ? <UserButton setIsAuth={setIsAuth} username={'username'} /> : <LoginButton showLoginModal={showLoginModal} closeLoginModal={closeLoginModal} setShowLoginModal={setShowLoginModal} />}
          </div>
          <div data-flex className="flex-item download" onClick={() => setShowDownloadModal(true)}>
            <div className="download-content">
              Download Now
            </div>
            {(showDownloadModal) ? <Download openModal={showDownloadModal} closeModal={closeDownloadModal} /> : null}
          </div>
        </div>
      </div>
    </LoginContext.Provider>
    // </Suspense>
  )
}