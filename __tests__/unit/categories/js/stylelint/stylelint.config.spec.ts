import { configState } from '#__tests__/setup-test-context.ts';
import { getConfig } from '#src/categories/js/stylelint/stylelint.config.ts';

describe('stylelint.config', () => {
  it.each(['default', 'node:ts'] as const)('returns the default stylelint config for %s', (variant) => {
    configState.setConfig(variant);

    expect(getConfig()).toMatchObject({
      devDependencies: ['stylelint', 'stylelint-config-standard', 'stylelint-config-clean-order'],
      scripts: [
        { name: 'csslint', script: 'stylelint "src/**/*.css"' },
        { name: 'csslint:fix', script: 'stylelint "src/**/*.css" --fix' },
      ],
      stylelintConfig: {
        extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
      },
      stylelintIgnore: ['node_modules', 'build', 'dist'].join('\n'),
    });
  });

  it('returns the react typescript stylelint config', () => {
    configState.setConfig('react:ts');

    expect(getConfig()).toMatchObject({
      devDependencies: [
        'stylelint',
        'stylelint-config-standard',
        'stylelint-config-clean-order',
        'postcss-styled-syntax',
      ],
      scripts: [
        { name: 'csslint', script: 'stylelint "src/**/*.{css,ts,tsx}"' },
        { name: 'csslint:fix', script: 'stylelint "src/**/*.{css,ts,tsx}" --fix' },
      ],
      stylelintConfig: {
        extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
        overrides: [
          {
            files: ['**/*.{js,jsx,ts,tsx}'],
            customSyntax: 'postcss-styled-syntax',
          },
        ],
      },
      stylelintIgnore: ['node_modules', '.next', 'build', 'dist'].join('\n'),
    });
  });
});
