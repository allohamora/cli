import { setInstalling, getInstalling } from 'src/states/context';

const expectSetAndGet = () => {
  const installing = ['__test__'];

  setInstalling(installing);

  const actual = getInstalling();
  const expected = installing;

  expect(actual).toBe(expected);
};

beforeEach(() => {
  setInstalling([]);
});

describe('setInstalling', () => {
  test('should set installing', expectSetAndGet);
});

describe('getInstalling', () => {
  test('should return empty array if not setted', () => {
    const actual = getInstalling();
    const expected: string[] = [];

    expect(actual).toEqual(expected);
  });

  test('should return installing', expectSetAndGet);
});
