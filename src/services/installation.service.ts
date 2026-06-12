import { existsInRoot } from '#src/services/root.service.ts';

type InstalledCheck = () => Promise<boolean>;

type InstallationContext = {
  selectedInstallOptions: string[];
};

const installationContext: InstallationContext = {
  selectedInstallOptions: [],
};

export const setSelectedInstallOptions = (options: string[]) => {
  installationContext.selectedInstallOptions = [...options];
};

export const getSelectedInstallOptions = () => [...installationContext.selectedInstallOptions];

export const isSelectedForInstall = (option: string) => {
  return getSelectedInstallOptions().includes(option);
};

export const createInstalledCheck = (option: string, additionalChecks: InstalledCheck[] = []) => {
  return async () => {
    const checks = [async () => isSelectedForInstall(option), ...additionalChecks];

    for (const check of checks) {
      if (await check()) {
        return true;
      }
    }

    return false;
  };
};

export const createRootInstalledCheck = (
  option: string,
  relativePath: string,
  additionalChecks: InstalledCheck[] = [],
) => {
  return createInstalledCheck(option, [() => existsInRoot(relativePath), ...additionalChecks]);
};
