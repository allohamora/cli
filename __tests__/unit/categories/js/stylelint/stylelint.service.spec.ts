import { contextState, fileSystem } from '#__tests__/setup-test-context.ts';
import { prettierMutation, isStylelintInstalled } from '#src/categories/js/stylelint/stylelint.service.ts';
import type { Config } from '#src/categories/js/stylelint/config/config.interface.ts';

describe('stylelint.service', () => {
  describe('isStylelintInstalled', () => {
    it('returns true if stylelint is installing', async () => {
      contextState.setInstalling(['stylelint']);

      expect(await isStylelintInstalled()).toBe(true);
    });

    it('returns true if stylelint config exists', async () => {
      fileSystem.writeFile('.stylelintrc', '');

      expect(await isStylelintInstalled()).toBe(true);
    });

    it('returns false if stylelint is not installing and config does not exist', async () => {
      expect(await isStylelintInstalled()).toBe(false);
    });
  });

  describe('prettierMutation', () => {
    it('adds stylelint-prettier dependencies and prettier config', async () => {
      const actual = { devDependencies: [], stylelintConfig: { extends: [] } };
      contextState.setInstalling(['prettier']);

      await prettierMutation(actual as unknown as Config);

      const expected = {
        devDependencies: ['stylelint-prettier'],
        stylelintConfig: { extends: ['stylelint-prettier/recommended'] },
      };

      expect(actual).toEqual(expected);
    });

    it('does not add stylelint-prettier dependencies and prettier config if prettier is not installed', async () => {
      const actual = { devDependencies: [], stylelintConfig: { extends: [] } };

      await prettierMutation(actual as unknown as Config);

      const expected = { devDependencies: [], stylelintConfig: { extends: [] } };

      expect(actual).toEqual(expected);
    });
  });
});
