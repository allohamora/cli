import { contextState, fileSystem } from '#__tests__/setup-test-context.ts';
import { isInstalled, isInstalledAndInRootCheck, isInstalling } from '#src/utils/installed.ts';

const installingScript = '__test__';
const notInstallingScript = 'undefined';
const installing = [installingScript];

beforeEach(() => {
  contextState.setInstalling(installing);
});

describe('isInstalling', () => {
  test('should return true if installing', () => {
    const actual = isInstalling(installingScript);
    const expected = true;

    expect(actual).toBe(expected);
  });

  test('should return false is not installing', () => {
    const actual = isInstalling(notInstallingScript);
    const expected = false;

    expect(actual).toBe(expected);
  });
});

describe('isInstalled', () => {
  test('should return true is installing', async () => {
    const actual = await isInstalled(installingScript)();
    const expected = true;

    expect(actual).toBe(expected);
  });

  test('should return false is not installing and additional handlers is undefined', async () => {
    const actual = await isInstalled(notInstallingScript)();
    const expected = false;

    expect(actual).toBe(expected);
  });

  test('should execute handlers until one of returns true if script is not installing', async () => {
    const firstHandler = vi.fn().mockResolvedValueOnce(true);
    const secondHandler = vi.fn().mockResolvedValueOnce(true);

    const actual = await isInstalled(notInstallingScript, [firstHandler, secondHandler])();
    const expected = true;

    expect(firstHandler).toHaveBeenCalled();
    expect(secondHandler).not.toHaveBeenCalled();
    expect(actual).toBe(expected);
  });

  test('should return false if no one of handlers return true', async () => {
    const firstHandler = vi.fn().mockResolvedValueOnce(false);
    const secondHandler = vi.fn().mockResolvedValueOnce(false);

    const actual = await isInstalled(notInstallingScript, [firstHandler, secondHandler])();
    const expected = false;

    expect(firstHandler).toHaveBeenCalled();
    expect(secondHandler).toHaveBeenCalled();
    expect(actual).toBe(expected);
  });
});

describe('isInstalledAndInRootCheck', () => {
  const configFile = '__test__.json';

  test('should add isExistsInRoot handler', async () => {
    fileSystem.writeFile(configFile, '');

    const actual = await isInstalledAndInRootCheck(notInstallingScript, configFile)();
    const expected = true;

    expect(actual).toBe(expected);
  });

  test('should add additional handlers', async () => {
    const nextHandler = vi.fn().mockResolvedValue(true);

    const actual = await isInstalledAndInRootCheck(notInstallingScript, configFile, [nextHandler])();
    const expected = true;

    expect(nextHandler).toHaveBeenCalled();
    expect(actual).toBe(expected);
  });

  test('should return true if installing and do not execute handlers', async () => {
    const nextHandler = vi.fn().mockResolvedValue(true);

    const actual = await isInstalledAndInRootCheck(installingScript, configFile, [nextHandler])();
    const expected = true;

    expect(nextHandler).not.toHaveBeenCalled();
    expect(actual).toBe(expected);
  });
});
