import path from 'node:path';
import { fileSystem, terminal } from '#__tests__/setup-test-context.ts';
import { describe, expect, it } from 'vitest';
import {
  addNpmScripts,
  getNpmVersion,
  getProjectName,
  getRepositoryUrl,
  getWorkspacePackages,
  hasNpmScript,
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

  describe('hasNpmScript', () => {
    it('returns true if the script exists', async () => {
      seedPackageJson({ scripts: { lint: 'eslint "**/*.ts"' } });

      expect(await hasNpmScript('lint')).toBe(true);
    });

    it('returns false if the script does not exist', async () => {
      seedPackageJson({ scripts: { test: 'vitest' } });

      expect(await hasNpmScript('lint')).toBe(false);
    });

    it('returns false if scripts are missing', async () => {
      seedPackageJson({});

      expect(await hasNpmScript('lint')).toBe(false);
    });

    it('rejects if package.json is missing', async () => {
      fileSystem.seed({ packageJson: null });

      await expect(hasNpmScript('lint')).rejects.toThrow('package.json does not exist');
    });
  });

  describe('getRepositoryUrl', () => {
    it('returns the homepage url without the fragment', async () => {
      seedPackageJson({ homepage: 'https://github.com/allohamora/cli#readme' });

      await expect(getRepositoryUrl()).resolves.toBe('https://github.com/allohamora/cli');
    });

    it('returns homepage as-is when it has no fragment', async () => {
      seedPackageJson({ homepage: 'https://github.com/allohamora/cli' });

      await expect(getRepositoryUrl()).resolves.toBe('https://github.com/allohamora/cli');
    });

    it('throws when homepage is missing', async () => {
      seedPackageJson({});

      await expect(getRepositoryUrl()).rejects.toThrow('homepage is missing in package.json');
    });
  });

  describe('getProjectName', () => {
    it('returns an unscoped name as-is', async () => {
      seedPackageJson({ name: 'my-app' });

      await expect(getProjectName()).resolves.toBe('my-app');
    });

    it('returns the part after the slash when the scope matches the GitHub owner', async () => {
      seedPackageJson({ name: '@allohamora/cli', homepage: 'https://github.com/allohamora/cli' });

      await expect(getProjectName()).resolves.toBe('cli');
    });

    it('returns the scope when it does not match the GitHub owner', async () => {
      seedPackageJson({ name: '@hello/root', homepage: 'https://github.com/allohamora/cli' });

      await expect(getProjectName()).resolves.toBe('hello');
    });

    it('throws when name is missing', async () => {
      seedPackageJson({});

      await expect(getProjectName()).rejects.toThrow('name is missing in package.json');
    });

    it('falls back to the scope when the name is scoped but homepage is missing', async () => {
      seedPackageJson({ name: '@allohamora/cli' });

      await expect(getProjectName()).resolves.toBe('allohamora');
    });

    it('falls back to the scope when homepage is not a valid url', async () => {
      seedPackageJson({ name: '@allohamora/cli', homepage: 'not-a-valid-url' });

      await expect(getProjectName()).resolves.toBe('allohamora');
    });

    it('throws when the derived name is not a valid devcontainer project name', async () => {
      seedPackageJson({ name: '.bad-name' });

      await expect(getProjectName()).rejects.toThrow('is not a valid devcontainer project name');
    });
  });

  describe('getWorkspacePackages', () => {
    it('returns an empty array when there is no workspaces field', async () => {
      seedPackageJson({ name: 'root' });

      await expect(getWorkspacePackages()).resolves.toEqual([]);
    });

    it('resolves a trailing "/*" glob by scanning subdirectories for a package.json', async () => {
      fileSystem.seed({
        packageJson: { name: 'root', workspaces: ['apps/*'] },
        files: {
          'apps/api/package.json': JSON.stringify({ name: 'api' }),
          'apps/client/package.json': JSON.stringify({ name: 'client' }),
        },
        dirs: ['apps/empty'],
      });

      await expect(getWorkspacePackages()).resolves.toEqual([
        { name: 'api', dirPath: 'apps/api' },
        { name: 'client', dirPath: 'apps/client' },
      ]);
    });

    it('supports the { packages: [...] } workspaces config form', async () => {
      fileSystem.seed({
        packageJson: { name: 'root', workspaces: { packages: ['apps/*'] } },
        files: {
          'apps/api/package.json': JSON.stringify({ name: 'api' }),
        },
      });

      await expect(getWorkspacePackages()).resolves.toEqual([{ name: 'api', dirPath: 'apps/api' }]);
    });

    it('treats a literal (non-glob) entry as a single package path', async () => {
      fileSystem.seed({
        packageJson: { name: 'root', workspaces: ['tools/cli'] },
        files: {
          'tools/cli/package.json': JSON.stringify({ name: 'cli-tool' }),
        },
      });

      await expect(getWorkspacePackages()).resolves.toEqual([{ name: 'cli-tool', dirPath: 'tools/cli' }]);
    });

    it('strips the scope from a scoped workspace package name', async () => {
      fileSystem.seed({
        packageJson: { name: 'root', workspaces: ['apps/*'] },
        files: {
          'apps/api/package.json': JSON.stringify({ name: '@monorepo/api' }),
        },
      });

      await expect(getWorkspacePackages()).resolves.toEqual([{ name: 'api', dirPath: 'apps/api' }]);
    });

    it('throws when a workspace package.json is missing a name', async () => {
      fileSystem.seed({
        packageJson: { name: 'root', workspaces: ['apps/*'] },
        files: {
          'apps/api/package.json': JSON.stringify({}),
        },
      });

      await expect(getWorkspacePackages()).rejects.toThrow('name is missing in apps/api/package.json');
    });
  });

  describe('getNpmVersion', () => {
    it('returns the npm version from terminal exec output', async () => {
      const expected = '11.11.0';

      terminal.setCommandResult({ stdout: `${expected}\n` });

      const actual = await getNpmVersion();

      expect(actual).toBe(expected);
      expect(terminal.getCommands()).toEqual([['npm', ['-v']]]);
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
