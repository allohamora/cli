import path from 'node:path';
import { fileSystem, terminal } from '#__tests__/setup-test-context.ts';
import {
  addNpmScripts,
  installDevDependencies,
  PACKAGE_JSON_NAME,
  PACKAGE_JSON_PATH,
  readPackageJson,
  runNpmScript,
  setPackageJsonField,
  writePackageJson,
} from '#src/services/npm.service.ts';
import { ROOT_PATH } from '#src/services/root.service.ts';

describe('npm.service', () => {
  const seedPackageJson = <T extends Record<string, unknown>>(value: T = {} as T) => {
    fileSystem.seed({ packageJson: value });
  };

  const expectPackageJsonToEqual = <T extends Record<string, unknown>>(target: T) => {
    expect(fileSystem.readJson(PACKAGE_JSON_NAME)).toEqual(target);
  };

  describe('constants', () => {
    it('resolves package.json from the project root', () => {
      expect(PACKAGE_JSON_PATH).toBe(path.join(ROOT_PATH, PACKAGE_JSON_NAME));
    });
  });

  describe('package.json mutations', () => {
    it('reads and writes package.json', async () => {
      const target = { a: 123 };

      seedPackageJson(target);
      await expect(readPackageJson()).resolves.toEqual(target);

      await writePackageJson({ b: 456 });
      expectPackageJsonToEqual({ b: 456 });
    });

    it('rejects reads and mutations when package.json is missing', async () => {
      fileSystem.seed({ packageJson: null });

      await expect(readPackageJson()).rejects.toThrow('package.json does not exist');
      await expect(setPackageJsonField('__test__', 123)).rejects.toThrow('package.json does not exist');
      await expect(addNpmScripts({ name: 'test', script: 'vitest' })).rejects.toThrow('package.json does not exist');
      expect(fileSystem.exists(PACKAGE_JSON_NAME)).toBe(false);
    });

    it('sets a top-level package.json field', async () => {
      seedPackageJson();

      await setPackageJsonField('__test__', 123);

      expectPackageJsonToEqual({ __test__: 123 });
    });

    it('adds npm scripts to new and existing script maps', async () => {
      const npmScripts = [
        { name: 'test', script: 'test' },
        { name: '__test__', script: '__test__' },
      ];

      await writePackageJson({});
      await addNpmScripts(...npmScripts);
      expectPackageJsonToEqual({ scripts: { test: 'test', __test__: '__test__' } });

      seedPackageJson({ scripts: { test: 'old-test' } });
      await addNpmScripts(...npmScripts);
      expectPackageJsonToEqual({ scripts: { test: 'test', __test__: '__test__' } });
    });
  });

  describe('npm commands', () => {
    it('executes npm scripts and installs dev dependencies', async () => {
      await runNpmScript('__test__');
      await installDevDependencies('turbo', 'test', 'hello');

      expect(terminal.getCommands()).toEqual([
        ['npm', ['run', '__test__']],
        ['npm', ['i', '-D', 'turbo', 'test', 'hello']],
      ]);
    });
  });
});
