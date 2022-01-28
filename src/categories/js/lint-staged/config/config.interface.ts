import { Mutator } from 'src/utils/mutator';

export type LintStagedConfig = Record<string, unknown>;

export interface Config {
  config: LintStagedConfig;
  mutators: Mutator<LintStagedConfig>[];
}
