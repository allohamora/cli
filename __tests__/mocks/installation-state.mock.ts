import { getSelectedInstallOptions, setSelectedInstallOptions } from '#src/services/installation.service.ts';

export class InstallationState {
  public setup() {
    this.reset();
  }

  public clear() {
    this.reset();
  }

  public reset() {
    setSelectedInstallOptions([]);
  }

  public setSelectedInstallOptions(options: string[]) {
    setSelectedInstallOptions(options);
  }

  public getSelectedInstallOptions() {
    return getSelectedInstallOptions();
  }
}
