import type { Mutation } from '#src/utils/mutation.utils.ts';

export type LintStagedConfig = Record<string, string | string[]>;

export type Preset = {
  config: LintStagedConfig;
  mutations: Mutation<LintStagedConfig>[];
};
