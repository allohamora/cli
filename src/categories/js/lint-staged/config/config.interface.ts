import type { Mutation } from '#src/utils/mutation.ts';

export type LintStagedConfig = Record<string, unknown>;

export type Config = {
  config: LintStagedConfig;
  mutations: Mutation<LintStagedConfig>[];
};
