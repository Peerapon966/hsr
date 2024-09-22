import { IModal } from "@/features/authentication/interface";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function LoginProblems(props: IModal) {
  const loginProblemsOverlay = useRef<HTMLDivElement | null>(null);
  const loginProblems = useRef<HTMLDivElement | null>(null);
  const closeModal = () => {
    setTimeout(() => props.closeModal(), 300);
    loginProblemsOverlay.current?.classList.remove("overlay-dialog-animation");
    loginProblems.current?.classList.remove("login-dialog-animation");
  };

  useEffect(() => {
    setTimeout(
      () =>
        loginProblemsOverlay.current?.classList.add("overlay-dialog-animation"),
      50
    );
    setTimeout(
      () => loginProblems.current?.classList.add("login-dialog-animation"),
      50
    );
  }, []);

  const component = (
    <div
      className="fixed invisible bg-[var(--el-overlay-color-lighter)] opacity-0 top-0 left-0 right-0 bottom-0 h-screen w-full z-[1010] over-dialog-container"
      ref={loginProblemsOverlay}
    >
      <div className="overlay-dialog">
        <div
          data-flex-col
          className="dialog-container auxiliary-dialog-container"
          ref={loginProblems}
        >
          <button
            type="button"
            className="close-login-btn"
            onClick={() => closeModal()}
          ></button>
          <div className="auxiliary-dialog-header login-problem-dialog-header">
            <span className="dialog-header">Having Problems?</span>
          </div>
          <div
            data-flex-col
            className="auxiliary-dialog-option login-problem-dialog-option"
          >
            <div className="options login-problems">
              <a
                data-flex
                type="button"
                href="https://account.hoyoverse.com/login-platform/index.html?st=https%3A%2F%2Fhsr.hoyoverse.com%2Fen-us%2Fhome&token_type=4&client_type=4&app_id=ciebhwzprpq8&game_biz=hkrpg_global&lang=en-us&theme=light-hkrpg&ux_mode=redirect&iframe_level=1&account=#/forgot-password"
                target="_blank"
                rel="noopener"
                className="login-problem"
                onClick={() => closeModal()}
              >
                <svg className="svg-icon icon-lock" aria-hidden="true">
                  <use href="#icon-lock"></use>
                </svg>
                <div className="problem-text">Forgot password?</div>
              </a>
              <a
                data-flex
                type="button"
                href="https://account.hoyoverse.com/index.html?hide_back=1&hide_header=1&hide_sidebar=1&hide_footer=1&lang=en-us#/about/questions"
                target="_blank"
                rel="noopener"
                className="login-problem"
                onClick={() => closeModal()}
              >
                <svg className="svg-icon icon-question" aria-hidden="true">
                  <use href="#icon-question"></use>
                </svg>
                <div className="problem-text">FAQ</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof window === "object") {
    return createPortal(
      component,
      document.querySelector("body") as HTMLElement
    );
  }

  return component;
}
