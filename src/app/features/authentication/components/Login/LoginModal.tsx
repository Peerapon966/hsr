import "@/features/authentication/assets/css/login.css";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { LoginForm } from "@/features/authentication/components/Login/LoginForm";
import { RegisterForm } from "@/features/authentication/components/Register/RegisterForm";
import { useDOMObject } from "@/hooks/useDOMObject";
import { IModal } from "@/features/authentication/interface";

export function LoginModal(props: IModal) {
  const [componentDidMount, setComponentDidMount] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [username, setUsername] = useState<string | undefined>();
  const [loginModal, overlay] = useDOMObject<[HTMLDivElement, HTMLDivElement]>([
    { from: "id", value: "login-dialog-container" },
    { from: "id", value: "overlay-dialog-container" },
  ]);
  const closeLoginModal = () => {
    setTimeout(() => props.closeModal(), 300);
    overlay?.classList.remove("overlay-dialog-animation");
    loginModal?.classList.remove("login-dialog-animation");
  };
  const swapFormContent = (username?: string) => {
    setIsLogin(!isLogin);
    setIsRegister(!isRegister);
    if (username) {
      setUsername(username);
    }
  };

  overlay?.classList.add("overlay-dialog-animation");
  loginModal?.classList.add("login-dialog-animation");

  if (overlay) {
    overlay.addEventListener("wheel", (e) => e.preventDefault(), false);
  }

  useEffect(() => {
    setComponentDidMount(true);
  }, []);

  const component = (
    <>
      <div
        className="login-overlay-dialog-container"
        id="overlay-dialog-container"
      >
        <div className="overlay-dialog">
          <div
            data-flex-col
            className="dialog-container login-dialog-container"
            id="login-dialog-container"
          >
            <button
              type="button"
              className="close-login-btn"
              onClick={() => closeLoginModal()}
            ></button>
            <div data-flex-col className="login-dialog-body">
              <div className="login-form-container">
                <LoginForm
                  username={username}
                  isOpen={isLogin}
                  closeModal={closeLoginModal}
                  swapFormContent={swapFormContent}
                />
                <RegisterForm
                  isOpen={isRegister}
                  closeModal={closeLoginModal}
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
                    <div className="third-party google-bg"></div>
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
