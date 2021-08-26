# Lambda-Local-Caching

Library for setting and retrieving local caching in AWS Lambda.

## Overview

Anything declared outside the handler function (in global variable) is reused between invocations. The cached variable will live as long as the lambda container runs. As a result, there is no guarantee about the lifetime of the cached variable itself.

This library provides an expiry of each cached variable. The default caching expiry is 5 minutes.

## Installation

```console
npm i lambda-local-caching
```

## How to Use

### Cache Variable
```javascript
import {cacheVariable, getCacheVariable} from 'lambda-local-caching'

const variableToBeCachedValue = 'abcd'
const key = 'variable-to-be-cached'
cacheVariable<string>(key, variableToBeCachedValue, 600)

```
### Getting Cached Variable
```javascript
import {cacheVariable, getCacheVariable} from 'lambda-local-caching'

const variableToBeCachedValue = 'abcd'
const key = 'variable-to-be-cached'
cacheVariable<string>(key, variableToBeCachedValue)

const result = getCacheVariable<string>(key)

console.log(result.isSuccessful) // true
console.log(result.value) //This will print out abcd

```

#### Unsuccessful retrieval
```javascript
import {getCacheVariable} from 'lambda-local-caching'

const key = 'variable-to-be-cached'
const result = getCacheVariable<string>(key)

console.log(result.isSuccessful) // false
console.log(result.type) // FailureType.NotFound


cacheVariable<string>(key, 'some-value', 0) //expired
console.log(result.isSuccessful) // false
console.log(result.type) // FailureType.Expired
```

### General Use Case (Getting & Setting the cached)
```javascript
import {cacheVariable, getCacheVariable} from 'lambda-local-caching'

const key = 'variable-to-be-cached'

function getSomething(): string {
  const result = getCacheVariable<string>(key)
  if (!result.isSuccessful) {
    const value = getSomeOtherThingToBeCached()
    cacheVariable<string>(key, value)
    return value
  }
  return result.value
}
```

