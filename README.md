# CLI

The [Allohamora](https://github.com/Allohamora) CLI is a command line interface with scripts to initialize projects and more. Sorted by categories.

## Requirements

```json
{
  "node": "^16.13.0",
  "npm": "^8.1.0"
}
```

## Usage

```bash
npx @allohamora/cli
```

## Overview

- [**js**](/src/categories/js/index.ts) is a category with scripts to initialize js/ts projects, have default and node:ts config options.
  - [**commitlint**](/src/categories/js/commitlint.ts) is a script to initialize [commitlint](https://github.com/conventional-changelog/commitlint) with [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) config.
  - [**eslint**](/src/categories/js/eslint.ts) is a script to initialize [eslint](https://github.com/eslint/eslint) with [prettier-plugin](https://github.com/prettier/eslint-plugin-prettier), config and lint scripts.
  - [**husky**](/src/categories/js/husky.ts) is a script to initialize [husky](https://github.com/typicode/husky).
  - [**lint-staged**](/src/categories/js/lint-staged.ts) is a script to initialize [lint-staged](https://github.com/okonet/lint-staged) with [eslint](https://github.com/eslint/eslint) linting, [prettier](https://github.com/prettier/prettier) formating and [husky](https://github.com/typicode/husky) pre-commit hook.
  - [**prettier**](/src/categories/js/prettier.ts) is a script to initialize [prettier](https://github.com/prettier/prettier) with config and format scripts.
  - [**release-workflow**](/src/categories/js/release-worflow.ts) is script to initialize github release workflow what creates release from [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) CHANGELOG.md when you push tag like \*.\*.\*(1.1.0, 5.0.0, 0.0.0, etc).
  - [**standard-version**](/src/categories/js/standard-verstion.ts) is a script to initialize [standard-version](https://github.com/conventional-changelog/standard-version) with [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) config, custom options (like removed "v" tag prefix) and release scripts.
  - [**jest**](/src/categories/js/jest.ts) is a script to initialize [jest](https://github.com/facebook/jest) with config and test scripts.
  - [**test-workflow**](/src/categories/js/test-workflow.ts) is a script to initialize github test workflow what runs test on each push to github.

## License

CLI is [MIT licensed](/LICENSE).
