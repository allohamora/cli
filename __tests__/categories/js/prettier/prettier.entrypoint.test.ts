import { configState, fileSystem, terminal } from '#__tests__/setup-test-context.ts';
import { defaultConfig } from '#src/categories/js/prettier/config/default.config.ts';
import { prettier } from '#src/categories/js/prettier/prettier.entrypoint.ts';

beforeEach(() => {
  configState.setConfig('default');
});

describe('prettier', () => {
  test('installs prettier and writes the default config files', async () => {
    await prettier();

    expect(terminal.getCommands()).toEqual([['npm', ['i', '-D', 'prettier']]]);
    expect(fileSystem.readJson('.prettierrc')).toEqual(defaultConfig.config);
    expect(fileSystem.readFile('.prettierignore')).toBe(`${defaultConfig.ignore.join('\n')}\n`);
  });

  test('adds prettier scripts to package.json', async () => {
    fileSystem.seed({ packageJson: { scripts: { test: 'vitest' } } });

    await prettier();

    expect(fileSystem.readJson('package.json')).toEqual({
      scripts: {
        test: 'vitest',
        format: 'prettier . --check',
        'format:fix': 'prettier --write .',
      },
    });
  });
});
