import { ApiErrorResponse, ErrorProps } from "./interface";

export const registerErrorCauses = {
  isInputFormDataInvalid: false,
  isEmailTaken: false,
  isOtpWrong: false,
  isOtpExpired: false,
  isInternalErrorOccurred: false,
};

export type RegisterErrorCauses = typeof registerErrorCauses;

export interface IRegisterError extends ApiErrorResponse {
  causes: RegisterErrorCauses;
  invalidInputFormData(props: ErrorProps): RegisterError;
  emailTaken(props: ErrorProps): RegisterError;
  otpWrong(props: ErrorProps): RegisterError;
  otpExpired(props: ErrorProps): RegisterError;
}

export class RegisterError implements IRegisterError {
  success: false;
  messageToUser: string;
  causes: RegisterErrorCauses;
  data?: any;

  constructor() {
    this.success = false;
    this.messageToUser = "";
    this.causes = registerErrorCauses;
  }

  public invalidInputFormData(props: ErrorProps): RegisterError {
    this.messageToUser = props.messageToUser;
    this.data = props.data;
    this.causes.isInputFormDataInvalid = true;

    return this;
  }

  public emailTaken(props?: ErrorProps): RegisterError {
    this.messageToUser = props?.messageToUser ?? this.messageToUser;
    this.data = props?.data;
    this.causes.isEmailTaken = true;

    return this;
  }

  public otpWrong(props: ErrorProps): RegisterError {
    this.messageToUser = props.messageToUser;
    this.data = props.data;
    this.causes.isOtpExpired = true;

    return this;
  }

  public otpExpired(props: ErrorProps): RegisterError {
    this.messageToUser = props.messageToUser;
    this.data = props.data;
    this.causes.isOtpWrong = true;

    return this;
  }

  public internalErrorOccurred(props?: ErrorProps): RegisterError {
    this.messageToUser =
      props?.messageToUser ?? "An error occurred. Please try again";
    this.data = props?.data;
    this.causes.isInternalErrorOccurred = true;

    return this;
  }
}
