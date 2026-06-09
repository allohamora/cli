import dedent from 'dedent';
import { prettierMutation } from '#src/categories/js/stylelint/stylelint.utils.ts';
import type { Config } from '#src/categories/js/stylelint/config/config.interface.ts';

const stylelintConfig: Config['stylelintConfig'] = {
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
};

const stylelintIgnore = dedent`
  node_modules
  build
  dist
`;

export const defaultConfig: Config = {
  stylelintConfig,
  stylelintIgnore,
  devDependencies: ['stylelint', 'stylelint-config-standard', 'stylelint-config-clean-order'],
  scripts: [
    { name: 'csslint', script: 'stylelint "src/**/*.css"' },
    { name: 'csslint:fix', script: 'stylelint "src/**/*.css" --fix' },
  ],
  mutations: [prettierMutation],
};
