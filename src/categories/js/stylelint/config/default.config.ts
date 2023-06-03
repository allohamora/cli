import { readableMultilineString } from 'src/utils/string';
import { prettierMutation } from '../stylelint.utils';
import { Config } from './config.interface';

const stylelintConfig: Config['stylelintConfig'] = {
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
};

const stylelintIgnore = readableMultilineString`
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
