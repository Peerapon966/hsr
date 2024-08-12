export type errorMsg = {
  empty?: string,
  invalid?: string,
}

export type inputRegex = 'email' | 'password' | 'matched' | 'not-empty';
export type inputConstraints = 'numericOnly'

export type Form = {
  isOpen: boolean
  closeModal: Function
  swapFormContent: Function
}

export interface ILoginForm extends Form {
}

export interface IRegisterForm extends Form {
}

export type UserRegisterData = {
  email: string
  verification_code: string
  password: string
}

export type LoginWithUsernameCred = {
  username: string
  password: string
}

export type LoginWithEmailCred = {
  email: string
  password: string
}

export type UserLoginCred = LoginWithUsernameCred | LoginWithEmailCred

export type IModal = {
  closeModal: Function
}

