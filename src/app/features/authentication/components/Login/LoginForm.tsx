import { useState, useEffect, FormEvent, useCallback, useRef } from "react";
import { InputField } from "@/features/authentication/components/InputField/InputField";
import { LoginFormProps } from "@/features/authentication/interface";
import { useLoadingContext } from "@/features/authentication/components/Login/LoginModal";
import { LoginProblems } from "@/features/authentication/components/Login/LoginProblems";
import { signIn } from "next-auth/react";
import { callPopupToast } from "@/features/authentication/utils/callPopupToast";
import {
  TLoginModalContext,
  useLoginModalContext,
} from "@/components/Header/Header";
import {
  For,
  LoginFieldNames,
} from "@/features/authentication/components/InputField/InputField";

export function LoginForm({
  isOpen,
  swapFormContent,
  username,
}: LoginFormProps) {
  const [showLoginProblemsModal, setShowLoginProblemsModal] =
    useState<boolean>(false);
  const { setShowLoginModal } = useLoginModalContext() as TLoginModalContext;
  const setIsLoading = useLoadingContext();
  const usernameInput = InputField({
    for: For.login,
    fieldName: LoginFieldNames.username,
    label: "Username/Email",
    type: "text",
    options: {
      initialValue: username,
      realtimeUpdate: false,
      regex: ["not-empty"],
      errorMsg: {
        empty: "Account cannot be empty",
      },
    },
  });
  const passwordInput = InputField({
    for: For.login,
    fieldName: LoginFieldNames.password,
    label: "Password",
    type: "password",
    options: {
      realtimeUpdate: false,
      regex: ["not-empty"],
      errorMsg: {
        empty: "Password cannot be empty",
      },
    },
  });
  const errors = [usernameInput.error, passwordInput.error];
  const values = [usernameInput.value, passwordInput.value];
  const form = useRef<HTMLFormElement | null>(null);
  const submitBtn = useRef<HTMLButtonElement | null>(null);
  const loginFormContainer = useRef<HTMLDivElement | null>(null);
  const [isDisabled, setisDisabled] = useState<boolean>(true);
  const loginHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsLoading(true);
    const loginFormData = new FormData(form.current);
    const loginCredentials = {
      username: "",
      password: "",
    };

    for (const [key, value] of loginFormData) {
      const transformedKey = key
        .replaceAll("-", "_")
        .slice(key.indexOf("-") + 1);
      loginCredentials[transformedKey as keyof typeof loginCredentials] =
        value as string;
    }

    const res = await signIn("credential", {
      redirect: false,
      username: loginCredentials.username,
      password: loginCredentials.password,
    });

    if (res?.error) {
      const errMsg =
        res.error === "CredentialsSignin"
          ? "An error occurred, please try again later"
          : res.error;
      setIsLoading(false);
      callPopupToast(errMsg);

      return;
    }

    setIsLoading(false);
    setShowLoginModal(false);
  };
  const closeLoginProblemsModal = useCallback(() => {
    setShowLoginProblemsModal(false);
  }, [showLoginProblemsModal]);

  useEffect(
    function disableLoginBtn() {
      const noError = errors.every((error) => error === "");
      const allHasValue = values.every(
        (value) => value !== "" && value !== undefined && value !== null
      );

      if (noError && allHasValue) {
        submitBtn.current?.classList.remove("disabled");
        setisDisabled(false);
      } else {
        submitBtn.current?.classList.add("disabled");
        setisDisabled(true);
      }
    },
    [errors, values]
  );

  !isOpen
    ? loginFormContainer.current?.classList.add("hidden")
    : loginFormContainer.current?.classList.remove("hidden");

  return (
    <div ref={loginFormContainer} id="login-main-container">
      <form
        data-flex-col
        ref={form}
        className="login-form"
        id="login-form"
        method="GET"
        onSubmit={(e) => loginHandler(e)}
      >
        <div className="hyv-logo"></div>
        <div className="login-form-header text-center">Account Log In</div>
        {usernameInput.component}
        {passwordInput.component}
        <button
          ref={submitBtn}
          type="submit"
          disabled={isDisabled}
          className="submit-btn disabled"
          id="login-submit-btn"
        >
          Log in
        </button>
        <div data-flex className="hyv-link hyv-register-link">
          <span>
            <a onClick={() => setShowLoginProblemsModal(true)}>
              Having Problems?
            </a>
          </span>
          <span>
            <a onClick={() => swapFormContent()}>Register Now</a>
          </span>
        </div>
      </form>
      {showLoginProblemsModal && (
        <LoginProblems closeModal={closeLoginProblemsModal} />
      )}
    </div>
  );
}
