/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['<rootDir>', 'node_modules'],
  testRegex: '.*\.(spec|test)\.ts$',

  // for esm modules
  moduleNameMapper: {
    '^(.+?)\.js$': '$1',
  },
};