import { Config } from 'src/categories/js/eslint/config/config.interface';

export const createConfig = ({
  dependencies = [],
  eslintConfig = {},
  ignore = [],
  scripts = [],
  mutations = [],
}: Partial<Config> = {}) => {
  return { dependencies, eslintConfig, ignore, scripts, mutations };
};
