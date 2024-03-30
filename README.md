# @allohamora/cli

[![npm](https://img.shields.io/npm/v/@allohamora/cli)](https://www.npmjs.com/package/@allohamora/cli)
[![codecov](https://codecov.io/gh/allohamora/cli/branch/master/graph/badge.svg?token=XVDXR2RWTI)](https://codecov.io/gh/allohamora/cli)
![build](https://github.com/allohamora/cli/actions/workflows/build.yml/badge.svg)
![test](https://github.com/allohamora/cli/actions/workflows/test.yml/badge.svg)
![release](https://github.com/allohamora/cli/actions/workflows/release.yml/badge.svg)

is a command line interface with scripts to initialize projects and more

## Requirements

```json
{
  "node": ">=16.14.2",
  "npm": ">=8.5.0"
}
```

## Usage

```bash
npx @allohamora/cli
```

## Categories

| Category              | Description                                             | Options                    |
| --------------------- | ------------------------------------------------------- | -------------------------- |
| [**js**](#js-options) | is a category with scripts to initialize js/ts projects | default, node:ts, react:ts |

## JS Options

| Option               | Description                                                                                                                                                                                                                                                                                                      | Integrations                                                                                                                                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **commitlint**       | Initialize [commitlint](https://github.com/conventional-changelog/commitlint) with [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) config.                                                                                                                                                | [husky](https://github.com/typicode/husky)                                                                                                                                                                                              |
| **eslint**           | Initialize [eslint](https://github.com/eslint/eslint) with config and lint scripts                                                                                                                                                                                                                               | [prettier](https://github.com/prettier/prettier)                                                                                                                                                                                        |
| **stylelint**        | Initialize [stylelint](https://github.com/stylelint/stylelint) with config and lint scripts                                                                                                                                                                                                                      | [prettier](https://github.com/prettier/prettier)                                                                                                                                                                                        |
| **husky**            | Initialize [husky](https://github.com/typicode/husky).                                                                                                                                                                                                                                                           |                                                                                                                                                                                                                                         |
| **lint-staged**      | Initialize [lint-staged](https://github.com/okonet/lint-staged)                                                                                                                                                                                                                                                  | [husky](https://github.com/typicode/husky), [jest](https://github.com/facebook/jest), [eslint](https://github.com/eslint/eslint), [prettier](https://github.com/prettier/prettier), [stylelint](https://github.com/stylelint/stylelint) |
| **prettier**         | Initialize [prettier](https://github.com/prettier/prettier) with config and format scripts.                                                                                                                                                                                                                      |                                                                                                                                                                                                                                         |
| **release-workflow** | Initialize github release workflow what creates release from [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) CHANGELOG.md when you push tag like _._.\* (1.1.0, 5.0.0, 0.0.0, etc).                                                                                   |                                                                                                                                                                                                                                         |
| **standard-version** | Initialize [standard-version](https://github.com/conventional-changelog/standard-version) with [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) config(with repository url if defined or "<repository url>" placeholder), custom options(like removed "v" tag prefix) and release scripts. |                                                                                                                                                                                                                                         |
| **jest**             | Initialize [jest](https://github.com/facebook/jest) with config and test scripts.                                                                                                                                                                                                                                |                                                                                                                                                                                                                                         |
| **docker**           | Initialize [docker](https://github.com/docker) with Dockerfile and .dockerignore files                                                                                                                                                                                                                           |                                                                                                                                                                                                                                         |
| **test-workflow**    | Initialize github test workflow what runs `npm run test` on each push to github.                                                                                                                                                                                                                                 |                                                                                                                                                                                                                                         |
| **build-workflow**   | Initialize github build workflow that runs `npm run build` on each push to github.                                                                                                                                                                                                                               |                                                                                                                                                                                                                                         |
| **codecov-workflow** | Initialize codecov workflow that collects code coverage and send it to codecov. The workflow configured to work in public repositories (without codecov token), to run in private repository you need to modify the workflow and add token in codecov action                                                     |                                                                                                                                                                                                                                         |
| **dependabot**       | Initialize github dependabot what manages project dependencies vulnerabilities and opens pull requests with fixes.                                                                                                                                                                                               |                                                                                                                                                                                                                                         |

\*_Integrations run only if the package is installing or installed._

## License

CLI is [MIT licensed](/LICENSE).
