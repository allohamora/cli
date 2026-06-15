export const defaultPreset = {
  config: {
    semi: true,
    trailingComma: 'all',
    singleQuote: true,
    printWidth: 120,
    tabWidth: 2,
  },
  ignore: ['dist', 'node_modules', 'public', '.husky', 'package-lock.json', 'coverage'],
  scripts: [
    { name: 'format', script: 'prettier . --check' },
    { name: 'format:fix', script: 'prettier --write .' },
  ],
};
