import { contextState, fileSystem } from '#__tests__/setup-test-context.ts';
import { isJestInstalled } from '#src/categories/js/jest/jest.service.ts';

describe('jest.service', () => {
  describe('isJestInstalled', () => {
    it('returns true if jest is installing', async () => {
      contextState.setInstalling(['jest']);

      expect(await isJestInstalled()).toBe(true);
    });

    it('returns true if jest config exists', async () => {
      fileSystem.writeFile('jest.config.cjs', '');

      expect(await isJestInstalled()).toBe(true);
    });

    it('returns false if jest is not installing and config does not exist', async () => {
      expect(await isJestInstalled()).toBe(false);
    });
  });
});
