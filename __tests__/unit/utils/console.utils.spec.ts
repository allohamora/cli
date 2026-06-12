import { bold } from '#src/utils/console.utils.ts';
import { describe, expect, it } from 'vitest';

describe('console.utils', () => {
  describe('bold', () => {
    it('returns string with bold and reset codes', () => {
      const string = '__test__';

      const actual = bold(string);
      const expected = `\x1b[22m\x1b[1m${string}\x1b[0m`;

      expect(actual).toBe(expected);
    });
  });
});
