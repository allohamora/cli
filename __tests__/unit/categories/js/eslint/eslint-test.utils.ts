import type { Config } from '#src/categories/js/eslint/config/config.interface.ts';

export const createConfig = ({
  dependencies = [],
  imports = [],
  configs = [],
  eslintConfig = {},
  typescript = false,
  scripts = [],
  mutations = [],
}: Partial<Config> = {}) => {
  return { dependencies, imports, configs, eslintConfig, typescript, scripts, mutations };
};
