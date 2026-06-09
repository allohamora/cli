import type { Mutation } from '#src/utils/mutation.ts';

export type LintStagedConfig = Record<string, string | string[]>;

export type Config = {
  config: LintStagedConfig;
  mutations: Mutation<LintStagedConfig>[];
};
