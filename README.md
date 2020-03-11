# Introduction

Simple package to permit parameters (from client for Node.js) to make it be strong parameters.

The behavior is like RoR [`ActionController::Parameters`](http://edgeguides.rubyonrails.org/action_controller_overview.html#strong-parameters)'s behavior.

## Installation

    $ npm install permit-params

## Usage

```js
import permitParams from 'permit-params';

const params = {
  name: 'Alpha',
  addresses: [
    {
      buildNumber: '0112',
      streetName: 'King Abdulaziz Road',
      city: 'Riyadh',
      postalCode: '12643',
    },
    {
      buildNumber: '0113',
      streetName: 'King Abdulaziz Road',
      postalCode: '12643',
    },
    {
      buildNumber: '0114',
      city: 'Riyadh',
      postalCode: '12643',
    },
  ],
  favoriteGames: ['Pokémon', 'Dragon Quest', 'Grandia', 'Fire Emblem', 'Megaman'],
  otherData: {
    firstCase: 'just a string',
    secondCase: ['array of string', null, 100],
    thirdCase: {
      test: 'test string',
    },
    fourthCase: [
      {
        test: 'test string',
      },
    ],
    fifthCase: [
      {
        test: ['test string'],
      },
    ],
    sixthCase: [
      'test string',
      {
        test: ['test string'],
      },
    ],
  },
};

const strongParams = permitParams(
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
);

console.log(strongParams); // will give the same object params, without element 'test string' of sixthCase
```

### More example

```js
permitParams(params, 'name'); // { name: 'Alpha' }

permitParams(params, { otherData: ['firstCase', 'seventhCase'] }); // { otherData: { firstCase: 'just a string' } }

permitParams(params, { favoriteGames: [] }); // { favoriteGames: ['Pokémon', 'Dragon Quest', 'Grandia', 'Fire Emblem', 'Megaman'] }

permitParams(params, { addresses: ['buildNumber'] }); // { addresses: [{ buildNumber: '0112' }, { buildNumber: '0113' }, { buildNumber: '0114' }] }

permitParams(params, { otherData: [{ sixthCase: [{ test: [] }] }] }); // { otherData: { sixthCase: [{ test: ['test string'] }] } }
```

# Cheatsheets

- To permit string/number/undefined/null parameter, use a `simple string`

  ```js
  const params = {
    firstName: 'Alpha',
    lastName: 'Lucifer',
    gender: 'Male',
  };

  permitParams(, 'firstName', 'lastName'); // { firstName: 'Alpha', lastName: 'Lucifer' }
  ```

- To permit object parameter, use `key - value`. With key is the name of the parameter, value is array of attributes' name of the object

  ```js
  const params = otherData: {
    firstCase: 'just a string',
    secondCase: 'a simple string',
    thirdCase: 'do not care',
  };

  permitParams(params, { otherData: ['firstCase', 'secondCase'] }); // { otherData: { firstCase: 'just a string, secondCase: 'a simple string' } }
  ```

- To permit array parameter, use `empty array ([])`

  ```js
  const params = {
    favoriteGames: ['Pokémon', 'Dragon Quest', 'Grandia', 'Fire Emblem', 'Megaman'],
  };

  permitParams(params, { favoriteGames: [] }); // { favoriteGames: ['Pokémon', 'Dragon Quest', 'Grandia', 'Fire Emblem', 'Megaman'] }
  ```

- To permit array of object parameter, use `key - value`. With key is the name of the parameter, value is array of attributes' name of the object

  ```js
  const params = {
    addresses: [
      {
        buildNumber: '0112',
        streetName: 'King Abdulaziz Road',
        city: 'Riyadh',
        postalCode: '12643',
      },
      {
        buildNumber: '0113',
        streetName: 'King Abdulaziz Road',
        postalCode: '12643',
      },
      {
        buildNumber: '0114',
        city: 'Riyadh',
        postalCode: '12643',
      },
    ],
  }

  permitParams(params, { addresses: ['buildNumber'] }); // { addresses: [{ buildNumber: '0112' }, { buildNumber: '0113' }, { buildNumber: '0114' }] }
  ```
