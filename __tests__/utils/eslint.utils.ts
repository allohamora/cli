import type { Preset } from '#src/categories/js/eslint/preset/preset.type.ts';

export const createConfig = ({
  dependencies = [],
  imports = [],
  configs = [],
  ignores,
  eslintConfig = {},
  typescript = false,
  scripts = [],
  mutations = [],
}: Partial<Preset> = {}) => {
  return { dependencies, imports, configs, ignores, eslintConfig, typescript, scripts, mutations };
};
