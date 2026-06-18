import { getEditorconfigPreset } from '#src/categories/js/editorconfig/preset/index.ts';
import { config } from '#src/categories/js/editorconfig/preset/default.preset.ts';
import { describe, expect, it } from 'vitest';

describe('editorconfig preset', () => {
  describe('getEditorconfigPreset', () => {
    it('returns default preset', () => {
      expect(getEditorconfigPreset()).toEqual({
        config: [
          '# Editor configuration, see https://editorconfig.org',
          'root = true',
          '',
          '[*]',
          'charset = utf-8',
          'indent_style = space',
          'indent_size = 2',
          'insert_final_newline = true',
          'trim_trailing_whitespace = true',
          '',
          '[*.md]',
          'max_line_length = off',
          'trim_trailing_whitespace = false',
        ].join('\n'),
      });
      expect(getEditorconfigPreset()).toEqual({
        config,
      });
    });
  });
});
