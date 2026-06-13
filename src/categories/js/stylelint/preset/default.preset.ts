import dedent from 'dedent';
import { prettierMutation } from '#src/categories/js/stylelint/stylelint.service.ts';
import type { Preset } from '#src/categories/js/stylelint/preset/preset.type.ts';

const stylelintConfig: Preset['stylelintConfig'] = {
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
};

const stylelintIgnore = dedent`
  node_modules
  build
  dist
`;

export const defaultPreset: Preset = {
  stylelintConfig,
  stylelintIgnore,
  devDependencies: ['stylelint', 'stylelint-config-standard', 'stylelint-config-clean-order'],
  scripts: [
    { name: 'csslint', script: 'stylelint "src/**/*.css"' },
    { name: 'csslint:fix', script: 'stylelint "src/**/*.css" --fix' },
  ],
  mutations: [prettierMutation],
};
