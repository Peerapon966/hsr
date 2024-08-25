type ApiSuccessResponseProps = {
  messageToUser?: string;
  data?: any;
};

export type ApiSuccessResponse = ApiSuccessResponseProps & {
  success: true;
};

interface IApiResponse {
  success(props?: ApiSuccessResponseProps): ApiSuccessResponse;
  error<T>(errorInstance: T): T;
}

export class ApiResponse implements IApiResponse {
  public success(props?: ApiSuccessResponseProps): ApiSuccessResponse {
    return {
      success: true,
      messageToUser: props?.messageToUser || undefined,
      data: props?.data,
    };
  }

  public error<T>(errorInstance: T): T {
    return errorInstance;
  }
}
