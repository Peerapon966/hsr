import "@/assets/css/changeview.css";
import { createPortal } from "react-dom";

interface changeViewProps {
  layout: string;
  closePrompt: Function;
}

export function ChangeView({ layout, closePrompt }: changeViewProps) {
  const recommendedDisplay =
    layout == "portrait"
      ? "端末を縦にして閲覧してください"
      : "端末を横にして閲覧してください";
  const component = (
    <div className="container">
      <div className="close-button-wrapper">
        <svg
          className="close-button"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4223"
          width="30"
          height="30"
          onClick={() => closePrompt()}
        >
          <path
            d="M576 512l277.333333 277.333333-64 64-277.333333-277.333333L234.666667 853.333333 170.666667 789.333333l277.333333-277.333333L170.666667 234.666667 234.666667 170.666667l277.333333 277.333333L789.333333 170.666667 853.333333 234.666667 576 512z"
            fill="#ffffff"
            p-id="4224"
          ></path>
        </svg>
      </div>
      <div className="content-wrapper">
        <img src={"/change_view/phone_icon.png"} className="phone-icon"></img>
        <span className="text">{recommendedDisplay}</span>
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
