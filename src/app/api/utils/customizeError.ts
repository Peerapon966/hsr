export interface CustomizeErrorProps {
  message?: string;
  location: string;
  [key: string]: any;
}

export function customizeError<T extends object>(error: T, props: CustomizeErrorProps): T & CustomizeErrorProps {
  let customizedError = { ...error } as T & CustomizeErrorProps;

  Object.entries(props).forEach(([prop, value]) => {
    (prop in error)
      ? customizedError = overrideProp(customizedError, prop, value)
      : customizedError = insertProp(customizedError, prop, value);
  });

  console.log('customized error: ', customizedError)
  return customizedError;
}

function overrideProp<T extends object>(error: T, prop: keyof T | string, value: any): T {
  return {
    ...error,
    [prop]: value
  };
}

function insertProp<T extends object>(error: T, prop: string, value: any): T & Record<string, any> {
  return {
    ...error,
    [prop]: value
  };
}