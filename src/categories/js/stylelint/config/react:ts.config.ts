import { readableMultilineString } from 'src/utils/string';
import { prettierMutation } from '../stylelint.utils';
import { Config } from './config.interface';

const stylelintConfig: Config['stylelintConfig'] = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order-fix'],
  plugins: ['stylelint-order', 'stylelint-config-rational-order-fix/plugin'],
  rules: {
    'declaration-empty-line-before': null,
    'no-empty-first-line': null,
    'order/properties-order': [],
    'plugin/rational-order': [
      true,
      {
        'border-in-box-model': false,
        'empty-line-between-groups': false,
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      customSyntax: '@stylelint/postcss-css-in-js',
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
  devDependencies: [
    'stylelint',
    'stylelint-config-standard',
    'stylelint-order',
    'stylelint-config-rational-order-fix',
    '@stylelint/postcss-css-in-js',
  ],
  scripts: [
    { name: 'csslint', script: 'stylelint "src/**/*.{css,js,jsx,ts,tsx}"' },
    { name: 'csslint:fix', script: 'stylelint "src/**/*.{css,js,jsx,ts,tsx}" --fix' },
  ],
  mutations: [prettierMutation],
};
