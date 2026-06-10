import path from 'node:path';
import { rootPath, ROOT_PATH } from '#src/utils/path.ts';

describe('path', () => {
  describe('PATHS', () => {
    it('ROOT_PATH is process.cwd()', () => {
      const actual = ROOT_PATH;
      const expected = process.cwd();

      expect(actual).toBe(expected);
    });
  });

  describe('rootPath', () => {
    it('returns joined path with ROOT_PATH', () => {
      const pathToJoin = '__test__';

      const actual = rootPath(pathToJoin);
      const expected = path.join(ROOT_PATH, pathToJoin);

      expect(actual).toBe(expected);
    });

    it('returns joined paths with ROOT_PATH', () => {
      const pathsToJoin = ['__test__', '__test2__'];

      const actual = rootPath(...pathsToJoin);
      const expected = path.join(ROOT_PATH, ...pathsToJoin);

      expect(actual).toBe(expected);
    });
  });
});
