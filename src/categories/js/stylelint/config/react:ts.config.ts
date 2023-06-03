import { readableMultilineString } from 'src/utils/string';
import { prettierMutation } from '../stylelint.utils';
import { Config } from './config.interface';

const stylelintConfig: Config['stylelintConfig'] = {
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
  overrides: [
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      customSyntax: 'postcss-styled-syntax',
    },
  ],
};

const stylelintIgnore = readableMultilineString`
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
