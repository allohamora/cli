import * as json from 'src/utils/json';
import fsp from 'node:fs/promises';
import { rootPath } from 'src/utils/path';
import { addDirToRootIfNotExists, addFileToRoot, addJsonFileToRoot, isExistsInRoot } from 'src/utils/fs';

const rootFile = 'hello.json';
const rootDir = 'test';

const root = [rootFile, rootDir];
const rootWithPath = root.map((file) => rootPath(file));

jest.mock('node:fs/promises');
const fspMocked = jest.mocked(fsp);

jest.mock('src/utils/json');
const jsonMocked = jest.mocked(json);

beforeEach(() => {
  jest.clearAllMocks();

  fspMocked.access.mockImplementation(async (path) => {
    const isExists = rootWithPath.includes(path.toString());

    if (!isExists) {
      throw new Error();
    }
  });
});

describe('isExistsInRoot', () => {
  test('should return true if file exists at root', async () => {
    const actual = await isExistsInRoot(rootFile);
    const expected = true;

    expect(actual).toBe(expected);
  });

  test("should return false if file doesn't exist at root", async () => {
    const actual = await isExistsInRoot('__test__.json');
    const expected = false;

    expect(actual).toBe(expected);
  });
});

describe('addDirToRootIfNotExists', () => {
  test("should create dir at root if it doesn't exist", async () => {
    const dir = '__test__';
    const expected = rootPath(dir);

    await addDirToRootIfNotExists(dir);

    expect(fspMocked.mkdir).toHaveBeenCalledWith(expected);
  });

  test('should not create dir at root if it exists', async () => {
    const expected = rootPath(rootDir);

    await addDirToRootIfNotExists(rootDir);

    expect(fspMocked.mkdir).not.toHaveBeenCalled();
    expect(fspMocked.mkdir).not.toHaveBeenCalledWith(expected);
  });
});

describe('addFileToRoot', () => {
  test('should add file to root', async () => {
    const fileName = '__test__.json';
    const content = '__test__';

    const fileNameWithPath = rootPath(fileName);

    await addFileToRoot(fileName, content);

    expect(fspMocked.writeFile).toHaveBeenCalledWith(fileNameWithPath, `${content}\n`, { encoding: 'utf-8' });
  });
});

describe('addJsonFileToRoot', () => {
  test('should add json file to root', async () => {
    const fileName = '__test__.json';
    const content = {};

    const fileNameWithPath = rootPath(fileName);

    await addJsonFileToRoot(fileName, content);

    expect(jsonMocked.stringify).toHaveBeenCalledWith(content);
    expect(fspMocked.writeFile).toHaveBeenCalledWith(fileNameWithPath, `${json.stringify(content)}\n`, {
      encoding: 'utf-8',
    });
  });
});
