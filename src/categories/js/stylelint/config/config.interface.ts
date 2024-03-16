import { Mutation } from 'src/utils/mutation';
import { NpmScript } from 'src/utils/npm';

type StylelintConfig = {
  extends: string[];
  overrides?: { files: string[]; customSyntax?: string }[];
};

export type Config = {
  devDependencies: string[];
  scripts: NpmScript[];
  stylelintConfig: StylelintConfig;
  stylelintIgnore: string;
  mutations: Mutation<Config>[];
};
