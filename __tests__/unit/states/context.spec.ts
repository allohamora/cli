import { setInstalling, getInstalling } from '#src/states/context.ts';

describe('context', () => {
  beforeEach(() => {
    setInstalling([]);
  });

  describe('getInstalling', () => {
    it('returns empty array if not set', () => {
      const actual = getInstalling();
      const expected: string[] = [];

      expect(actual).toEqual(expected);
    });
  });

  describe('setInstalling and getInstalling', () => {
    it('sets and gets installing', () => {
      const installing = ['__test__'];

      setInstalling(installing);

      const actual = getInstalling();
      const expected = installing;

      expect(actual).toBe(expected);
    });
  });
});
