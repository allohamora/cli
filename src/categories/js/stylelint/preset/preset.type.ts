import type { Mutation } from '#src/utils/mutation.utils.ts';
import type { NpmScript } from '#src/services/npm.service.ts';

type StylelintConfig = {
  extends: string[];
};

export type Preset = {
  devDependencies: string[];
  scripts: NpmScript[];
  stylelintConfig: StylelintConfig;
  stylelintIgnore: string;
  mutations: Mutation<Preset>[];
};
