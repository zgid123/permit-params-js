# Introduction

Simple package to permit parameters (from client for Node.js) to make it be strong parameters.

The behavior is like RoR `ActionController::Parameters`'s behavior.

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

## License

The MIT License (MIT)

Copyright (c) 2015 Nicholas Penree

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
