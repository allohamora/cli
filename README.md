# @allohamora/cli

[![npm](https://img.shields.io/npm/v/@allohamora/cli)](https://www.npmjs.com/package/@allohamora/cli)
[![codecov](https://codecov.io/gh/allohamora/cli/branch/master/graph/badge.svg?token=XVDXR2RWTI)](https://codecov.io/gh/allohamora/cli)
![check](https://github.com/allohamora/cli/actions/workflows/check.yml/badge.svg)
![test](https://github.com/allohamora/cli/actions/workflows/test.yml/badge.svg)
![release](https://github.com/allohamora/cli/actions/workflows/release.yml/badge.svg)

is a command line interface that helps you to initialize projects and more

## Usage

```bash
npx @allohamora/cli
```

<video src="https://github.com/allohamora/cli/assets/54174661/86239f05-d0e6-426c-b20f-490feded41e2"></video>

## Requirements

```json
{
  "node": ">=24.14.1",
  "npm": ">=11.11.0"
}
```

## Categories

| Category              | Description                                   | Presets                          |
| --------------------- | --------------------------------------------- | -------------------------------- |
| [**js**](#js-options) | contains options to initialize js/ts projects | `default`, `node:ts`, `react:ts` |

## JS Options

| Option               | Description                                                                                                                                                                                       | Integrations                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **commitlint**       | sets up [commitlint](https://github.com/conventional-changelog/commitlint) with the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) config                                 | `husky`                                            |
| **eslint**           | sets up [eslint](https://github.com/eslint/eslint) with a config and lint scripts                                                                                                                 | `prettier`, `jest`                                 |
| **stylelint**        | sets up [stylelint](https://github.com/stylelint/stylelint) with a config and lint scripts                                                                                                        | `prettier`                                         |
| **husky**            | sets up [husky](https://github.com/typicode/husky) that handles git hooks                                                                                                                         |                                                    |
| **lint-staged**      | sets up [lint-staged](https://github.com/okonet/lint-staged) that runs linters on commit                                                                                                          | `husky`, `jest`, `eslint`, `prettier`, `stylelint` |
| **prettier**         | sets up [prettier](https://github.com/prettier/prettier) with a config and format scripts                                                                                                         |                                                    |
| **release-workflow** | sets up a github release workflow that creates a release from the [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) CHANGELOG.md on a tag push           |                                                    |
| **standard-version** | sets up [standard-version](https://github.com/conventional-changelog/standard-version) with the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) config and release scripts |                                                    |
| **jest**             | sets up [jest](https://github.com/facebook/jest) with a config and test scripts                                                                                                                   |                                                    |
| **docker**           | sets up [docker](https://github.com/docker) with Dockerfile and .dockerignore files                                                                                                               |                                                    |
| **npmrc**            | creates a .npmrc file                                                                                                                                                                             |                                                    |
| **nvmrc**            | creates a .nvmrc file from the current node version                                                                                                                                               |                                                    |
| **check-workflow**   | sets up a github check workflow that runs available lint, format, typecheck, and build checks on push                                                                                             | `eslint`, `prettier`, `nvmrc`                      |
| **test-workflow**    | sets up a github test workflow that runs `npm run test` on push                                                                                                                                   | `nvmrc`                                            |
| **codecov-workflow** | sets up a codecov workflow that collects code coverage and sends it to codecov                                                                                                                    | `nvmrc`                                            |
| **dependabot**       | sets up github [dependabot](https://github.com/dependabot) that manages dependencies                                                                                                              |                                                    |
| **editorconfig**     | creates an [.editorconfig](https://editorconfig.org) file                                                                                                                                         |                                                    |

\*_Integrations run only if the package is installing or installed._

## License

@allohamora/cli is [MIT licensed](/LICENSE).
