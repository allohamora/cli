import { NpmScript } from 'src/utils/npm';

export type Config = {
  devDependencies: string[];
  scripts: NpmScript[];
  configFileContent: string;
};
