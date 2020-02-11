export const params = {
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
