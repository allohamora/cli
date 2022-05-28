import { Mutation } from 'src/utils/mutation';
import { NpmScript } from 'src/utils/npm';

interface StylelintConfig {
  extends: string[];
  plugins: string[];
  rules: Record<string, null | true | [] | [true, Record<string, boolean>]>;
  overrides?: { files: string[]; customSyntax?: string }[];
}

export interface Config {
  devDependencies: string[];
  scripts: NpmScript[];
  stylelintConfig: StylelintConfig;
  stylelintIgnore: string;
  mutations: Mutation<Config>[];
}
