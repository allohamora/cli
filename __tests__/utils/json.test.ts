import { stringify } from 'src/utils/json';

describe('stringify', () => {
  test('should stringify json with 2 spaces', () => {
    const value = { a: 123 };

    const actual = stringify(value);
    const expected = '{\n  "a": 123\n}';

    expect(actual).toBe(expected);
  });
});
