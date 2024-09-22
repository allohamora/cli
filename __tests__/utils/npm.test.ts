import * as runCommand from 'src/utils/run-command';
import * as fs from 'src/utils/fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import {
  addScripts,
  addToPackageJson,
  getPackageJson,
  installDevelopmentDependencies,
  runScript,
  setPackageJson,
  PACKAGE_JSON_PATH,
  PACKAGE_JSON_NAME,
} from 'src/utils/npm';
import { ROOT_PATH } from 'src/utils/path';

jest.mock('node:fs/promises');
const fspMocked = jest.mocked(fsp);

jest.mock('src/utils/run-command');
const runCommandMocked = jest.mocked(runCommand);

jest.mock('src/utils/fs');
const fsMocked = jest.mocked(fs);

beforeEach(() => {
  jest.clearAllMocks();
});

const returnPackageJson = <T extends Record<string, unknown>>(value: T = {} as T) => {
  fspMocked.readFile.mockImplementation(async (path) => {
    if (path === PACKAGE_JSON_PATH) return JSON.stringify(value);

    return '';
  });
};

const expectPackageJsonWasGetted = () => {
  expect(fspMocked.readFile).toHaveBeenCalledWith(PACKAGE_JSON_PATH, { encoding: 'utf-8' });
};

const expectPackageJsonWasSaved = <T extends Record<string, unknown>>(target: T) => {
  expect(fsMocked.addJsonFileToRoot).toHaveBeenCalledWith(PACKAGE_JSON_NAME, target);
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

    await addScripts(...npmScripts);

    returnPackageJson(packageJson);
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

    expect(runCommandMocked.runCommand).toHaveBeenCalledWith(`npm run ${scriptName}`);
  });
});

describe('installDevelopmentDependencies', () => {
  test('should install development dependencies', async () => {
    const dependencies = ['turbo', 'test', 'hello'];
    const joined = dependencies.join(' ');

    await installDevelopmentDependencies(...dependencies);

    expect(runCommandMocked.runCommand).toHaveBeenCalledWith(`npm i -D ${joined}`);
  });
});
