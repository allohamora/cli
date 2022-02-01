import { Mutation } from 'src/utils/mutation';

export type LintStagedConfig = Record<string, unknown>;

export interface Config {
  config: LintStagedConfig;
  mutations: Mutation<LintStagedConfig>[];
}
