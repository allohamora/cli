import path from 'node:path';
import { fileSystem, terminal } from '#__tests__/setup-test-context.ts';
import {
  addScripts,
  addToPackageJson,
  getPackageJson,
  installDevelopmentDependencies,
  runScript,
  setPackageJson,
  PACKAGE_JSON_PATH,
  PACKAGE_JSON_NAME,
} from '#src/utils/npm.ts';
import { ROOT_PATH } from '#src/utils/path.ts';

const returnPackageJson = <T extends Record<string, unknown>>(value: T = {} as T) => {
  fileSystem.seed({ packageJson: value });
};

const expectPackageJsonWasGetted = () => {
  expect(fileSystem.exists(PACKAGE_JSON_NAME)).toBe(true);
};

const expectPackageJsonWasSaved = <T extends Record<string, unknown>>(target: T) => {
  expect(fileSystem.readJson(PACKAGE_JSON_NAME)).toEqual(target);
};

describe('PATHS', () => {
  test('PACKAGE_JSON_PATH should be ROOT_PATH/package.json', () => {
    const actual = PACKAGE_JSON_PATH;
    const expected = path.join(ROOT_PATH, 'package.json');

    expect(actual).toBe(expected);
  });
});

describe('getPackageJson', () => {
  test('should return package.json', async () => {
    returnPackageJson();

    const actual = await getPackageJson();
    const expected = {};

    expect(actual).toEqual(expected);
  });
});

describe('setPackageJson', () => {
  test('should stringify object and set it as package.json', async () => {
    const target = { a: 123 };

    await setPackageJson(target);
    expectPackageJsonWasSaved(target);
  });
});

describe('addToPackageJson', () => {
  test('should add field to package.json and save it', async () => {
    const fieldName = '__test__';
    const value = 123;

    returnPackageJson();

    await addToPackageJson(fieldName, value);

    expectPackageJsonWasGetted();
    expectPackageJsonWasSaved({ [fieldName]: value });
  });
});

describe('addScripts', () => {
  const npmScripts = [
    { name: 'test', script: 'test' },
    { name: '__test__', script: '__test__' },
  ];
  const scripts = npmScripts.reduce<Record<string, string>>((state, { name, script }) => {
    state[name] = script;

    return state;
  }, {});

  test('should add scripts to existed package.json scripts and save it', async () => {
    const packageJson = { scripts: { test: '__test__' } };
    returnPackageJson(packageJson);

    await addScripts(...npmScripts);

    expectPackageJsonWasGetted();
    expectPackageJsonWasSaved({ scripts: { ...packageJson.scripts, ...scripts } });
  });

  test('should add scripts to package.json and save it', async () => {
    await addScripts(...npmScripts);

    expectPackageJsonWasGetted();
    expectPackageJsonWasSaved({ scripts });
  });
});

describe('runScript', () => {
  test('should run npm script', async () => {
    const scriptName = '__test__';
    await runScript(scriptName);

    expect(terminal.getCommands()).toEqual([['npm', ['run', scriptName]]]);
  });
});

describe('installDevelopmentDependencies', () => {
  test('should install development dependencies', async () => {
    const dependencies = ['turbo', 'test', 'hello'];

    await installDevelopmentDependencies(...dependencies);

    expect(terminal.getCommands()).toEqual([['npm', ['i', '-D', ...dependencies]]]);
  });
});
