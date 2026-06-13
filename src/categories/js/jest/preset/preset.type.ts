import type { NpmScript } from '#src/services/npm.service.ts';

export type Preset = {
  devDependencies: string[];
  scripts: NpmScript[];
  configFileContent: string;
};
