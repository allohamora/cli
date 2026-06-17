import { fileSystem } from '#__tests__/setup-test-context.ts';
import { npmrc } from '#src/categories/js/npmrc/npmrc.installer.ts';
import { describe, expect, it } from 'vitest';

describe('npmrc.installer', () => {
  describe('npmrc', () => {
    it('writes .npmrc with the default npm config', async () => {
      await npmrc();

      expect(fileSystem.readFile('.npmrc')).toBe('min-release-age=3\n');
    });
  });
});
