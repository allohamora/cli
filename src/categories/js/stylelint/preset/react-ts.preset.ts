import dedent from 'dedent';
import { prettierMutation } from '#src/categories/js/stylelint/stylelint.service.ts';
import type { Preset } from '#src/categories/js/stylelint/preset/preset.type.ts';

const stylelintConfig: Preset['stylelintConfig'] = {
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

export const reactTsPreset: Preset = {
  stylelintConfig,
  stylelintIgnore,
  devDependencies: ['stylelint', 'stylelint-config-standard', 'stylelint-config-clean-order', 'postcss-styled-syntax'],
  scripts: [
    { name: 'csslint', script: 'stylelint "src/**/*.{css,ts,tsx}"' },
    { name: 'csslint:fix', script: 'stylelint "src/**/*.{css,ts,tsx}" --fix' },
  ],
  mutations: [prettierMutation],
};
