import type { Mutation } from '#src/utils/mutation.utils.ts';

export type EslintConfig = {
  files?: string[];
  languageOptions?: {
    globals?: string[];
    parserOptions?: Record<string, unknown>;
  };
  rules?: Record<string, string | unknown[]>;
};

export type Config = {
  dependencies: string[];
  imports: string[];
  configs: string[];
  ignores?: string[];
  eslintConfig: EslintConfig;
  typescript?: boolean;
  scripts: { name: string; script: string }[];
  mutations: Mutation<Config>[];
};
