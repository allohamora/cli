import { getEditorconfigPreset } from '#src/categories/js/editorconfig/preset/index.ts';
import { config } from '#src/categories/js/editorconfig/preset/default.preset.ts';
import { describe, expect, it } from 'vitest';

describe('editorconfig preset', () => {
  describe('getEditorconfigPreset', () => {
    it('returns default preset', () => {
      expect(getEditorconfigPreset()).toEqual({
        config,
      });
    });
  });
});
