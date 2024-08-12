import '@/features/authentication/assets/css/inputField.css'
import { useEffect, useState } from 'react'
import { useFocus } from '@/features/authentication/hooks'
import { getError, checkNumeric } from '@/features/authentication/utils'
import { errorMsg, inputRegex, inputConstraints } from '@/features/authentication/interface'
import { useDOMObject } from '@/hooks'

interface inputField {
  for: 'login' | 'register',
  fieldName: string,
  label: string,
  type: 'text' | 'password',
  options?: {
    realtimeUpdate?: boolean,
    regex?: inputRegex[],
    errorMsg?: errorMsg,
    constraints?: inputConstraints[],
    maxLength?: number,
    callback?: Function
  }
}

export default function InputField(props: inputField) {
  const [componentDidMount, setComponentDidMount] = useState<boolean>(false);
  // const inputField = document.getElementById(`${props.for}-${props.fieldName}-input-wrapper`) as HTMLElement;
  const [inputField] = useDOMObject<[HTMLElement]>([{ from: 'id', value: `${props.for}-${props.fieldName}-input-wrapper` }])
  const [initialized, setInitialized] = useState<boolean>(false);
  const [type, setType] = useState<string>(props.type);
  const [pwdIcon, setPwdIcon] = useState<string>('#icon-passwordHide');
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [focus, setFocus] = useFocus({
    element: inputField,
  });
  const showPwdIcon = (
    <span data-flex className="suffix-icon">
      <svg className="svg-icon" aria-hidden="true" onClick={(e) => showPwdHandler()}>
        <use href={pwdIcon}></use>
      </svg>
    </span>
  );
  const clearInputIcon = (
    <span data-flex className="suffix-icon">
      <svg className="svg-icon clear-input" aria-hidden="true" onClick={(e) => clearInputHandler()}>
        <use href="#icon-clearInput"></use>
      </svg>
    </span>
  );
  const sendEmail = (
    <span data-flex className='suffix-icon'>
      <span data-flex className='register-send-email-container cross-axis-center'>
        <a type='button' className='register-send-email' onClick={() => (props.options?.callback) ? props.options?.callback() : console.error('Error, no callback function to be invoked')}>
          Send
        </a>
      </span>
    </span>
  )
  const showPwdHandler = () => {
    if (type === 'password') {
      setType('text');
      setPwdIcon('#icon-passwordShow');
    } else {
      setType('password')
      setPwdIcon('#icon-passwordHide');
    }
  };
  const clearInputHandler = () => {
    setValue('');
    const label = inputField.querySelector('.input-label') as HTMLLabelElement;
    label?.classList.remove('hasValue');
  };

  useEffect(() => {
    switch (props.options?.realtimeUpdate) {
      case true:
        if (initialized) {
          const error = (props.options?.errorMsg && props.options?.regex)
            ? getError({
              element: inputField,
              status: focus,
              inputValue: value,
              regex: props.options?.regex,
              errorMsg: props.options?.errorMsg
            })
            : ''

          setError(error)
        }

        if (focus && !initialized) {
          setInitialized(true);
        }

        break;
      case false:
        if (!focus) {
          const error = (props.options?.errorMsg && props.options?.regex)
            ? getError({
              element: inputField,
              status: focus,
              inputValue: value,
              regex: props.options?.regex,
              errorMsg: props.options?.errorMsg
            })
            : ''

          setError(error)
        }
        break;
    }
  }, [focus, value])

  useEffect(() => {
    setComponentDidMount(true)
  }, [])

  const component = (
    <div className="hyv-input" id={`${props.for}-${props.fieldName}-input-wrapper`}>
      <div data-flex-col className="input-container" id={`${props.for}-${props.fieldName}-container`}>
        <input
          onFocus={(e) => setFocus(true)}
          onBlur={(e) => setFocus(false)}
          onChange={(e) => { setValue(e.currentTarget.value) }}
          onPaste={(e) => (props.options?.constraints?.includes('numericOnly')) ? checkNumeric(e) : void (0)}
          onKeyDown={(e) => (props.options?.constraints?.includes('numericOnly')) ? checkNumeric(e) : void (0)}
          value={value}
          type={type}
          maxLength={props.options?.maxLength}
          autoComplete="off"
          className="input-field"
          id={`${props.for}-${props.fieldName}`}
          name={`${props.for}-${props.fieldName}`}
        ></input>
        <span data-flex className="input-suffix">
          {(value) ? clearInputIcon : null}
          {(props.type === 'password') ? showPwdIcon : null}
          {(props.fieldName === 'verification-code') ? sendEmail : null}
        </span>
      </div>
      <label htmlFor={`${props.for}-${props.fieldName}`} className="input-label" id={`${props.for}-${props.fieldName}-label`}>{props.label}</label>
      <div className="err-text" id={`${props.for}-${props.fieldName}-err-text`}>{error}</div>
    </div>
  )

  return {
    component: component,
    value: value,
    error: error
  }
}