export type ErrorProps = {
  messageToUser: string;
  data?: any;
};

export type ApiErrorResponse = ErrorProps & {
  success: false;
  internalErrorOccurred(props: ErrorProps): unknown;
};
