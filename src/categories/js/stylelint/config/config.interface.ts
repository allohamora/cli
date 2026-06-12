import type { Mutation } from '#src/utils/mutation.utils.ts';
import type { NpmScript } from '#src/utils/npm.ts';

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
