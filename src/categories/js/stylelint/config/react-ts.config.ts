import dedent from 'dedent';
import { prettierMutation } from '#src/categories/js/stylelint/stylelint.service.ts';
import type { Config } from '#src/categories/js/stylelint/config/config.interface.ts';

const stylelintConfig: Config['stylelintConfig'] = {
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
  overrides: [
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      customSyntax: 'postcss-styled-syntax',
    },
  ],
};

const stylelintIgnore = dedent`
  node_modules
  .next
  build
  dist
`;

export const reactTsConfig: Config = {
  stylelintConfig,
  stylelintIgnore,
  devDependencies: ['stylelint', 'stylelint-config-standard', 'stylelint-config-clean-order', 'postcss-styled-syntax'],
  scripts: [
    { name: 'csslint', script: 'stylelint "src/**/*.{css,ts,tsx}"' },
    { name: 'csslint:fix', script: 'stylelint "src/**/*.{css,ts,tsx}" --fix' },
  ],
  mutations: [prettierMutation],
};
