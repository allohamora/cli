import { unique } from '#src/utils/array.utils.ts';
import { describe, expect, it } from 'vitest';

describe('array.utils', () => {
  describe('unique', () => {
    it('removes duplicate values', () => {
      expect(unique([1, 2, 2, 3])).toEqual([1, 2, 3]);
    });

    it('preserves order of first occurrences', () => {
      expect(unique([3, 1, 2, 1, 3])).toEqual([3, 1, 2]);
    });

    it('returns the same array when no duplicates exist', () => {
      expect(unique([1, 2, 3])).toEqual([1, 2, 3]);
    });

    it('returns an empty array for empty input', () => {
      expect(unique([])).toEqual([]);
    });

    it('works with strings', () => {
      expect(unique(['a', 'b', 'a'])).toEqual(['a', 'b']);
    });
  });
});
