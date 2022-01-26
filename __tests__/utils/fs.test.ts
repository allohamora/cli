import * as json from 'src/utils/json';
import fsp from 'fs/promises';
import { rootPath } from 'src/utils/path';
import { addDirToRootIfNotExists, addFileToRoot, addJsonFileToRoot, existsInRoot } from 'src/utils/fs';

const rootFile = 'hello.json';
const rootDir = 'test';

const root = [rootFile, rootDir];
const rootWithPath = root.map((file) => rootPath(file));

jest.mock('fs/promises');
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

describe('existsInRoot', () => {
  test('should return true if file exists at root', async () => {
    const actual = await existsInRoot(rootFile);
    const expected = true;

    expect(actual).toBe(expected);
  });

  test("should return false if file doesn't exist at root", async () => {
    const actual = await existsInRoot('__test__.json');
    const expected = false;

    expect(actual).toBe(expected);
  });
});

describe('addDirToRootIfNotExists', () => {
  test("should create dir at root if it doesn't exist", async () => {
    const dir = '__test__';
    const expected = rootPath(dir);

    await addDirToRootIfNotExists(dir);

    expect(fspMocked.mkdir).toBeCalledWith(expected);
  });

  test('should not create dir at root if it exists', async () => {
    const expected = rootPath(rootDir);

    await addDirToRootIfNotExists(rootDir);

    expect(fspMocked.mkdir).not.toBeCalled();
    expect(fspMocked.mkdir).not.toBeCalledWith(expected);
  });
});

describe('addFileToRoot', () => {
  test('should add file to root', async () => {
    const fileName = '__test__.json';
    const content = '__test__';

    const fileNameWithPath = rootPath(fileName);

    await addFileToRoot(fileName, content);

    expect(fspMocked.writeFile).toBeCalledWith(fileNameWithPath, content, { encoding: 'utf-8' });
  });
});

describe('addJsonFileToRoot', () => {
  test('should add json file to root', async () => {
    const fileName = '__test__.json';
    const content = {};

    const fileNameWithPath = rootPath(fileName);

    await addJsonFileToRoot(fileName, content);

    expect(jsonMocked.stringify).toBeCalledWith(content);
    expect(fspMocked.writeFile).toBeCalledWith(fileNameWithPath, json.stringify(content), {
      encoding: 'utf-8',
    });
  });
});
