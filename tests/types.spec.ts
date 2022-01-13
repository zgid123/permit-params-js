import permitParams from '../src';
import { params } from './fixtures/dummyData';

interface IResultProps {
  name: string;
  gender: string;
  favoriteGames: string[];
  addresses: {
    buildNumber: string;
    streetName: string;
    city: string;
    postalCode: string;
  };
  otherData: {
    firstCase: string;
    secondCase: string[];
    thirdCase: {
      test: string;
    };
    fourthCase: {
      test: string;
    }[];
    fifthCase: {
      test: string[];
    }[];
    sixthCase: {
      test: string[];
    }[];
  }
}

interface IDataProps {
  name: string;
}

const data: IDataProps = {
  name: 'test',
};

const testResult = permitParams<IResultProps>(
  params,
  'name',
  'gender',
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

permitParams<IDataProps>(data, 'name');
permitParams<IDataProps>({ a: {} }, 'test');

console.log(testResult.name);
console.log(testResult.gender);
console.log(testResult.favoriteGames);
console.log(testResult.addresses);
console.log(testResult.otherData);
