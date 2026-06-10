import { configState, fileSystem, terminal } from '#__tests__/setup-test-context.ts';
import { defaultConfig } from '#src/categories/js/stylelint/config/default.config.ts';
import { stylelint } from '#src/categories/js/stylelint/stylelint.entrypoint.ts';
import { stringify } from '#src/utils/json.ts';

describe('stylelint.entrypoint', () => {
  beforeEach(() => {
    configState.setConfig('default');
  });

  describe('stylelint', () => {
    it('installs default dependencies and writes stylelint files', async () => {
      await stylelint();

      expect(terminal.getCommands()).toEqual([['npm', ['i', '-D', ...defaultConfig.devDependencies]]]);
      expect(fileSystem.readFile('.stylelintrc')).toBe(`${stringify(defaultConfig.stylelintConfig)}\n`);
      expect(fileSystem.readFile('.stylelintignore')).toBe(`${defaultConfig.stylelintIgnore}\n`);
    });

    it('adds default scripts to package.json', async () => {
      fileSystem.seed({ packageJson: { scripts: { test: 'vitest' } } });

      await stylelint();

      expect(fileSystem.readJson('package.json')).toEqual({
        scripts: {
          test: 'vitest',
          csslint: 'stylelint "src/**/*.css"',
          'csslint:fix': 'stylelint "src/**/*.css" --fix',
        },
      });
    });
  });
});
