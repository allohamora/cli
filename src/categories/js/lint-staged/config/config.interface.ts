import { Mutation } from 'src/utils/mutation';

export type LintStagedConfig = Record<string, unknown>;

export type Config = {
  config: LintStagedConfig;
  mutations: Mutation<LintStagedConfig>[];
};
