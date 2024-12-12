import { createPortal } from "react-dom";

export function Loader() {
  const component = (
    <div className="absolute flex justify-center items-center w-[80px] h-[80px] z-[10000] bg-[#2b2e33] rounded-[20px] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <div className="w-[46px] h-[46px] bg-[image:var(--rotating-loader-image)] bg-no-repeat bg-center bg-contain animate-spin"></div>
    </div>
  );

  if (typeof window === "object") {
    return createPortal(
      component,
      document.querySelector("body") as HTMLBodyElement
    );
  }

  return component;
}
