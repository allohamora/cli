import fsp from 'fs/promises';
import { rootPath } from 'src/utils/path';
import { addDirToRootIfNotExists, addFileToRoot, addJsonFileToRoot, existsInRoot } from 'src/utils/fs';
import { mockObject } from '__tests__/test-utils/mock-object';

const rootFile = 'hello.json';
const rootDir = 'test';

const root = [rootFile, rootDir];
const rootWithPath = root.map((file) => rootPath(file));

jest.mock('fs/promises');
const fspMocked = jest.mocked(fsp);

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
  test('returns true if file exists at root', async () => {
    const actual = await existsInRoot(rootFile);
    const expected = true;

    expect(actual).toBe(expected);
  });

  test("returns false if file doesn't exist at root", async () => {
    const actual = await existsInRoot('__test__.json');
    const expected = false;

    expect(actual).toBe(expected);
  });
});

describe('addDirToRootIfNotExists', () => {
  test("creates dir at root if it doesn't exist", async () => {
    const dir = '__test__';
    const expected = rootPath(dir);

    await addDirToRootIfNotExists(dir);

    expect(fspMocked.mkdir).toBeCalledWith(expected);
  });

  test("doesn't create dir at root if it exists", async () => {
    const expected = rootPath(rootDir);

    await addDirToRootIfNotExists(rootDir);

    expect(fspMocked.mkdir).not.toBeCalled();
    expect(fspMocked.mkdir).not.toBeCalledWith(expected);
  });
});

describe('addFileToRoot', () => {
  test('adds file to root', async () => {
    const fileName = '__test__.json';
    const content = '__test__';

    const fileNameWithPath = rootPath(fileName);

    await addFileToRoot(fileName, content);

    expect(fspMocked.writeFile).toBeCalledWith(fileNameWithPath, content, { encoding: 'utf-8' });
  });
});

describe('addJsonFileToRoot', () => {
  const originalJSON = JSON;

  beforeEach(() => {
    global.JSON = mockObject({
      stringify: jest.fn((...args: Parameters<JSON['stringify']>) => originalJSON.stringify(...args)),
    }) as unknown as JSON;
  });

  afterAll(() => {
    global.JSON = originalJSON;
  });

  test('adds json file to root', async () => {
    const fileName = '__test__.json';
    const content = {};

    const fileNameWithPath = rootPath(fileName);

    await addJsonFileToRoot(fileName, content);

    expect(global.JSON.stringify).toBeCalledWith(content, null, 2);
    expect(fspMocked.writeFile).toBeCalledWith(fileNameWithPath, originalJSON.stringify(content), {
      encoding: 'utf-8',
    });
  });
});
