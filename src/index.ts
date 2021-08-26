import { Caching, FailureTypes, Result } from './types';

export * from './types';

let _cachedVariable: Caching;

export function getCacheVariable<T>(key: string): Result<T> {
  if (!_cachedVariable || !_cachedVariable[key]) {
    return {
      isSuccessful: false,
      type: FailureTypes.NotFound,
    };
  }
  const { expiry, value } = _cachedVariable[key];
  if (Date.now() / 1000 >= expiry) {
    return {
      isSuccessful: false,
      type: FailureTypes.Expired,
    };
  } else {
    return {
      isSuccessful: true,
      value,
    };
  }
}

export function cacheVariable<T>(key: string, value: T, expirySeconds = 300): void {
  _cachedVariable = {
    ..._cachedVariable,
    [key]: {
      value,
      expiry: Date.now() / 1000 + expirySeconds,
    },
  };
}
