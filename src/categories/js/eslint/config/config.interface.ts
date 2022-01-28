import { Mutator } from 'src/utils/mutator';

export interface EslintConfig {
  parser?: string;
  parserOptions?: {
    project?: string;
    ecmaVersion?: string;
    sourceType?: string;
  };
  env?: {
    es6?: boolean;
    node?: boolean;
    browser?: boolean;
    jest?: boolean;
  };
  root?: boolean;
  ignorePatterns?: string[];
  plugins?: string[];
  extends?: string[];
  rules?: Record<string, string | unknown[]>;
}

export interface Config {
  dependencies: string[];
  eslintConfig: EslintConfig;
  scripts: { name: string; script: string }[];
  mutators: Mutator<Config>[];
}
