import { Mutation } from 'src/utils/mutation';

export type EslintConfig = {
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
    es2020?: boolean;
  };
  root?: boolean;
  ignorePatterns?: string[];
  plugins?: string[];
  extends?: string[];
  rules?: Record<string, string | unknown[]>;
};

export type Config = {
  dependencies: string[];
  eslintConfig: EslintConfig;
  ignore: string[];
  scripts: { name: string; script: string }[];
  mutations: Mutation<Config>[];
};
