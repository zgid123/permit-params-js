import isObjectType from '../../src/utils/isObjectType';

test('check with object', () => {
  expect(isObjectType({})).toBe(true);
});

test('check with array', () => {
  expect(isObjectType([])).toBe(true);
});

test('check with null', () => {
  expect(isObjectType(null)).toBe(false);
});

test('check with undefined', () => {
  expect(isObjectType(undefined)).toBe(false);
});

test('check with non-object, non-array, non-null and non-undefined', () => {
  expect(isObjectType('test string')).toBe(false);
});
