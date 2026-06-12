import path from 'node:path';
import { fileSystem, terminal } from '#__tests__/setup-test-context.ts';
import { ROOT_PATH } from '#src/services/root.service.ts';
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

describe('npm', () => {
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
    it('PACKAGE_JSON_PATH is ROOT_PATH/package.json', () => {
      const actual = PACKAGE_JSON_PATH;
      const expected = path.join(ROOT_PATH, 'package.json');

      expect(actual).toBe(expected);
    });
  });

  describe('getPackageJson', () => {
    it('returns package.json', async () => {
      returnPackageJson();

      const actual = await getPackageJson();
      const expected = {};

      expect(actual).toEqual(expected);
    });

    it("rejects if package.json doesn't exist", async () => {
      fileSystem.seed({ packageJson: null });

      await expect(getPackageJson()).rejects.toThrow('package.json does not exist');
    });
  });

  describe('setPackageJson', () => {
    it('stringifies object and sets it as package.json', async () => {
      const target = { a: 123 };

      await setPackageJson(target);
      expectPackageJsonWasSaved(target);
    });
  });

  describe('addToPackageJson', () => {
    it('adds field to package.json and saves it', async () => {
      const fieldName = '__test__';
      const value = 123;

      returnPackageJson();

      await addToPackageJson(fieldName, value);

      expectPackageJsonWasGetted();
      expectPackageJsonWasSaved({ [fieldName]: value });
    });

    it("rejects if package.json doesn't exist", async () => {
      fileSystem.seed({ packageJson: null });

      await expect(addToPackageJson('__test__', 123)).rejects.toThrow('package.json does not exist');
      expect(fileSystem.exists(PACKAGE_JSON_NAME)).toBe(false);
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

    it('adds scripts to existing package.json scripts and saves it', async () => {
      const packageJson = { scripts: { test: '__test__' } };
      returnPackageJson(packageJson);

      await addScripts(...npmScripts);

      expectPackageJsonWasGetted();
      expectPackageJsonWasSaved({ scripts: { ...packageJson.scripts, ...scripts } });
    });

    it('adds scripts to package.json and saves it', async () => {
      await addScripts(...npmScripts);

      expectPackageJsonWasGetted();
      expectPackageJsonWasSaved({ scripts });
    });

    it("rejects if package.json doesn't exist", async () => {
      fileSystem.seed({ packageJson: null });

      await expect(addScripts(...npmScripts)).rejects.toThrow('package.json does not exist');
      expect(fileSystem.exists(PACKAGE_JSON_NAME)).toBe(false);
    });
  });

  describe('runScript', () => {
    it('runs npm script', async () => {
      const scriptName = '__test__';
      await runScript(scriptName);

      expect(terminal.getCommands()).toEqual([['npm', ['run', scriptName]]]);
    });
  });

  describe('installDevelopmentDependencies', () => {
    it('installs development dependencies', async () => {
      const dependencies = ['turbo', 'test', 'hello'];

      await installDevelopmentDependencies(...dependencies);

      expect(terminal.getCommands()).toEqual([['npm', ['i', '-D', ...dependencies]]]);
    });
  });
});
