import "@/features/authentication/assets/css/inputField.css";
import { useEffect, useRef, useState } from "react";
import { useFocus } from "@/features/authentication/hooks/useFocus";
import { getError } from "@/features/authentication/utils/getError";
import { checkNumeric } from "@/features/authentication/utils/checkNumeric";
import {
  errorMsg,
  inputRegex,
  inputConstraints,
} from "@/features/authentication/interface";
import {
  SendOTPButton,
  SendOTPButtonProps as OTPOptions,
} from "@/features/authentication/components/InputField/SendOTPButton";

export enum For {
  login = "login",
  register = "register",
}

export enum LoginFieldNames {
  username = "username",
  password = "password",
}

export enum RegisterFieldNames {
  email = "email",
  verificationCode = "verification-code",
  password = "password",
  confirmPassword = "confirm-password",
  promotion = "promotion",
  newsletter = "newsletter",
}

type FieldName<T extends For> = T extends For.login
  ? LoginFieldNames
  : RegisterFieldNames;

type InputFieldProps<T extends For, U extends FieldName<T>> = {
  for: T;
  fieldName: U;
  label: string;
  type: "text" | "password";
  options?: {
    theme?: "dark" | "light";
    initialValue?: string;
    realtimeUpdate?: boolean;
    regex?: inputRegex[];
    errorMsg?: errorMsg;
    constraints?: inputConstraints[];
    maxLength?: number;
  };
} & (U extends RegisterFieldNames.verificationCode
  ? {
      otpOptions: OTPOptions;
    }
  : {});

function isVerificationCodeField<T extends For>(
  props: InputFieldProps<T, FieldName<T>>
): props is InputFieldProps<T, FieldName<T>> {
  return props.fieldName === RegisterFieldNames.verificationCode;
}

export function InputField<T extends For, U extends FieldName<T>>(
  props: InputFieldProps<T, U>
) {
  const [componentDidMount, setComponentDidMount] = useState<boolean>(false);
  const inputFieldWrapper = useRef<HTMLDivElement | null>(null);
  const inputField = useRef<HTMLInputElement | null>(null);
  const theme = props.options?.theme ?? "light";
  const [initialized, setInitialized] = useState<boolean>(false);
  const [type, setType] = useState<string>(props.type);
  const [pwdIcon, setPwdIcon] = useState<string>("#icon-passwordHide");
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [focus, setFocus] = useFocus({
    element: inputFieldWrapper.current,
  });
  const showPwdIcon = (
    <span data-flex className="suffix-icon">
      <svg
        className="svg-icon"
        aria-hidden="true"
        onClick={(e) => showPwdHandler()}
      >
        <use href={pwdIcon}></use>
      </svg>
    </span>
  );
  const clearInputIcon = (
    <span data-flex className="suffix-icon">
      <svg
        className={
          theme === "light"
            ? "svg-icon clear-input"
            : "svg-icon clear-input dark text-[1.25em]"
        }
        aria-hidden="true"
        onClick={(e) => clearInputHandler()}
      >
        <use
          href={
            theme === "light" ? "#icon-clearInput" : "#icon-clearInput-dark"
          }
        ></use>
      </svg>
    </span>
  );
  const showPwdHandler = () => {
    if (type === "password") {
      setType("text");
      setPwdIcon("#icon-passwordShow");
    } else {
      setType("password");
      setPwdIcon("#icon-passwordHide");
    }
  };
  const clearInputHandler = () => {
    setValue("");
    const label = inputFieldWrapper.current?.querySelector(
      ".input-label"
    ) as HTMLLabelElement;
    label?.classList.remove("hasValue");
  };

  useEffect(() => {
    switch (props.options?.realtimeUpdate) {
      case true:
        if (initialized) {
          const error =
            props.options?.errorMsg && props.options?.regex
              ? getError({
                  element: inputFieldWrapper.current,
                  status: focus,
                  inputValue: value,
                  regex: props.options?.regex,
                  errorMsg: props.options?.errorMsg,
                })
              : "";

          setError(error);
        }

        if (focus && !initialized) {
          setInitialized(true);
        }

        break;
      case false:
        if (!focus) {
          const error =
            props.options?.errorMsg && props.options?.regex
              ? getError({
                  element: inputFieldWrapper.current,
                  status: focus,
                  inputValue: value,
                  regex: props.options?.regex,
                  errorMsg: props.options?.errorMsg,
                })
              : "";

          setError(error);
        }
        break;
    }
  }, [focus, value]);

  useEffect(
    function setInitialValue() {
      if (props.options?.initialValue) {
        inputField.current?.focus();
        setValue(props.options.initialValue);
        inputField.current?.blur();
      }
    },
    [props.options?.initialValue]
  );

  useEffect(() => {
    setComponentDidMount(true);
  }, []);

  const component = (
    <div
      ref={inputFieldWrapper}
      className="hyv-input"
      id={`${props.for}-${props.fieldName}-input-wrapper`}
    >
      <div
        data-flex-col
        className={
          theme === "light"
            ? "input-container bg-[#fafafc] border border-solid border-[#e7e8ee]"
            : "input-container bg-[color:var(--global-color-grey-1)] border border-solid border-[color:var(--global-color-grey-3)]"
        }
        id={`${props.for}-${props.fieldName}-container`}
      >
        <input
          ref={inputField}
          onFocus={(e) => setFocus(true)}
          onBlur={(e) => setFocus(false)}
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
          onPaste={(e) =>
            props.options?.constraints?.includes("numericOnly")
              ? checkNumeric(e)
              : void 0
          }
          onKeyDown={(e) =>
            props.options?.constraints?.includes("numericOnly")
              ? checkNumeric(e)
              : void 0
          }
          value={value}
          type={type}
          maxLength={props.options?.maxLength}
          autoComplete="off"
          className={
            theme === "light"
              ? "input-field text-[color:var(--account-color-gray-9)]"
              : "input-field text-[color:var(--global-color-grey-8)]"
          }
          id={`${props.for}-${props.fieldName}`}
          name={`${props.for}-${props.fieldName}`}
        ></input>
        <span data-flex className="input-suffix">
          {value ? clearInputIcon : null}
          {props.type === "password" ? showPwdIcon : null}
          {props.fieldName === RegisterFieldNames.verificationCode &&
            isVerificationCodeField(props) && (
              <SendOTPButton
                function={props.otpOptions.function}
                throttle={props.otpOptions.throttle}
              />
            )}
        </span>
      </div>
      <label
        htmlFor={`${props.for}-${props.fieldName}`}
        className="input-label"
        id={`${props.for}-${props.fieldName}-label`}
      >
        {props.label}
      </label>
      <div className="err-text" id={`${props.for}-${props.fieldName}-err-text`}>
        {error}
      </div>
    </div>
  );

  return {
    component: component,
    value: value,
    error: error,
  };
}
