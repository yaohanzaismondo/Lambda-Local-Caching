export enum FailureTypes {
  NotFound,
  Expired
}

interface Failure {
  isSuccessful: false;
  type: FailureTypes;
}

interface Success<T> {
  isSuccessful: true;
  value: T;
}

export type Result<T> = Success<T> | Failure

export interface Caching {
  [key: string]: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    expiry: number;
  };
}
