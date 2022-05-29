import path from 'node:path';
import { PACKAGE_JSON_PATH, rootPath, ROOT_PATH } from 'src/utils/path';

describe('PATHS', () => {
  test('ROOT_PATH should be proccess.cwd()', () => {
    const actual = ROOT_PATH;
    const expected = process.cwd();

    expect(actual).toBe(expected);
  });

  test('PACKAGE_JSON_PATH should be ROOT_PATH/package.json', () => {
    const actual = PACKAGE_JSON_PATH;
    const expected = path.join(ROOT_PATH, 'package.json');

    expect(actual).toBe(expected);
  });
});

describe('rootPath', () => {
  test('should return joined path with ROOT_PATH', () => {
    const pathToJoin = '__test__';

    const actual = rootPath(pathToJoin);
    const expected = path.join(ROOT_PATH, pathToJoin);

    expect(actual).toBe(expected);
  });

  test('should return joined paths with ROOT_PATH', () => {
    const pathsToJoin = ['__test__', '__test2__'];

    const actual = rootPath(...pathsToJoin);
    const expected = path.join(ROOT_PATH, ...pathsToJoin);

    expect(actual).toBe(expected);
  });
});
