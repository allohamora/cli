import { fileSystem } from '#__tests__/setup-test-context.ts';
import { tempDir } from '#src/categories/js/temp-dir/temp-dir.installer.ts';
import { describe, expect, it } from 'vitest';

describe('temp-dir.installer', () => {
  describe('tempDir', () => {
    it('creates .temp directory with .gitkeep', async () => {
      await tempDir();

      expect(fileSystem.getDirs()).toContain('.temp');
      expect(fileSystem.readFile('.temp/.gitkeep')).toBe('\n');
    });

    it('adds temp rules to .gitignore', async () => {
      await tempDir();

      expect(fileSystem.readFile('.gitignore')).toBe(['# Temp files', '.temp/**/*', '!.temp/.gitkeep', ''].join('\n'));
    });
  });
});
