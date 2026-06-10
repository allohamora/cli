import { contextState, fileSystem } from '#__tests__/setup-test-context.ts';
import { isJestInstalled } from '#src/categories/js/jest/jest.utils.ts';

describe('isJestInstalled', () => {
  test('should return true if jest is installing', async () => {
    contextState.setInstalling(['jest']);

    expect(await isJestInstalled()).toBe(true);
  });

  test('should return true if jest config exists', async () => {
    fileSystem.writeFile('jest.config.cjs', '');

    expect(await isJestInstalled()).toBe(true);
  });

  test('should return false if jest is not installing and config does not exist', async () => {
    expect(await isJestInstalled()).toBe(false);
  });
});
