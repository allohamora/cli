import { toCamelCase, toKebabCase } from '#src/utils/string.utils.ts';

describe('string.utils', () => {
  describe('toKebabCase', () => {
    it('converts string to kebab-case', () => {
      const actual = toKebabCase('helloWorld');
      const expected = 'hello-world';

      expect(actual).toBe(expected);
    });
  });

  describe('toCamelCase', () => {
    it('converts string to camelCase', () => {
      const actual = toCamelCase('hello-world');
      const expected = 'helloWorld';

      expect(actual).toBe(expected);
    });
  });
});
