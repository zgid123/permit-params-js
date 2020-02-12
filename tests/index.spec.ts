import permitParams from '../src';
import { params } from './fixtures/dummyData';
import isObjectType from '../src/utils/isObjectType';

test('permit full schema', () => {
  expect(
    permitParams(
      params,
      'name',
      {
        favoriteGames: [],
        addresses: ['buildNumber', 'streetName', 'city', 'postalCode'],
        otherData: [
          'firstCase',
          {
            secondCase: [],
            thirdCase: ['test'],
            fourthCase: ['test'],
            fifthCase: [{ test: [] }],
            sixthCase: [{ test: [] }],
          },
        ],
      },
    ),
  ).toEqual({
    ...params,
    otherData: {
      ...params.otherData,
      sixthCase: params.otherData.sixthCase.filter(e => isObjectType(e)),
    },
  });
});

describe('permit non-object/non-array param', () => {
  test('with valid schema', () => {
    expect(
      permitParams(
        params,
        'name',
      ),
    ).toEqual({ name: params.name });
  });

  test('with invalid schema', () => {
    expect(
      permitParams(
        params,
        {
          name: ['id'],
        },
      ),
    ).toEqual({});
  });
});

describe('permit object param', () => {
  test('with non-existing key', () => {
    expect(
      permitParams(
        params,
        {
          otherData: [
            'firstCase',
            'seventhCase',
          ],
        },
      ),
    ).toEqual({
      otherData: {
        firstCase: params.otherData.firstCase,
      },
    });
  });

  test('with invalid schema', () => {
    expect(
      permitParams(
        params,
        {
          otherData: [
            {
              thirdCase: [],
              secondCase: ['test'],
            },
          ],
        },
      ),
    ).toEqual({});
  });
});

describe('permit array param', () => {
  describe('array without object element', () => {
    test('with valid schema', () => {
      expect(
        permitParams(
          params,
          {
            favoriteGames: [],
          },
        ),
      ).toEqual({ favoriteGames: params.favoriteGames });
    });

    test('with invalid schema', () => {
      expect(
        permitParams(
          params,
          {
            favoriteGames: ['id'],
          },
        ),
      ).toEqual({});
    });
  });

  describe('array with object element', () => {
    test('with valid schema', () => {
      expect(
        permitParams(
          params,
          {
            addresses: ['buildNumber'],
          },
        ),
      ).toEqual({ addresses: params.addresses.map(a => ({ buildNumber: a.buildNumber })) });
    });

    test('with invalid schema', () => {
      expect(
        permitParams(
          params,
          {
            addresses: [],
          },
        ),
      ).toEqual({});
    });
  });

  describe('array with object element has array value', () => {
    test('with valid schema', () => {
      expect(
        permitParams(
          params,
          {
            otherData: [
              { sixthCase: [{ test: [] }] },
            ],
          },
        ),
      ).toEqual({
        otherData: {
          sixthCase: [
            { test: ['test string'] },
          ],
        },
      });
    });

    test('with invalid schema', () => {
      expect(
        permitParams(
          params,
          {
            otherData: [
              { sixthCase: [{ test: ['id'] }] },
            ],
          },
        ),
      ).toEqual({});
    });
  });
});
