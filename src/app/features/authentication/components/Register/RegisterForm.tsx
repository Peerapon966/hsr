import { useState, useEffect, FormEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "@/features/authentication/components/InputField";
import { IRegisterForm, UserRegisterData } from "@/features/authentication/interface";
import { sendOTP, register, login } from '@/services/auth';
import { callPopupToast } from "@/features/authentication/utils";
import { useDOMObject } from "@/hooks";
import RegisterAgreePrompt from "./RegisterAgreePrompt";

export default function RegisterForm(props: IRegisterForm) {
  const emailInput = InputField({
    for: 'register',
    fieldName: 'email',
    label: 'Email',
    type: 'text',
    options: {
      realtimeUpdate: true,
      regex: ['not-empty', 'email'],
      errorMsg: {
        empty: 'Account cannot be empty',
        invalid: 'Invalid email format'
      }
    }
  });
  const verificationInput = InputField({
    for: 'register',
    fieldName: 'verification-code',
    label: 'Verification Code',
    type: 'text',
    options: {
      realtimeUpdate: false,
      constraints: ['numericOnly'],
      maxLength: 6,
      callback: sendOTPHandler
    }
  });
  const passwordInput = InputField({
    for: 'register',
    fieldName: 'password',
    label: 'Enter Password',
    type: 'password',
    options: {
      realtimeUpdate: true,
      regex: ['not-empty', 'password'],
      errorMsg: {
        empty: 'Password cannot be empty',
        invalid: 'Password must be 8–30 characters and a combination of numbers, letters, or special characters'
      }
    }
  });
  const confirmPasswordInput = InputField({
    for: 'register',
    fieldName: 'confirm-password',
    label: 'Please enter password again',
    type: 'password',
    options: {
      realtimeUpdate: true,
      regex: ['not-empty', 'matched'],
      errorMsg: {
        empty: 'Password confirmation cannot be empty',
        invalid: 'Please make sure the password you enter both times is the same'
      }
    }
  });
  const [agreement, setAgreement] = useState<boolean>(false);
  const [promptUser, setPromptUser] = useState<boolean>(false);
  const [registerForm] = useDOMObject<[HTMLDivElement]>([{ from: 'id', value: 'register-main-container' }]);
  const errors = [emailInput.error, verificationInput.error, passwordInput.error, confirmPasswordInput.error];
  const values = [emailInput.value, verificationInput.value, passwordInput.value, confirmPasswordInput.value];
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [form, submitBtn] = useDOMObject<[HTMLFormElement, HTMLButtonElement]>([
    { from: 'id', value: 'register-form' },
    { from: 'id', value: 'register-submit-btn' }
  ]);
  const closeAgreePromptModal = useCallback(() => {
    setPromptUser(false)
  }, [promptUser])

  function agreeOnPromptHandler() {
    const agreeLabel = document.getElementById('register-agree-label');
    agreeLabel?.click();
    submitBtn?.click();
  };

  async function submitHandler(e: FormEvent) {
    e.preventDefault();
    if (document.getElementById('toast')) return;
    const formData = new FormData(form as HTMLFormElement);

    if (!formData.has('agreement')) {
      setPromptUser(true)
      return;
    };

    let registerData: UserRegisterData = {
      email: '',
      verification_code: '',
      password: ''
    };

    for (const [key, value] of formData) {
      const newKey = key.replaceAll('-', '_').slice(key.indexOf('-') + 1);
      if (newKey in registerData) {
        registerData[newKey as keyof UserRegisterData] = value as string;
      }
    }

    const registerResult = await register(registerData);

    if (registerResult.status != 'success') {
      callPopupToast(registerResult.message);
    }

    props.swapFormContent()
  };

  async function sendOTPHandler() {
    if (document.getElementById('toast')) return;

    const email = emailInput.value;
    const error = emailInput.error;

    if (email === '') {
      callPopupToast("Email cannot be empty");
      return;
    }

    if (error !== '' && error !== undefined && error !== null) {
      callPopupToast("Invalid email format");
      return;
    }

    const payload = {
      email: email
    }
    const response = await sendOTP({
      payload: payload
    });

    if (response.status != 'success') {
      callPopupToast(response.message);
      return;
    }

    return response
  }

  useEffect(
    function disableRegisterBtn() {
      const submitBtn = document.getElementById('register-submit-btn');
      const noError = errors.every((error) => error === '');
      const allHasValue = values.every((value) => value !== '' && value !== undefined && value !== null)

      if (noError && allHasValue) {
        submitBtn?.classList.remove('disabled');
        setIsDisabled(false);
      } else {
        submitBtn?.classList.add('disabled');
        setIsDisabled(true);
      }
    }, [errors, values])

  useEffect(
    function agreeHandler() {
      const visibleCheckbox = document.getElementById('visible-checkbox');
      (agreement) ? visibleCheckbox?.classList.add('checked') : visibleCheckbox?.classList.remove('checked')
    }, [agreement]);

  (!props.isOpen) ? registerForm?.classList.add('hidden') : registerForm?.classList.remove('hidden')

  return (
    <div id="register-main-container">
      <form data-flex-col className="register-form" id="register-form" onSubmit={(e) => submitHandler(e)}>
        <div className="hyv-logo"></div>
        <div className="register-form-header text-center">
          Register
        </div>
        {emailInput.component}
        {verificationInput.component}
        {passwordInput.component}
        {confirmPasswordInput.component}
        <div className="hyv-checkbox">
          <label data-flex htmlFor="register-agree" className="checkbox-label" id="register-agree-label">
            <div className="checkbox-container" id="register-agree-container">
              <input
                onChange={() => setAgreement(!agreement)}
                type="checkbox"
                className="checkbox"
                id="register-agree"
                aria-hidden="true"
                name="agreement"
              ></input>
              <div className="visible-checkbox" id="visible-checkbox"></div>
            </div>
            <div className="checkbox-label-text">
              <span>I have read and agree to the </span>
              <span>
                <a href="https://account.hoyoverse.com/index.html?hide_back=1&hide_header=1&hide_sidebar=1&hide_footer=1&lang=en-us#/about/userAgreement" target="_blank" rel="noopener">
                  <span>HoYoverse Account Terms of Service</span>
                </a>
              </span>
              <span> and </span>
              <span>
                <a href="https://account.hoyoverse.com/index.html?hide_back=1&hide_header=1&hide_sidebar=1&hide_footer=1&lang=en-us#/about/privacy" target="_blank" rel="noopener">
                  <span>HoYoverse Account Privacy Policy</span>
                </a>
              </span>
            </div>
          </label>
        </div>
        <button type="submit" disabled={isDisabled} className="submit-btn disabled" id="register-submit-btn">Register</button>
        <div data-flex className="hyv-link hyv-login-link">
          <span>Already have an account?&nbsp;</span>
          <span>
            <a onClick={() => props.swapFormContent()}>Log In</a>
          </span>
        </div>
      </form>
      {(promptUser) ? <RegisterAgreePrompt closeModal={closeAgreePromptModal} callback={agreeOnPromptHandler} /> : null}
    </div>
  )
}