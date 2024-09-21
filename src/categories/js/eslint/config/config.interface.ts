import { Mutation } from 'src/utils/mutation';

export type EslintConfig = {
  files?: string[];
  ignores?: string[];
  languageOptions?: {
    globals?: string[];
    parserOptions?: Record<string, unknown>;
  };
  plugins?: Record<string, string>;
  rules?: Record<string, string | unknown[]>;
};

export type Config = {
  dependencies: string[];
  imports: string[];
  configs: string[];
  eslintConfig: EslintConfig;
  typescript?: boolean;
  scripts: { name: string; script: string }[];
  mutations: Mutation<Config>[];
};
