import { contextState, fileSystem } from '#__tests__/setup-test-context.ts';
import { isPrettierInstalled } from '#src/categories/js/prettier/prettier.utils.ts';

describe('isPrettierInstalled', () => {
  test('should return true if prettier is installing', async () => {
    contextState.setInstalling(['prettier']);

    expect(await isPrettierInstalled()).toBe(true);
  });

  test('should return true if prettier config exists', async () => {
    fileSystem.writeFile('.prettierrc', '');

    expect(await isPrettierInstalled()).toBe(true);
  });

  test('should return false if prettier is not installing and config does not exist', async () => {
    expect(await isPrettierInstalled()).toBe(false);
  });
});
