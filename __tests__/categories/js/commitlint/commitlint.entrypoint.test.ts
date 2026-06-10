import { configState, fileSystem, terminal } from '#__tests__/setup-test-context.ts';
import { defaultConfig } from '#src/categories/js/commitlint/config/default.config.ts';
import { commitlint } from '#src/categories/js/commitlint/commitlint.entrypoint.ts';

beforeEach(() => {
  configState.setConfig('default');
  fileSystem.seed({ dirs: ['.husky'] });
});

describe('commitlint', () => {
  test('installs commitlint packages, writes config, and adds husky hook', async () => {
    await commitlint();

    expect(terminal.getCommands()).toEqual([['npm', ['i', '-D', '@commitlint/cli', defaultConfig.rules]]]);
    expect(fileSystem.readJson('.commitlintrc.json')).toEqual(defaultConfig.config);
    expect(fileSystem.readFile('.husky/commit-msg')).toBe('npx --no-install -- commitlint --edit "$1"\n');
  });
});
