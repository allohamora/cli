import { white } from 'src/utils/console';

describe('white', () => {
  test('should return string with white and reset codes', () => {
    const string = '__test__';

    const actual = white(string);
    const expected = `\x1b[22m\x1b[1m${string}\x1b[0m`;

    expect(actual).toBe(expected);
  });
});
