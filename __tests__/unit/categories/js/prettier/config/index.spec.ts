import { presetState } from '#__tests__/setup-test-context.ts';
import { getConfig } from '#src/categories/js/prettier/config/index.ts';

describe('prettier/config', () => {
  it('returns the default prettier config for every js variant', () => {
    for (const variant of ['default', 'node:ts', 'react:ts'] as const) {
      presetState.setJsPreset(variant);

      expect(getConfig()).toEqual({
        config: {
          semi: true,
          trailingComma: 'all',
          singleQuote: true,
          printWidth: 120,
          tabWidth: 2,
          overrides: [
            {
              files: '*.yml',
              options: {
                singleQuote: false,
              },
            },
          ],
        },
        ignore: ['dist', 'node_modules', 'public', '.husky', 'package-lock.json', 'coverage'],
        scripts: [
          { name: 'format', script: 'prettier . --check' },
          { name: 'format:fix', script: 'prettier --write .' },
        ],
      });
    }
  });
});
