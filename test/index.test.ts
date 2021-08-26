import { expect } from 'chai';
import { cacheVariable, FailureTypes, getCacheVariable } from '../src';
const key = 'stub-key';

it('Not Found', () => {
  const response = getCacheVariable<string>(key);
  expect(response).to.deep.eq({
    isSuccessful: false,
    type: FailureTypes.NotFound,
  });
});

it('Expired', () => {
  const expectedValue = 'hi, this is the cached variable';
  cacheVariable<string>(key, expectedValue, 0);
  const response = getCacheVariable<string>(key);
  expect(response).to.deep.eq({
    isSuccessful: false,
    type: FailureTypes.Expired,
  });
});

it('Found the cached variable', () => {
  const expectedValue = 'hi, this is the cached variable';
  cacheVariable<string>(key, expectedValue);
  const response = getCacheVariable<string>(key);
  expect(response).to.deep.eq({
    isSuccessful: true,
    value: expectedValue,
  });
  expect(response).to.have.a.property('value').to.be.a('string');
});