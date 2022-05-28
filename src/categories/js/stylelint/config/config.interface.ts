import { NpmScript } from 'src/utils/npm';

export interface Config {
  devDependencies: string[];
  scripts: NpmScript[];
  stylelintConfig: string;
  stylelintIgnore: string;
}
