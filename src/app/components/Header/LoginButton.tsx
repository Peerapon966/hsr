import dynamic from "next/dynamic";
import Image from "next/image";
import { Loader } from "@/features/authentication/components/Login/Loader";
import {
  TLoginModalContext,
  useLoginModalContext,
} from "@/components/Header/Header";

const LoginModal = dynamic(
  () =>
    import("src/app/features/authentication/components/Login/LoginModal").then(
      (module) => ({
        default: module.LoginModal,
      })
    ),
  { loading: () => <Loader /> }
);

export default function LoginButton() {
  const { showLoginModal, setShowLoginModal } =
    useLoginModalContext() as TLoginModalContext;

  return (
    <div data-flex onClick={() => setShowLoginModal(true)}>
      <div data-flex className="login-content">
        Log In
        <span data-flex id="login-logo">
          <Image
            src="/header/logo_avatar.png"
            alt="user avatar icon"
            width={47}
            height={47}
            className="h-full w-auto logo-avatar"
            priority
            draggable={false}
          />
        </span>
      </div>
      {showLoginModal && <LoginModal />}
    </div>
  );
}
