import { fileSystem, installationState } from '#__tests__/setup-test-context.ts';
import { addHook, isHuskyInstalled } from '#src/categories/js/husky/husky.service.ts';

describe('husky.service', () => {
  describe('addHook', () => {
    it('creates hook with placeholder and replaces its content', async () => {
      const hookType = 'commit-msg';
      const script = 'npx run __test__';

      await addHook(hookType, script);

      expect(fileSystem.readFile(`.husky/${hookType}`)).toBe(`${script}\n`);
    });
  });

  describe('isHuskyInstalled', () => {
    it('returns true if husky is selected for install', async () => {
      installationState.setSelectedInstallOptions(['husky']);

      expect(await isHuskyInstalled()).toBe(true);
    });

    it('returns true if husky dir exists', async () => {
      fileSystem.seed({ dirs: ['.husky'] });

      expect(await isHuskyInstalled()).toBe(true);
    });

    it('returns false if husky is not selected for install and dir does not exist', async () => {
      expect(await isHuskyInstalled()).toBe(false);
    });
  });
});
