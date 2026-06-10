import { configState, fileSystem, terminal } from '#__tests__/setup-test-context.ts';
import { defaultConfig } from '#src/categories/js/jest/config/default.config.ts';
import { jestEntrypoint } from '#src/categories/js/jest/jest.entrypoint.ts';

beforeEach(() => {
  configState.setConfig('default');
});

describe('jest', () => {
  test('installs jest dependencies and writes the default config file', async () => {
    await jestEntrypoint();

    expect(terminal.getCommands()).toEqual([['npm', ['i', '-D', ...defaultConfig.devDependencies]]]);
    expect(fileSystem.readFile('jest.config.cjs')).toBe(`${defaultConfig.configFileContent}\n`);
  });

  test('adds test scripts to package.json', async () => {
    fileSystem.seed({ packageJson: { scripts: { lint: 'eslint "**/*.js"' } } });

    await jestEntrypoint();

    expect(fileSystem.readJson('package.json')).toEqual({
      scripts: {
        lint: 'eslint "**/*.js"',
        test: 'jest',
        'test:watch': 'jest --watch',
        'test:coverage': 'jest --coverage',
      },
    });
  });
});
