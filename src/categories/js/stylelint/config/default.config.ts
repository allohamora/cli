import { readableMultilineString } from 'src/utils/string';
import { Config } from './config.interface';

const stylelintConfig = readableMultilineString`
  {
    "extends": [
      "stylelint-config-standard",
      "stylelint-config-rational-order-fix"
    ],
    "plugins": [
      "stylelint-order",
      "stylelint-config-rational-order-fix/plugin"
    ],
    "rules": {
      "declaration-empty-line-before": null,
      "no-empty-first-line": null,  
      "order/properties-order": [],
      "plugin/rational-order": [true, {
        "border-in-box-model": false,
        "empty-line-between-groups": false
      }]
    }
  }
`;

const stylelintIgnore = readableMultilineString`
  node_modules
  build
  dist
`;

export const defaultConfig: Config = {
  stylelintConfig,
  stylelintIgnore,
  devDependencies: ['stylelint', 'stylelint-config-standard', 'stylelint-order', 'stylelint-config-rational-order-fix'],
  scripts: [
    { name: 'csslint', script: 'stylelint "src/**/*.css"' },
    { name: 'csslint:fix', script: 'stylelint "src/**/*.css" --fix' },
  ],
};
