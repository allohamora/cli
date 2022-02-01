import { Config } from 'src/categories/js/eslint/config/config.interface';

export const createConfig = ({
  dependencies = [],
  eslintConfig = {},
  scripts = [],
  mutations = [],
}: Partial<Config> = {}) => {
  return { dependencies, eslintConfig, scripts, mutations };
};
