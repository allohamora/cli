# CLI

![build](https://github.com/allohamora/cli/actions/workflows/build.yml/badge.svg)
![codeql](https://github.com/allohamora/cli/actions/workflows/codeql.yml/badge.svg)
![test](https://github.com/allohamora/cli/actions/workflows/test.yml/badge.svg)
![release](https://github.com/allohamora/cli/actions/workflows/release.yml/badge.svg)
[![codecov](https://codecov.io/gh/allohamora/cli/branch/master/graph/badge.svg?token=XVDXR2RWTI)](https://codecov.io/gh/allohamora/cli)
[![npm](https://www.npmjs.com/package/@allohamora/cli)](https://img.shields.io/npm/v/@allohamora/cli)

The [Allohamora](https://github.com/allohamora) CLI is a command line interface with scripts to initialize projects and more. Sorted by categories.

## Requirements

```json
{
  "node": ">=16.13.0",
  "npm": ">=8.1.0"
}
```

## Usage

```bash
npx @allohamora/cli
```

## Overview

- [**js**](/src/categories/js/index.ts) is a category with scripts to initialize js/ts projects, have default and node:ts config options.
  - [**commitlint**](/src/categories/js/commitlint) is a script to initialize [commitlint](https://github.com/conventional-changelog/commitlint) with [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) config. Have [husky](https://github.com/typicode/husky) integration.
  - [**eslint**](/src/categories/js/eslint) is a script to initialize [eslint](https://github.com/eslint/eslint) with config and lint scripts. Have [prettier](https://github.com/prettier/prettier) integration.
  - [**husky**](/src/categories/js/husky) is a script to initialize [husky](https://github.com/typicode/husky).
  - [**lint-staged**](/src/categories/js/lint-staged) is a script to initialize [lint-staged](https://github.com/okonet/lint-staged). Have [husky](https://github.com/typicode/husky), [jest](https://github.com/facebook/jest), [eslint](https://github.com/eslint/eslint), [prettier](https://github.com/prettier/prettier) integrations.
  - [**prettier**](/src/categories/js/prettier) is a script to initialize [prettier](https://github.com/prettier/prettier) with config and format scripts.
  - [**release-workflow**](/src/categories/js/release-worflow) is script to initialize github release workflow what creates release from [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) CHANGELOG.md when you push tag like \*.\*.\*(1.1.0, 5.0.0, 0.0.0, etc).
  - [**standard-version**](/src/categories/js/standard-verstion) is a script to initialize [standard-version](https://github.com/conventional-changelog/standard-version) with [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) config(with repository url if defined or "\<repository url\>" placeholder), custom options(like removed "v" tag prefix) and release scripts.
  - [**jest**](/src/categories/js/jest) is a script to initialize [jest](https://github.com/facebook/jest) with config and test scripts.
  - [**test-workflow**](/src/categories/js/test-workflow.ts) is a script to initialize github test workflow what runs `npm run test` on each push to github.
  - [**build-workflow**](/src/categories/js/build-workflow) is a script to initialize github build workflow that runs `npm run build` on each push to github.
  - [**codeql-workflow**](/src/categories/js/codeql-workflow) is a script to initialize github codeql workflow what runs codeql with default options on each push to github.
  - [**dependabot**](src/categories/js/dependabot/) is a script to initialize github dependabot what manages project dependencies vulnerabilities and opens pull requests with fixes.

\*integrations runs only if package is installing or installed.

## License

CLI is [MIT licensed](/LICENSE).
