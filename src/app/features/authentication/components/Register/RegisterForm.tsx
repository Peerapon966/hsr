import { useState, useEffect, FormEvent, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "@/features/authentication/components/InputField/InputField";
import {
  RegisterFormProps,
  RegisterFormData,
} from "@/features/authentication/interface";
import { sendOTP } from "@/services/auth/sendOTP";
import { register } from "@/services/auth/register";
import { callPopupToast } from "@/features/authentication/utils/callPopupToast";
import { RegisterAgreePrompt } from "@/features/authentication/components/Register/RegisterAgreePrompt";
import { LoginPrompt } from "@/features/authentication/components/Register/LoginPrompt";
import { Checkbox } from "@/features/authentication/components/InputField/Checkbox";

export function RegisterForm(props: RegisterFormProps) {
  const emailInput = InputField({
    for: "register",
    fieldName: "email",
    label: "Email",
    type: "text",
    options: {
      realtimeUpdate: true,
      regex: ["not-empty", "email"],
      errorMsg: {
        empty: "Account cannot be empty",
        invalid: "Invalid email format",
      },
    },
  });
  const verificationInput = InputField({
    for: "register",
    fieldName: "verification-code",
    label: "Verification Code",
    type: "text",
    options: {
      realtimeUpdate: false,
      constraints: ["numericOnly"],
      maxLength: 6,
      callback: sendOTPHandler,
    },
  });
  const passwordInput = InputField({
    for: "register",
    fieldName: "password",
    label: "Enter Password",
    type: "password",
    options: {
      realtimeUpdate: true,
      regex: ["not-empty", "password"],
      errorMsg: {
        empty: "Password cannot be empty",
        invalid:
          "Password must be 8–30 characters and a combination of numbers, letters, or special characters",
      },
    },
  });
  const confirmPasswordInput = InputField({
    for: "register",
    fieldName: "confirm-password",
    label: "Please enter password again",
    type: "password",
    options: {
      realtimeUpdate: true,
      regex: ["not-empty", "matched"],
      errorMsg: {
        empty: "Password confirmation cannot be empty",
        invalid:
          "Please make sure the password you enter both times is the same",
      },
    },
  });
  const [promptUserAgreement, setPromptUserAgreement] =
    useState<boolean>(false);
  const [promptLogin, setPromptLogin] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const registerForm = useRef<HTMLDivElement | null>(null);
  const submitBtn = useRef<HTMLButtonElement | null>(null);
  const form = useRef<HTMLFormElement | null>(null);
  const errors = [
    emailInput.error,
    verificationInput.error,
    passwordInput.error,
    confirmPasswordInput.error,
  ];
  const values = [
    emailInput.value,
    verificationInput.value,
    passwordInput.value,
    confirmPasswordInput.value,
  ];
  const closeAgreePromptModal = useCallback(() => {
    setPromptUserAgreement(false);
  }, [promptUserAgreement]);
  const agreeOnPromptHandler = useCallback(() => {
    document.getElementById("register-policy-agreement")?.click();
    submitBtn.current?.click();
  }, [promptUserAgreement]);
  const closeLoginPromptModal = useCallback(() => {
    setPromptLogin(false);
  }, [promptLogin]);
  const agreeToLoginHandler = useCallback(() => {
    props.swapFormContent(emailInput.value);
  }, [promptLogin]);

  async function sendOTPHandler() {
    if (document.getElementById("toast")) return;

    const email = emailInput.value;
    const error = emailInput.error;

    if (email === "") {
      callPopupToast("Email cannot be empty");
      return;
    }

    if (error !== "" && error !== undefined && error !== null) {
      callPopupToast("Invalid email format");
      return;
    }

    const payload = {
      email: email,
    };
    const response = await sendOTP({
      payload: payload,
    });

    if (!response.success) {
      if (response.causes.isEmailTaken) {
        setPromptLogin(true);
      } else {
        callPopupToast(response.messageToUser);
      }

      return;
    }

    callPopupToast(response.messageToUser);

    return response;
  }

  async function submitHandler(e: FormEvent) {
    e.preventDefault();
    if (document.getElementById("toast")) return;
    if (!form.current) return;
    const formData = new FormData(form.current);

    if (!formData.has("register-policy-agreement")) {
      setPromptUserAgreement(true);
      return;
    }

    let registerFormData: RegisterFormData = {
      email: "",
      verification_code: "",
      password: "",
      confirm_password: "",
      policy_agreement: "on",
    };

    for (const [key, value] of formData) {
      const prefixRemovedKey = key
        .replaceAll("-", "_")
        .slice(key.indexOf("-") + 1);
      if (prefixRemovedKey in registerFormData) {
        prefixRemovedKey === "policy_agreement"
          ? (registerFormData[prefixRemovedKey as keyof RegisterFormData] =
              value as "on")
          : (registerFormData[
              prefixRemovedKey as keyof Omit<
                RegisterFormData,
                "policy_agreement"
              >
            ] = value as string);
      }
    }

    const registerResult = await register(registerFormData);

    if (!registerResult.success) {
      if (registerResult.causes.isEmailTaken) {
        setPromptLogin(true);
      } else {
        callPopupToast(registerResult.messageToUser);
      }

      return;
    }
  }

  useEffect(
    function disableRegisterBtn() {
      const noError = errors.every((error) => error === "");
      const allHasValue = values.every(
        (value) => value !== "" && value !== undefined && value !== null
      );

      if (noError && allHasValue) {
        submitBtn.current?.classList.remove("disabled");
        setIsDisabled(false);
      } else {
        submitBtn.current?.classList.add("disabled");
        setIsDisabled(true);
      }
    },
    [errors, values]
  );

  !props.isOpen
    ? registerForm.current?.classList.add("hidden")
    : registerForm.current?.classList.remove("hidden");

  return (
    <div ref={registerForm} id="register-main-container">
      <form
        data-flex-col
        ref={form}
        className="register-form"
        id="register-form"
        onSubmit={(e) => submitHandler(e)}
      >
        <div className="hyv-logo"></div>
        <div className="register-form-header text-center">Register</div>
        {emailInput.component}
        {verificationInput.component}
        {passwordInput.component}
        {confirmPasswordInput.component}
        <Checkbox for="register" fieldName="policy-agreement">
          <span>I have read and agree to the </span>
          <span>
            <a
              href="https://account.hoyoverse.com/index.html?hide_back=1&hide_header=1&hide_sidebar=1&hide_footer=1&lang=en-us#/about/userAgreement"
              target="_blank"
              rel="noopener"
            >
              <span>Terms of Service</span>
            </a>
          </span>
          <span> and </span>
          <span>
            <a
              href="https://account.hoyoverse.com/index.html?hide_back=1&hide_header=1&hide_sidebar=1&hide_footer=1&lang=en-us#/about/privacy"
              target="_blank"
              rel="noopener"
            >
              <span>Privacy Policy</span>
            </a>
          </span>
        </Checkbox>
        <Checkbox
          for="register"
          fieldName="promotions"
          options={{ checkedByDefault: true }}
        >
          <span>
            Agree to subscribe to promotional messages (You may unsubscribe at
            any time)
          </span>
          <span>&nbsp;(Optional)</span>
        </Checkbox>
        <button
          ref={submitBtn}
          type="submit"
          disabled={isDisabled}
          className="submit-btn disabled"
          id="register-submit-btn"
        >
          Register
        </button>
        <div data-flex className="hyv-link hyv-login-link">
          <span>Already have an account?&nbsp;</span>
          <span>
            <a onClick={() => props.swapFormContent()}>Log In</a>
          </span>
        </div>
      </form>
      {promptUserAgreement && (
        <RegisterAgreePrompt
          closeModal={closeAgreePromptModal}
          callback={agreeOnPromptHandler}
        />
      )}
      {promptLogin && (
        <LoginPrompt
          closeModal={closeLoginPromptModal}
          callback={agreeToLoginHandler}
        />
      )}
    </div>
  );
}
