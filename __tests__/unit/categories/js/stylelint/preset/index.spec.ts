import { presetState } from '#__tests__/setup-test-context.ts';
import { getStylelintPreset } from '#src/categories/js/stylelint/preset/index.ts';
import { describe, expect, it } from 'vitest';

describe('stylelint/preset', () => {
  it.each(['default', 'node:ts'] as const)('returns the default stylelint config for %s', (variant) => {
    presetState.setJsPreset(variant);

    expect(getStylelintPreset()).toMatchObject({
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
    presetState.setJsPreset('react:ts');

    expect(getStylelintPreset()).toMatchObject({
      devDependencies: ['stylelint', 'stylelint-config-standard', 'stylelint-config-clean-order'],
      scripts: [
        { name: 'csslint', script: 'stylelint "src/**/*.css"' },
        { name: 'csslint:fix', script: 'stylelint "src/**/*.css" --fix' },
      ],
      stylelintConfig: {
        extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
      },
      stylelintIgnore: ['node_modules', '.next', 'build', 'dist'].join('\n'),
    });
  });
});
