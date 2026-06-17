import { getNpmrcPreset } from '#src/categories/js/npmrc/preset/index.ts';
import { describe, expect, it } from 'vitest';

describe('npmrc preset', () => {
  describe('getNpmrcPreset', () => {
    it('returns default preset', () => {
      expect(getNpmrcPreset()).toEqual({
        config: ['min-release-age=3'],
      });
    });
  });
});
