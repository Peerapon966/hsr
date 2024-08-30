import { IModal } from "@/features/authentication/interface";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function LoginPrompt(props: IModal & { callback: Function }) {
  const loginPromptOverlay = useRef<HTMLDivElement | null>(null);
  const loginPrompt = useRef<HTMLDivElement | null>(null);
  const closeModal = () => {
    setTimeout(() => props.closeModal(), 300);
    loginPromptOverlay.current?.classList.remove("overlay-dialog-animation");
    loginPrompt.current?.classList.remove("login-dialog-animation");
  };
  const userAgreeHandler = () => {
    props.callback();
    closeModal();
  };

  useEffect(() => {
    setTimeout(
      () =>
        loginPromptOverlay.current?.classList.add("overlay-dialog-animation"),
      50
    );
    setTimeout(
      () => loginPrompt.current?.classList.add("login-dialog-animation"),
      50
    );
  }, []);

  const component = (
    <div ref={loginPromptOverlay} className="login-overlay-dialog-container">
      <div className="overlay-dialog">
        <div
          data-flex-col
          ref={loginPrompt}
          className="dialog-container auxiliary-dialog-container"
        >
          <button
            type="button"
            className="close-login-btn"
            onClick={() => closeModal()}
          ></button>
          <div className="auxiliary-dialog-header agreement-dialog-header">
            <span className="dialog-header">Registered</span>
          </div>
          <div className="auxiliary-dialog-body agreement-dialog-body">
            <div className="pb-[16px] pt-[18px] px-[28px] text-[14px] text-[#3c3f44]">
              <span>
                This email address has been used to register for an account. Log
                in?
              </span>
            </div>
          </div>
          <div
            data-flex-col
            className="auxiliary-dialog-option agreement-dialog-option"
          >
            <div className="options agreement-options !pt-[12px] !pb-[24px]">
              <a
                data-flex
                type="button"
                className="option accept main-axis-center cross-axis-center"
                onClick={() => userAgreeHandler()}
              >
                <div className="">OK</div>
              </a>
              <a
                data-flex
                type="button"
                className="option decline main-axis-center cross-axis-center"
                onClick={() => closeModal()}
              >
                <div className="">Cancel</div>
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
