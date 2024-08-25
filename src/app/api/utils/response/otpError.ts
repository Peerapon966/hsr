import { ApiErrorResponse, ErrorProps } from "./interface";

export const otpErrorCauses = {
  isEmailInvalid: false,
  isEmailTaken: false,
  isInternalErrorOccurred: false,
};

export type OtpErrorCauses = typeof otpErrorCauses;

export interface IOtpError extends ApiErrorResponse {
  causes: OtpErrorCauses;
  invalidEmail(props: ErrorProps): OtpError;
  emailTaken(props: ErrorProps): OtpError;
}

export class OtpError implements IOtpError {
  success: false;
  messageToUser: string;
  causes: OtpErrorCauses;
  data?: any;

  constructor() {
    this.success = false;
    this.messageToUser = "";
    this.causes = otpErrorCauses;
  }

  public invalidEmail(props: ErrorProps): OtpError {
    this.messageToUser = props.messageToUser;
    this.data = props.data;
    this.causes.isEmailInvalid = true;

    return this;
  }

  public emailTaken(props?: ErrorProps): OtpError {
    this.messageToUser = props?.messageToUser ?? this.messageToUser;
    this.data = props?.data;
    this.causes.isEmailTaken = true;

    return this;
  }

  public internalErrorOccurred(props?: ErrorProps): OtpError {
    this.messageToUser =
      props?.messageToUser ?? "An error occurred. Please try again";
    this.data = props?.data;
    this.causes.isInternalErrorOccurred = true;

    return this;
  }
}
