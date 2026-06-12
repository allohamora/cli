import { fileSystem, installationState } from '#__tests__/setup-test-context.ts';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createInstalledCheck,
  createRootInstalledCheck,
  getSelectedInstallOptions,
  isSelectedForInstall,
  setSelectedInstallOptions,
} from '#src/services/installation.service.ts';

describe('installation.service', () => {
  beforeEach(() => {
    setSelectedInstallOptions([]);
  });

  describe('getSelectedInstallOptions', () => {
    it('returns empty array if not set', () => {
      expect(getSelectedInstallOptions()).toEqual([]);
    });
  });

  describe('setSelectedInstallOptions and getSelectedInstallOptions', () => {
    it('sets and gets selected install options', () => {
      const selectedInstallOptions = ['__test__'];

      setSelectedInstallOptions(selectedInstallOptions);

      expect(getSelectedInstallOptions()).toEqual(selectedInstallOptions);
    });
  });

  describe('isSelectedForInstall', () => {
    const selectedOption = '__test__';
    const notSelectedOption = 'undefined';

    beforeEach(() => {
      installationState.setSelectedInstallOptions([selectedOption]);
    });

    it('returns true if the option was selected for installation', () => {
      expect(isSelectedForInstall(selectedOption)).toBe(true);
    });

    it('returns false if the option was not selected for installation', () => {
      expect(isSelectedForInstall(notSelectedOption)).toBe(false);
    });
  });

  describe('createInstalledCheck', () => {
    const selectedOption = '__test__';
    const notSelectedOption = 'undefined';

    beforeEach(() => {
      installationState.setSelectedInstallOptions([selectedOption]);
    });

    it('returns true if the option was selected for installation', async () => {
      expect(await createInstalledCheck(selectedOption)()).toBe(true);
    });

    it('returns false if the option was not selected and additional checks are undefined', async () => {
      expect(await createInstalledCheck(notSelectedOption)()).toBe(false);
    });

    it('executes checks until one returns true if the option was not selected for installation', async () => {
      const firstCheck = vi.fn().mockResolvedValueOnce(true);
      const secondCheck = vi.fn().mockResolvedValueOnce(true);

      const actual = await createInstalledCheck(notSelectedOption, [firstCheck, secondCheck])();

      expect(firstCheck).toHaveBeenCalled();
      expect(secondCheck).not.toHaveBeenCalled();
      expect(actual).toBe(true);
    });

    it('returns false if no checks return true', async () => {
      const firstCheck = vi.fn().mockResolvedValueOnce(false);
      const secondCheck = vi.fn().mockResolvedValueOnce(false);

      const actual = await createInstalledCheck(notSelectedOption, [firstCheck, secondCheck])();

      expect(firstCheck).toHaveBeenCalled();
      expect(secondCheck).toHaveBeenCalled();
      expect(actual).toBe(false);
    });
  });

  describe('createRootInstalledCheck', () => {
    const selectedOption = '__test__';
    const notSelectedOption = 'undefined';
    const configFile = '__test__.json';

    beforeEach(() => {
      installationState.setSelectedInstallOptions([selectedOption]);
    });

    it('adds existsInRoot check', async () => {
      fileSystem.writeFile(configFile, '');

      expect(await createRootInstalledCheck(notSelectedOption, configFile)()).toBe(true);
    });

    it('adds additional checks', async () => {
      const nextCheck = vi.fn().mockResolvedValue(true);

      const actual = await createRootInstalledCheck(notSelectedOption, configFile, [nextCheck])();

      expect(nextCheck).toHaveBeenCalled();
      expect(actual).toBe(true);
    });

    it('returns true if the option was selected for installation and does not execute checks', async () => {
      const nextCheck = vi.fn().mockResolvedValue(true);

      const actual = await createRootInstalledCheck(selectedOption, configFile, [nextCheck])();

      expect(nextCheck).not.toHaveBeenCalled();
      expect(actual).toBe(true);
    });
  });
});
