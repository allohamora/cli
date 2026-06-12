import { contextState, fileSystem } from '#__tests__/setup-test-context.ts';
import { isInstalled, isInstalledAndInRootCheck, isInstalling } from '#src/utils/installed.ts';

describe('installed', () => {
  const installingScript = '__test__';
  const notInstallingScript = 'undefined';
  const installing = [installingScript];

  beforeEach(() => {
    contextState.setInstalling(installing);
  });

  describe('isInstalling', () => {
    it('returns true if installing', () => {
      const actual = isInstalling(installingScript);
      const expected = true;

      expect(actual).toBe(expected);
    });

    it('returns false if not installing', () => {
      const actual = isInstalling(notInstallingScript);
      const expected = false;

      expect(actual).toBe(expected);
    });
  });

  describe('isInstalled', () => {
    it('returns true if installing', async () => {
      const actual = await isInstalled(installingScript)();
      const expected = true;

      expect(actual).toBe(expected);
    });

    it('returns false if not installing and additional handlers is undefined', async () => {
      const actual = await isInstalled(notInstallingScript)();
      const expected = false;

      expect(actual).toBe(expected);
    });

    it('executes handlers until one of returns true if script is not installing', async () => {
      const firstHandler = vi.fn().mockResolvedValueOnce(true);
      const secondHandler = vi.fn().mockResolvedValueOnce(true);

      const actual = await isInstalled(notInstallingScript, [firstHandler, secondHandler])();
      const expected = true;

      expect(firstHandler).toHaveBeenCalled();
      expect(secondHandler).not.toHaveBeenCalled();
      expect(actual).toBe(expected);
    });

    it('returns false if no one of handlers returns true', async () => {
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

    it('adds existsInRoot handler', async () => {
      fileSystem.writeFile(configFile, '');

      const actual = await isInstalledAndInRootCheck(notInstallingScript, configFile)();
      const expected = true;

      expect(actual).toBe(expected);
    });

    it('adds additional handlers', async () => {
      const nextHandler = vi.fn().mockResolvedValue(true);

      const actual = await isInstalledAndInRootCheck(notInstallingScript, configFile, [nextHandler])();
      const expected = true;

      expect(nextHandler).toHaveBeenCalled();
      expect(actual).toBe(expected);
    });

    it('returns true if installing and does not execute handlers', async () => {
      const nextHandler = vi.fn().mockResolvedValue(true);

      const actual = await isInstalledAndInRootCheck(installingScript, configFile, [nextHandler])();
      const expected = true;

      expect(nextHandler).not.toHaveBeenCalled();
      expect(actual).toBe(expected);
    });
  });
});
