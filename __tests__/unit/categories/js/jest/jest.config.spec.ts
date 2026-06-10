import { configState } from '#__tests__/setup-test-context.ts';
import { getConfig } from '#src/categories/js/jest/jest.config.ts';
import { parse } from '#__tests__/test-utils/cjs-module.ts';

const scripts = [
  { name: 'test', script: 'jest' },
  { name: 'test:watch', script: 'jest --watch' },
  { name: 'test:coverage', script: 'jest --coverage' },
];

const defaultJestConfigFile = [
  `/** @type {import('jest').Config} */`,
  'module.exports = {',
  `  testEnvironment: 'node',`,
  `  testRegex: '.*\\\\.(spec|test)\\\\.js$',`,
  `  collectCoverageFrom: ['src/**/*.js'],`,
  '  passWithNoTests: true,',
  '};',
].join('\n');

const nodeTsJestConfigFile = [
  `/** @type {import('ts-jest').JestConfigWithTsJest} */`,
  'module.exports = {',
  `  preset: 'ts-jest',`,
  `  testEnvironment: 'node',`,
  `  moduleDirectories: ['<rootDir>', 'node_modules'],`,
  `  testRegex: '.*\\\\.(spec|test)\\\\.ts$',`,
  `  collectCoverageFrom: ['src/**/*.ts'],`,
  '  passWithNoTests: true,',
  '};',
].join('\n');

const reactTsJestConfigFile = [
  `/** @type {import('ts-jest').JestConfigWithTsJest} */`,
  'module.exports = {',
  `  roots: ['<rootDir>'],`,
  `  testEnvironment: 'jsdom',`,
  `  testRegex: '.*\\\\.(spec|test)\\\\.ts$',`,
  '  transform: {',
  `    '^.+\\\\.(ts|tsx)$': 'ts-jest',`,
  '  },',
  `  moduleDirectories: ['<rootDir>', 'node_modules'],`,
  `  testRegex: '.*\\\\.(spec|test)\\\\.tsx?$',`,
  `  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],`,
  '  moduleNameMapper: {',
  `    '\\.(css|less|sass|scss|gif|ttf|eot|svg|png)$': 'identity-obj-proxy'`,
  '  },',
  '  passWithNoTests: true,',
  '};',
].join('\n');

describe('jest.config', () => {
  it('returns the default javascript jest config', () => {
    expect(getConfig()).toEqual({
      devDependencies: ['jest', '@types/jest'],
      configFileContent: defaultJestConfigFile,
      scripts,
    });
  });

  it('returns the node typescript jest config', () => {
    configState.setConfig('node:ts');

    expect(getConfig()).toEqual({
      devDependencies: ['jest', '@types/jest', 'ts-jest'],
      configFileContent: nodeTsJestConfigFile,
      scripts,
    });
  });

  it('returns the react typescript jest config', () => {
    configState.setConfig('react:ts');

    expect(getConfig()).toEqual({
      devDependencies: [
        'jest',
        '@types/jest',
        'ts-jest',
        'jest-environment-jsdom',
        '@testing-library/react',
        'identity-obj-proxy',
      ],
      configFileContent: reactTsJestConfigFile,
      scripts,
    });
  });

  it.each([
    ['default', defaultJestConfigFile],
    ['node:ts', nodeTsJestConfigFile],
    ['react:ts', reactTsJestConfigFile],
  ] as const)('returns parseable config content for %s', (variant, configFile) => {
    configState.setConfig(variant);

    const parsed = parse(getConfig().configFileContent);

    expect(getConfig().configFileContent).toBe(configFile);
    expect(parsed.module.exports).toBeDefined();
    expect(typeof parsed.module.exports).toBe('object');
  });
});
