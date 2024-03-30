# @allohamora/cli

[![npm](https://img.shields.io/npm/v/@allohamora/cli)](https://www.npmjs.com/package/@allohamora/cli)
[![codecov](https://codecov.io/gh/allohamora/cli/branch/master/graph/badge.svg?token=XVDXR2RWTI)](https://codecov.io/gh/allohamora/cli)
![build](https://github.com/allohamora/cli/actions/workflows/build.yml/badge.svg)
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
  "node": ">=16.14.2",
  "npm": ">=8.5.0"
}
```

## Categories

| Category              | Description                                   | Presets                          |
| --------------------- | --------------------------------------------- | -------------------------------- |
| [**js**](#js-options) | contains options to initialize js/ts projects | `default`, `node:ts`, `react:ts` |

## JS Options

| Option               | Description                                                                                                                                                                                      | Integrations                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| **commitlint**       | setups [commitlint](https://github.com/conventional-changelog/commitlint) with the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) config                                 | `husky`                                            |
| **eslint**           | setups [eslint](https://github.com/eslint/eslint) with a config and lint scripts                                                                                                                 | `prettier`                                         |
| **stylelint**        | setups [stylelint](https://github.com/stylelint/stylelint) with a config and lint scripts                                                                                                        | `prettier`                                         |
| **husky**            | setups [husky](https://github.com/typicode/husky) that handles git hooks                                                                                                                         |                                                    |
| **lint-staged**      | setups [lint-staged](https://github.com/okonet/lint-staged) that runs something on commit                                                                                                        | `husky`, `jest`, `eslint`, `prettier`, `stylelint` |
| **prettier**         | setups [prettier](https://github.com/prettier/prettier) with a config and format scripts                                                                                                         |                                                    |
| **release-workflow** | setups a github release workflow that creates a release from the [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) CHANGELOG.md on a tag push           |                                                    |
| **standard-version** | setups [standard-version](https://github.com/conventional-changelog/standard-version) with the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) config and release scripts |                                                    |
| **jest**             | setups [jest](https://github.com/facebook/jest) with a config and test scripts                                                                                                                   |                                                    |
| **docker**           | setups [docker](https://github.com/docker) with Dockerfile and .dockerignore files                                                                                                               |                                                    |
| **test-workflow**    | setups a github test workflow that runs `npm run test` on push                                                                                                                                   |                                                    |
| **build-workflow**   | setups a github build workflow that runs `npm run build` on push                                                                                                                                 |                                                    |
| **codecov-workflow** | setups a codecov workflow that collects a code coverage and sends it to codecov                                                                                                                  |                                                    |
| **dependabot**       | setups github [dependabot](https://github.com/dependabot) that manages dependencies                                                                                                              |                                                    |

\*_Integrations run only if the package is installing or installed._

## License

@allohamora/cli is [MIT licensed](/LICENSE).
