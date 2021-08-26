import {ErrorType} from '../common/custom_error'
import {raiseFailure, raiseSuccess} from '../common/result_handling'
import {Result} from '../common/result_response_types'
import {Caching} from './types'

let _cachedVariable: Caching

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getCacheVariable(key: string): Result<any> {
  if (!_cachedVariable || !_cachedVariable[key])
    return raiseFailure({
      message: 'Cached value not found',
      type: ErrorType.NotFound
    })
  const {expiry, value} = _cachedVariable[key]
  if (new Date().getTime() / 1000 >= expiry)
    return raiseFailure({
      message: 'Cached value is expired',
      type: ErrorType.NotFound
    })
  else
    return raiseSuccess(value)
}

export function cacheVariable<T>(key: string, value: T, expirySeconds = 300): void {
  _cachedVariable = {
    ..._cachedVariable,
    [key]: {
      value,
      expiry: new Date().getTime() / 1000 + expirySeconds
    }
  }
}
