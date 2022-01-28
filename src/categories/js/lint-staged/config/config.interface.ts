export type LintStagedConfig = Record<string, unknown>;
export type Mutator = (config: LintStagedConfig) => Promise<void>;

export interface Config {
  config: LintStagedConfig;
  mutators: Mutator[];
}
