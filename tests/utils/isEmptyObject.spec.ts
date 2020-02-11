import isEmptyObject from '../../src/utils/isEmptyObject';

test('check with empty object', () => {
  expect(isEmptyObject({})).toBe(true);
});

test('check with non-empty object', () => {
  expect(isEmptyObject({ name: 'Alpha' })).toBe(false);
});

test('check with empty array', () => {
  expect(isEmptyObject([])).toBe(true);
});

test('check with non-empty array', () => {
  expect(isEmptyObject(['test string'])).toBe(true);
});

test('check with non-object and non-array', () => {
  expect(isEmptyObject('test string')).toBe(true);
});
