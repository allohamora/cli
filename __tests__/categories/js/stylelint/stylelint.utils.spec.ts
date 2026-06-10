import { contextState, fileSystem } from '#__tests__/setup-test-context.ts';
import { prettierMutation, isStylelintInstalled } from '#src/categories/js/stylelint/stylelint.utils.ts';
import type { Config } from '#src/categories/js/stylelint/config/config.interface.ts';

describe('isStylelintInstalled', () => {
  test('should return true if stylelint is installing', async () => {
    contextState.setInstalling(['stylelint']);

    expect(await isStylelintInstalled()).toBe(true);
  });

  test('should return true if stylelint config exists', async () => {
    fileSystem.writeFile('.stylelintrc', '');

    expect(await isStylelintInstalled()).toBe(true);
  });

  test('should return false if stylelint is not installing and config does not exist', async () => {
    expect(await isStylelintInstalled()).toBe(false);
  });
});

describe('prettierMutation', () => {
  test('should add stylelint-prettier dependencies and prettier config', async () => {
    const actual = { devDependencies: [], stylelintConfig: { extends: [] } };
    contextState.setInstalling(['prettier']);

    await prettierMutation(actual as unknown as Config);

    const expected = {
      devDependencies: ['stylelint-prettier'],
      stylelintConfig: { extends: ['stylelint-prettier/recommended'] },
    };

    expect(actual).toEqual(expected);
  });

  test('should not add stylelint-prettier dependencies and prettier config if prettier is not installed', async () => {
    const actual = { devDependencies: [], stylelintConfig: { extends: [] } };

    await prettierMutation(actual as unknown as Config);

    const expected = { devDependencies: [], stylelintConfig: { extends: [] } };

    expect(actual).toEqual(expected);
  });
});
