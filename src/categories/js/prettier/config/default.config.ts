export const defaultConfig = {
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
};
