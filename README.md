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

| Category              | Description                                             | Presets                          |
| --------------------- | ------------------------------------------------------- | -------------------------------- |
| [**js**](#js-options) | is a category with scripts to initialize js/ts projects | `default`, `node:ts`, `react:ts` |

## JS Options

| Option               | Description                                                                                                                                                                           | Integrations                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **commitlint**       | setup [commitlint](https://github.com/conventional-changelog/commitlint) with the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) config                       | `husky`                                            |
| **eslint**           | setup [eslint](https://github.com/eslint/eslint) with a config and lint scripts                                                                                                       | `prettier`                                         |
| **stylelint**        | setup [stylelint](https://github.com/stylelint/stylelint) with a config and lint scripts                                                                                              | `prettier`                                         |
| **husky**            | setup [husky](https://github.com/typicode/husky)                                                                                                                                      |                                                    |
| **lint-staged**      | setup [lint-staged](https://github.com/okonet/lint-staged)                                                                                                                            | `husky`, `jest`, `eslint`, `prettier`, `stylelint` |
| **prettier**         | setup [prettier](https://github.com/prettier/prettier) with a config and format scripts                                                                                               |                                                    |
| **release-workflow** | setup a github release workflow that creates a release from the [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) CHANGELOG.md on a tag push |                                                    |
| **standard-version** | setup [standard-version](https://github.com/conventional-changelog/standard-version) with the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) config           |                                                    |
| **jest**             | setup [jest](https://github.com/facebook/jest) with a config and test scripts                                                                                                         |                                                    |
| **docker**           | setup [docker](https://github.com/docker) with Dockerfile and .dockerignore files                                                                                                     |                                                    |
| **test-workflow**    | setup a github test workflow that runs `npm run test` on each push                                                                                                                    |                                                    |
| **build-workflow**   | setup a github build workflow that runs `npm run build` on each push                                                                                                                  |                                                    |
| **codecov-workflow** | setup a codecov workflow that collects code coverage and sends it to codecov                                                                                                          |                                                    |
| **dependabot**       | setup github [dependabot](https://github.com/dependabot) that manages dependencies                                                                                                    |                                                    |

\*_Integrations run only if the package is installing or installed._

## License

CLI is [MIT licensed](/LICENSE).
