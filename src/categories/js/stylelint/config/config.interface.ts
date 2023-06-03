import { Mutation } from 'src/utils/mutation';
import { NpmScript } from 'src/utils/npm';

interface StylelintConfig {
  extends: string[];
  overrides?: { files: string[]; customSyntax?: string }[];
}

export interface Config {
  devDependencies: string[];
  scripts: NpmScript[];
  stylelintConfig: StylelintConfig;
  stylelintIgnore: string;
  mutations: Mutation<Config>[];
}
