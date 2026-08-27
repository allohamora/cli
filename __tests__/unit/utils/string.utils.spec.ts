import { pluralize, toCamelCase, toKebabCase, toTitleCase } from '#src/utils/string.utils.ts';
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

  describe('pluralize', () => {
    it('returns the singular form for a count of 1', () => {
      const actual = pluralize(1, 'target', 'targets');
      const expected = 'target';

      expect(actual).toBe(expected);
    });

    it('returns the plural form for a count of 0', () => {
      const actual = pluralize(0, 'target', 'targets');
      const expected = 'targets';

      expect(actual).toBe(expected);
    });

    it('returns the plural form for a count greater than 1', () => {
      const actual = pluralize(2, 'target', 'targets');
      const expected = 'targets';

      expect(actual).toBe(expected);
    });
  });
});
