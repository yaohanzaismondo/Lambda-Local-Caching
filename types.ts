export interface Caching {
  [key: string]: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
    expiry: number;
  }
}
