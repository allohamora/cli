import { toCamelCase, toKebabCase, toTitleCase } from '#src/utils/string.utils.ts';
import { describe, expect, it } from 'vitest';

describe('string.utils', () => {
  describe('toKebabCase', () => {
    it('converts string to kebab-case', () => {
      const actual = toKebabCase('helloWorld');
      const expected = 'hello-world';

      expect(actual).toBe(expected);
    });
  });

  describe('toTitleCase', () => {
    it('capitalizes each hyphen-separated word', () => {
      const actual = toTitleCase('hello-world');
      const expected = 'Hello World';

      expect(actual).toBe(expected);
    });

    it('capitalizes a single word', () => {
      const actual = toTitleCase('cli');
      const expected = 'Cli';

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
