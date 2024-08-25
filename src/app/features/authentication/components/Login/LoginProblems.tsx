import { IModal } from "@/features/authentication/interface";
import { useDOMObject } from "@/hooks/useDOMObject";

export function LoginProblems(props: IModal) {
  const [loginProblemsOverlay, loginProblems] = useDOMObject<
    [HTMLDivElement, HTMLDivElement]
  >([
    { from: "id", value: "login-problem-overlay-dialog-container" },
    { from: "id", value: "login-problem-dialog-container" },
  ]);
  const closeModal = () => {
    setTimeout(() => props.closeModal(), 300);
    loginProblemsOverlay?.classList.remove("overlay-dialog-animation");
    loginProblems?.classList.remove("login-dialog-animation");
  };

  loginProblemsOverlay?.classList.add("overlay-dialog-animation");
  loginProblems?.classList.add("login-dialog-animation");

  return (
    <div
      className="login-overlay-dialog-container auxiliary-overlay-dialog-container"
      id="login-problem-overlay-dialog-container"
    >
      <div className="overlay-dialog">
        <div
          data-flex-col
          className="dialog-container auxiliary-dialog-container"
          id="login-problem-dialog-container"
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
}
