import path from 'node:path';
import { fileSystem } from '#__tests__/setup-test-context.ts';
import {
  ensureRootDir,
  existsInRoot,
  resolveRootPath,
  ROOT_PATH,
  writeRootFile,
  writeRootJsonFile,
} from '#src/services/root.service.ts';

describe('root.service', () => {
  const rootFile = 'hello.json';
  const rootDir = 'test';

  beforeEach(() => {
    fileSystem.seed({
      dirs: [rootDir],
      files: {
        [rootFile]: '{}',
      },
    });
  });

  describe('ROOT_PATH', () => {
    it('is process.cwd()', () => {
      const actual = ROOT_PATH;
      const expected = process.cwd();

      expect(actual).toBe(expected);
    });
  });

  describe('resolveRootPath', () => {
    it('returns joined path with ROOT_PATH', () => {
      const pathToJoin = '__test__';

      const actual = resolveRootPath(pathToJoin);
      const expected = path.join(ROOT_PATH, pathToJoin);

      expect(actual).toBe(expected);
    });

    it('returns joined paths with ROOT_PATH', () => {
      const pathsToJoin = ['__test__', '__test2__'];

      const actual = resolveRootPath(...pathsToJoin);
      const expected = path.join(ROOT_PATH, ...pathsToJoin);

      expect(actual).toBe(expected);
    });
  });

  describe('existsInRoot', () => {
    it('returns true if file exists at root', async () => {
      const actual = await existsInRoot(rootFile);
      const expected = true;

      expect(actual).toBe(expected);
    });

    it("returns false if file doesn't exist at root", async () => {
      const actual = await existsInRoot('__test__.json');
      const expected = false;

      expect(actual).toBe(expected);
    });
  });

  describe('ensureRootDir', () => {
    it("creates a directory at the root if it doesn't exist", async () => {
      const dir = '__test__';

      await ensureRootDir(dir);

      expect(fileSystem.getDirs()).toContain(dir);
    });

    it('does not create a directory at the root if it exists', async () => {
      const dirs = fileSystem.getDirs();

      await ensureRootDir(rootDir);

      expect(fileSystem.getDirs()).toEqual(dirs);
    });
  });

  describe('writeRootFile', () => {
    it('adds file to root', async () => {
      const fileName = '__test__.json';
      const content = '__test__';

      await writeRootFile(fileName, content);

      expect(fileSystem.readFile(fileName)).toBe(`${content}\n`);
    });
  });

  describe('writeRootJsonFile', () => {
    it('adds json file to root', async () => {
      const fileName = '__test__.json';
      const content = {};

      await writeRootJsonFile(fileName, content);

      expect(fileSystem.readFile(fileName)).toBe(`${JSON.stringify(content, null, 2)}\n`);
    });
  });
});
