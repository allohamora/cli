import type { NpmScript } from '#src/services/npm.service.ts';

export type Config = {
  devDependencies: string[];
  scripts: NpmScript[];
  configFileContent: string;
};
