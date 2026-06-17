import { fileSystem } from '#__tests__/setup-test-context.ts';
import { editorconfig } from '#src/categories/js/editorconfig/editorconfig.installer.ts';
import { describe, expect, it } from 'vitest';

describe('editorconfig.installer', () => {
  describe('editorconfig', () => {
    it('writes .editorconfig with the default config', async () => {
      await editorconfig();

      expect(fileSystem.readFile('.editorconfig')).toBe(
        [
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
          '',
        ].join('\n'),
      );
    });
  });
});
