import * as json from 'src/utils/json';
import * as runCommand from 'src/utils/run-command';
import fsp from 'node:fs/promises';
import {
  addScripts,
  addToPackageJson,
  getPackageJson,
  installDevelopmentDependencies,
  runScript,
  setPackageJson,
} from 'src/utils/npm';
import { PACKAGE_JSON_PATH } from 'src/utils/path';

jest.mock('node:fs/promises');
const fspMocked = jest.mocked(fsp);

jest.mock('src/utils/json');
const jsonMocked = jest.mocked(json);

jest.mock('src/utils/run-command');
const runCommandMocked = jest.mocked(runCommand);

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
  expect(jsonMocked.stringify).toHaveBeenCalledWith(target);
  expect(fspMocked.writeFile).toHaveBeenCalledWith(PACKAGE_JSON_PATH, json.stringify(target), { encoding: 'utf-8' });
};

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
