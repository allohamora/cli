import { contextState, fileSystem } from '#__tests__/setup-test-context.ts';
import { addHook, isHuskyInstalled } from '#src/categories/js/husky/husky.utils.ts';

describe('addHook', () => {
  test('should create hook with placeholder and replace it content to correct', async () => {
    const hookType = 'commit-msg';
    const script = 'npx run __test__';

    await addHook(hookType, script);

    expect(fileSystem.readFile(`.husky/${hookType}`)).toBe(`${script}\n`);
  });
});

describe('isHuskyInstalled', () => {
  test('should return true if husky is installing', async () => {
    contextState.setInstalling(['husky']);

    expect(await isHuskyInstalled()).toBe(true);
  });

  test('should return true if husky dir exists', async () => {
    fileSystem.seed({ dirs: ['.husky'] });

    expect(await isHuskyInstalled()).toBe(true);
  });

  test('should return false if husky is not installing and dir does not exist', async () => {
    expect(await isHuskyInstalled()).toBe(false);
  });
});
