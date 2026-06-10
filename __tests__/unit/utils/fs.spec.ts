import { fileSystem } from '#__tests__/setup-test-context.ts';
import { rootPath } from '#src/utils/path.ts';
import { addDirToRootIfNotExists, addFileToRoot, addJsonFileToRoot, isExistsInRoot } from '#src/utils/fs.ts';

describe('fs', () => {
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

  describe('isExistsInRoot', () => {
    it('returns true if file exists at root', async () => {
      const actual = await isExistsInRoot(rootFile);
      const expected = true;

      expect(actual).toBe(expected);
    });

    it("returns false if file doesn't exist at root", async () => {
      const actual = await isExistsInRoot('__test__.json');
      const expected = false;

      expect(actual).toBe(expected);
    });
  });

  describe('addDirToRootIfNotExists', () => {
    it("creates dir at root if it doesn't exist", async () => {
      const dir = '__test__';
      const expected = rootPath(dir);

      await addDirToRootIfNotExists(dir);

      expect(fileSystem.getDirs()).toContain(dir);
      expect(rootPath(dir)).toBe(expected);
    });

    it('does not create dir at root if it exists', async () => {
      const dirs = fileSystem.getDirs();

      await addDirToRootIfNotExists(rootDir);

      expect(fileSystem.getDirs()).toEqual(dirs);
    });
  });

  describe('addFileToRoot', () => {
    it('adds file to root', async () => {
      const fileName = '__test__.json';
      const content = '__test__';

      const fileNameWithPath = rootPath(fileName);

      await addFileToRoot(fileName, content);

      expect(fileSystem.readFile(fileName)).toBe(`${content}\n`);
      expect(rootPath(fileName)).toBe(fileNameWithPath);
    });
  });

  describe('addJsonFileToRoot', () => {
    it('adds json file to root', async () => {
      const fileName = '__test__.json';
      const content = {};

      const fileNameWithPath = rootPath(fileName);

      await addJsonFileToRoot(fileName, content);

      expect(fileSystem.readFile(fileName)).toBe(`${JSON.stringify(content, null, 2)}\n`);
      expect(rootPath(fileName)).toBe(fileNameWithPath);
    });
  });
});
