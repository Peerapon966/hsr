import { errorMsg, inputRegex } from '@/features/authentication/interface'
import { useDOMObject } from '@/hooks';
import { z } from 'zod'

interface getError {
  element: HTMLElement | null,
  status: boolean | undefined,
  inputValue: string | undefined,
  regex: inputRegex[],
  errorMsg: errorMsg
}

export default function getError(props: getError): string {
  let error: string = '';
  if (props.status !== undefined && props.inputValue !== undefined) {
    props.regex.forEach((regex) => {
      switch (regex) {
        case 'not-empty':
          if (isEmpty(props.inputValue)) {
            (props.errorMsg.empty)
              ? error = props.errorMsg.empty
              : console.error('Error message for an empty input is missing.')
          };
          break;
        case 'email':
          if (isInvalidEmail(props.inputValue) && props.inputValue != '') {
            (props.errorMsg.invalid)
              ? error = props.errorMsg.invalid
              : console.error('Error message for an invalid email is missing.')
          };
          break;
        case 'password':
          if (isInvalidPassword(props.inputValue) && props.inputValue !== '') {
            (props.errorMsg.invalid)
              ? error = props.errorMsg.invalid
              : console.error('Error message for an invalid password is missing.')
          };
          break;
        case 'matched':
          if (isPasswordDoesNotMatch(props.inputValue) && props.inputValue !== '') {
            (props.errorMsg.invalid)
              ? error = props.errorMsg.invalid
              : console.error('Error message for an invalid confirmation password is missing.')
          };
          break;
      };
    });
  }

  if (props.element !== null) {
    const container = props.element?.querySelector('.input-container') as HTMLDivElement;
    const label = props.element?.querySelector('.input-label') as HTMLLabelElement;
    // const [container, label] = useDOMObject<[HTMLDivElement, HTMLLabelElement]>([
    //   { from: 'query', value: '.input-container' },
    //   { from: 'query', value: '.input-label' }
    // ]);

    if (error) {
      container?.classList.add('error');
      label?.classList.add('error');
    } else {
      container?.classList.remove('error');
      label?.classList.remove('error');
    }
  }

  return error
}

function isEmpty(input: string | undefined): boolean {
  const validator = z.string().trim().min(1);
  const result = validator.safeParse(input);

  if (result.error) return true

  return false
}

function isInvalidEmail(input: string | undefined): boolean {
  const validator = z.string().email();
  const result = validator.safeParse(input);

  // if (input?.search(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i) === -1) {
  //     return true
  // }

  if (result.error) return true

  return false
}

function isInvalidPassword(input: string | undefined): boolean {
  const validator = z.string().regex(/^(.{0,7}|.{31,}|[^0-9]*|[^a-z]*|[a-z0-9]*)$/g);
  const result = validator.safeParse(input);

  // if (input?.search(/^(.{0,7}|.{31,}|[^0-9]*|[^a-z]*|[a-z0-9]*)$/g) !== -1) {
  //     return true
  // }

  return result.success
}

function isPasswordDoesNotMatch(input: string | undefined): boolean {
  const password = (document.getElementById('register-password') as HTMLInputElement)?.value;
  const validator = z.literal(password);
  const result = validator.safeParse(input)

  // if (input !== password) {
  //     return true
  // }

  if (result.error) return true

  return false
}

