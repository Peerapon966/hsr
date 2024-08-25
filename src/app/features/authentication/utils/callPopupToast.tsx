import { createRoot } from "react-dom/client";
import { PopupToast } from "@/features/authentication/components/PopupToast/PopupToast";

export function callPopupToast(message: string) {
  const toast = <PopupToast message={message} />;
  const container = document.createElement("div");
  container.id = "toast";
  const body = document.querySelector("body");

  body?.appendChild(container);
  createRoot(container).render(toast);
  setTimeout(() => {
    body?.removeChild(container as Node);
  }, 3500);
}
