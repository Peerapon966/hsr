import "@/features/authentication/assets/css/checkbox.css";
import { ReactBaseProps } from "@/interface";
import { useEffect, useRef, useState } from "react";

interface CheckboxProps extends ReactBaseProps {
  for: "subscription" | "register";
  fieldName: string;
  options?: {
    theme?: "dark" | "light";
    checkedByDefault?: boolean;
  };
}

export function Checkbox(props: CheckboxProps) {
  const [isChecked, setIsChecked] = useState<boolean>(
    props.options?.checkedByDefault ?? false
  );
  const visibleCheckbox = useRef<HTMLDivElement | null>(null);
  const checkbox = useRef<HTMLInputElement | null>(null);
  const theme = props.options?.theme ?? "light";
  const onClickHandler = () => {
    setIsChecked(!isChecked);
    visibleCheckbox.current?.classList.toggle("checked");
  };

  useEffect(() => {
    if (isChecked) visibleCheckbox.current?.classList.add("checked");
  }, []);

  return (
    <div className="hyv-checkbox">
      <label
        data-flex
        htmlFor={`${props.for}-${props.fieldName}`}
        className="checkbox-label"
      >
        <div className="checkbox-container">
          <input
            onChange={onClickHandler}
            ref={checkbox}
            type="checkbox"
            className="checkbox"
            checked={isChecked}
            id={`${props.for}-${props.fieldName}`}
            name={`${props.for}-${props.fieldName}`}
          ></input>
          <div
            ref={visibleCheckbox}
            className={
              theme === "light" ? "visible-checkbox" : "visible-checkbox dark"
            }
          ></div>
        </div>
        <div
          className={
            theme === "light"
              ? "checkbox-label-text"
              : "checkbox-label-text dark"
          }
        >
          {props.children}
        </div>
      </label>
    </div>
  );
}
