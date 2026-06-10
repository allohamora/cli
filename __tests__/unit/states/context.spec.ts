import { setInstalling, getInstalling } from '#src/states/context.ts';

describe('context', () => {
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
    it('sets installing', expectSetAndGet);
  });

  describe('getInstalling', () => {
    it('returns empty array if not set', () => {
      const actual = getInstalling();
      const expected: string[] = [];

      expect(actual).toEqual(expected);
    });

    it('returns installing', expectSetAndGet);
  });
});
