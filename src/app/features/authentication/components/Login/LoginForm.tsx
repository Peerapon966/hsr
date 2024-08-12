import { useState, useEffect, useContext, FormEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { InputField } from "@/features/authentication/components/InputField";
import { ILoginForm } from "@/features/authentication/interface";
import { useLoginContext } from "@/components/Header/Header";
import LoginProblems from "./LoginProblems";
import { useDOMObject } from "@/hooks";

export default function LoginForm(props: ILoginForm) {
  // const navigate = useNavigate();
  const [showLoginProblemsModal, setShowLoginProblemsModal] = useState<boolean>(false);
  const setIsAuth = useLoginContext()
  const usernameInput = InputField({
    for: 'login',
    fieldName: 'username',
    label: 'Username/Email',
    type: 'text',
    options: {
      realtimeUpdate: false,
      regex: ['not-empty'],
      errorMsg: {
        empty: 'Account cannot be empty'
      },
    }
  });
  const passwordInput = InputField({
    for: 'login',
    fieldName: 'password',
    label: 'Password',
    type: 'password',
    options: {
      realtimeUpdate: false,
      regex: ['not-empty'],
      errorMsg: {
        empty: 'Password cannot be empty'
      }
    }
  });
  const errors = [usernameInput.error, passwordInput.error];
  const values = [usernameInput.value, passwordInput.value];
  const [loginForm] = useDOMObject<[HTMLDivElement]>([{ from: 'id', value: 'login-main-container' }]);
  const [isDisabled, setisDisabled] = useState<boolean>(true);
  const loginHandler = (e: FormEvent) => {
    e.preventDefault();
    setIsAuth(true)
    const form = document.getElementById('login-form') as HTMLFormElement;
    const loginCredential = new FormData(form as HTMLFormElement);
    for (const [key, value] of loginCredential) {
      console.log(key, value)
    }
    // form.submit()
    // navigate('/news');
  }
  const closeLoginProblemsModal = useCallback(() => {
    setShowLoginProblemsModal(false)
  }, [showLoginProblemsModal])

  useEffect(
    function disableLoginBtn() {
      const submitBtn = document.getElementById('login-submit-btn');
      const noError = errors.every((error) => error === '');
      const allHasValue = values.every((value) => value !== '' && value !== undefined && value !== null)

      if (noError && allHasValue) {
        submitBtn?.classList.remove('disabled');
        setisDisabled(false);
      } else {
        submitBtn?.classList.add('disabled');
        setisDisabled(true);
      }
    }, [errors, values]
  );

  (!props.isOpen) ? loginForm?.classList.add('hidden') : loginForm?.classList.remove('hidden')

  return (
    <div id="login-main-container">
      <form data-flex-col className="login-form" id="login-form" method="GET" onSubmit={(e) => loginHandler(e)}>
        <div className="hyv-logo"></div>
        <div className="login-form-header text-center">
          Account Log In
        </div>
        {usernameInput.component}
        {passwordInput.component}
        <button type="submit" disabled={isDisabled} className="submit-btn disabled" id="login-submit-btn">Log in</button>
        <div data-flex className="hyv-link hyv-register-link">
          <span>
            <a onClick={() => setShowLoginProblemsModal(true)}>Having Problems?</a>
          </span>
          <span>
            <a onClick={() => props.swapFormContent()}>Register Now</a>
          </span>
        </div>
      </form>
      {(showLoginProblemsModal) ? <LoginProblems closeModal={closeLoginProblemsModal} /> : null}
    </div>
  )
}