import type { NpmScript } from '#src/utils/npm.ts';

export type Config = {
  devDependencies: string[];
  scripts: NpmScript[];
  configFileContent: string;
};
