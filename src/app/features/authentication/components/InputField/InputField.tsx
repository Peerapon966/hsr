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

interface inputField {
  for: "login" | "register";
  fieldName: string;
  label: string;
  type: "text" | "password";
  options?: {
    initialValue?: string;
    realtimeUpdate?: boolean;
    regex?: inputRegex[];
    errorMsg?: errorMsg;
    constraints?: inputConstraints[];
    maxLength?: number;
    callback?: Function;
  };
}

export function InputField(props: inputField) {
  const [componentDidMount, setComponentDidMount] = useState<boolean>(false);
  const inputFieldWrapper = useRef<HTMLDivElement | null>(null);
  const inputField = useRef<HTMLInputElement | null>(null);
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
        className="svg-icon clear-input"
        aria-hidden="true"
        onClick={(e) => clearInputHandler()}
      >
        <use href="#icon-clearInput"></use>
      </svg>
    </span>
  );
  const sendEmail = (
    <span data-flex className="suffix-icon">
      <span
        data-flex
        className="register-send-email-container cross-axis-center"
      >
        <a
          type="button"
          className="register-send-email"
          onClick={() =>
            props.options?.callback
              ? props.options?.callback()
              : console.error("Error, no callback function to be invoked")
          }
        >
          Send
        </a>
      </span>
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
        className="input-container"
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
          className="input-field"
          id={`${props.for}-${props.fieldName}`}
          name={`${props.for}-${props.fieldName}`}
        ></input>
        <span data-flex className="input-suffix">
          {value ? clearInputIcon : null}
          {props.type === "password" ? showPwdIcon : null}
          {props.fieldName === "verification-code" ? sendEmail : null}
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
