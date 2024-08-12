type SuccessResponseProps = {
  status: 'success'
  data?: any
  message?: string
}

type ErrorResponseProps = {
  status: 'error'
  data?: any
  message: string
}

export type CustomResponseProps = SuccessResponseProps | ErrorResponseProps

export interface IResponse extends CustomResponse {
  [key: string]: any
}

export class CustomResponse {
  status: 'success' | 'error';
  data?: any;
  message?: string | undefined;
  [key: string]: any;

  constructor(props: CustomResponseProps) {
    this.status = props.status;
    this.data = props.data;
    this.message = props.message;
  }

  public static success(message?: string) {
    return new CustomResponse({
      status: 'success'
    });
  }

  public static error(message?: string) {
    return new CustomResponse({
      status: 'error',
      message: message ?? 'An error occurred. Please try again.'
    })
  }

  public addKey(key: string, value: any) {
    this[key] = value;

    return this
  }

  public changeKey(key: string, value: any) {
    this.key = value;

    return this
  }

  public deleteKey(key: string) {
    delete this[key];

    return this
  }

  public addData(dataKey: string, dataValue: any) {
    this.data[dataKey] = dataValue;

    return this
  }

  public changeData(dataKey: string, dataValue: any) {
    this.data[dataKey] = dataValue;

    return this
  }

  public deleteData(dataKey: string) {
    delete this.data[dataKey];

    return this
  }
}