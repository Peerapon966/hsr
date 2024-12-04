import "@/features/authentication/assets/css/login.css";
import { createPortal } from "react-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { LoginForm } from "@/features/authentication/components/Login/LoginForm";
import { RegisterForm } from "@/features/authentication/components/Register/RegisterForm";
import { disableScroll, enableScroll } from "@/utils/disableScroll";
import { Loader } from "@/features/authentication/components/Login/Loader";
import { createContext } from "react";
import {
  TLoginModalContext,
  useLoginModalContext,
} from "@/components/Header/Header";
import { openNewWindow } from "@/utils/openNewWindow";

const LoadingContext = createContext<Function>(() => void 0);

export function useLoadingContext() {
  return useContext(LoadingContext);
}

export function LoginModal() {
  const componentDidMount = useRef<boolean>(false);
  const { showLoginModal, setShowLoginModal } =
    useLoginModalContext() as TLoginModalContext;
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [username, setUsername] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginModal = useRef<HTMLDivElement | null>(null);
  const overlay = useRef<HTMLDivElement | null>(null);
  const closeModal = () => {
    setTimeout(() => setShowLoginModal(false), 300);
    overlay.current?.classList.remove("overlay-dialog-animation");
    loginModal.current?.classList.remove("login-dialog-animation");
    if (overlay.current) {
      enableScroll(overlay.current);
    }
  };
  const swapFormContent = (username?: string) => {
    setIsLogin(!isLogin);
    setIsRegister(!isRegister);
    if (username) {
      setUsername(username);
    }
  };

  useEffect(() => {
    if (!componentDidMount.current) {
      componentDidMount.current = true;
      setTimeout(() => {
        overlay.current?.classList.add("overlay-dialog-animation");
        loginModal.current?.classList.add("login-dialog-animation");
      }, 200);
    }
  }, []);

  useEffect(() => {
    if (showLoginModal && overlay.current) {
      disableScroll(overlay.current);
    }
  }, [showLoginModal]);

  const component = (
    <>
      <LoadingContext.Provider value={setIsLoading}>
        <div ref={overlay} className="login-overlay-dialog-container">
          <div className="overlay-dialog">
            <div
              ref={loginModal}
              data-flex-col
              className="dialog-container login-dialog-container"
              id="login-dialog-container"
            >
              <button
                type="button"
                className="close-login-btn"
                onClick={() => closeModal()}
              ></button>
              <div data-flex-col className="login-dialog-body">
                <div className="login-form-container">
                  <LoginForm
                    username={username}
                    isOpen={isLogin}
                    swapFormContent={swapFormContent}
                  />
                  <RegisterForm
                    isOpen={isRegister}
                    swapFormContent={swapFormContent}
                  />
                </div>
                <div className="third-party-login-container">
                  <div className="section-separator">
                    <div data-flex className="section-text">
                      More Login Methods
                    </div>
                  </div>
                  <div className="login-methods-container">
                    <div data-flex className="login-methods">
                      <div
                        onClick={() =>
                          openNewWindow("/oauth/google", "Sample Sign In")
                        }
                        className="third-party google-bg"
                      ></div>
                      <div className="third-party apple-bg"></div>
                      <div className="third-party facebook-bg"></div>
                      <div className="third-party twitter-bg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isLoading && <Loader />}
      </LoadingContext.Provider>
    </>
  );

  if (typeof window === "object") {
    return createPortal(
      component,
      document.querySelector("body") as HTMLBodyElement
    );
  }

  return component;
}
