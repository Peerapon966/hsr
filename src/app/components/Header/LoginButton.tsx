import dynamic from "next/dynamic";
import Image from "next/image";
import { Loader } from "@/features/authentication/components/Login/Loader";

const LoginModal = dynamic(
  () =>
    import("src/app/features/authentication/components/Login/LoginModal").then(
      (module) => ({
        default: module.LoginModal,
      })
    ),
  { loading: () => <Loader /> }
);

type LogginButtonProps = {
  showLoginModal: boolean;
  closeLoginModal: Function;
  setShowLoginModal: Function;
};

export default function LoginButton(props: LogginButtonProps) {
  return (
    <div data-flex onClick={() => props.setShowLoginModal(true)}>
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
      {props.showLoginModal && (
        <LoginModal
          showModal={props.showLoginModal}
          closeModal={props.closeLoginModal}
        />
      )}
    </div>
  );
}
