# @allohamora/cli

[![npm](https://img.shields.io/npm/v/@allohamora/cli)](https://www.npmjs.com/package/@allohamora/cli)
[![codecov](https://codecov.io/gh/allohamora/cli/branch/master/graph/badge.svg?token=XVDXR2RWTI)](https://codecov.io/gh/allohamora/cli)
![build](https://github.com/allohamora/cli/actions/workflows/build.yml/badge.svg)
![test](https://github.com/allohamora/cli/actions/workflows/test.yml/badge.svg)
![release](https://github.com/allohamora/cli/actions/workflows/release.yml/badge.svg)

is a command line interface what helps you to initialize projects and more

## Usage

```bash
npx @allohamora/cli
```



https://github.com/allohamora/cli/assets/54174661/86239f05-d0e6-426c-b20f-490feded41e2



## Requirements

```json
{
  "node": ">=16.14.2",
  "npm": ">=8.5.0"
}
```

## Categories

| Category              | Description                                             | Options                    |
| --------------------- | ------------------------------------------------------- | -------------------------- |
| [**js**](#js-options) | is a category with scripts to initialize js/ts projects | default, node:ts, react:ts |

## JS Options

| Option               | Description                                                                                                                                                                                                                                                    | Integrations                                                                                                                                                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **commitlint**       | Initialize [commitlint](https://github.com/conventional-changelog/commitlint) with [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) config                                                                                               | [husky](https://github.com/typicode/husky)                                                                                                                                                                                              |
| **eslint**           | Initialize [eslint](https://github.com/eslint/eslint) with config and lint scripts                                                                                                                                                                             | [prettier](https://github.com/prettier/prettier)                                                                                                                                                                                        |
| **stylelint**        | Initialize [stylelint](https://github.com/stylelint/stylelint) with config and lint scripts                                                                                                                                                                    | [prettier](https://github.com/prettier/prettier)                                                                                                                                                                                        |
| **husky**            | Initialize [husky](https://github.com/typicode/husky)                                                                                                                                                                                                          |                                                                                                                                                                                                                                         |
| **lint-staged**      | Initialize [lint-staged](https://github.com/okonet/lint-staged)                                                                                                                                                                                                | [husky](https://github.com/typicode/husky), [jest](https://github.com/facebook/jest), [eslint](https://github.com/eslint/eslint), [prettier](https://github.com/prettier/prettier), [stylelint](https://github.com/stylelint/stylelint) |
| **prettier**         | Initialize [prettier](https://github.com/prettier/prettier) with config and format scripts                                                                                                                                                                     |                                                                                                                                                                                                                                         |
| **release-workflow** | Initialize a github release workflow what creates a release from [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) CHANGELOG.md when you push a tag                                                                   |                                                                                                                                                                                                                                         |
| **standard-version** | Initialize [standard-version](https://github.com/conventional-changelog/standard-version) with the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) config                                                                               |                                                                                                                                                                                                                                         |
| **jest**             | Initialize [jest](https://github.com/facebook/jest) with config and test scripts                                                                                                                                                                               |                                                                                                                                                                                                                                         |
| **docker**           | Initialize [docker](https://github.com/docker) with Dockerfile and .dockerignore files                                                                                                                                                                         |                                                                                                                                                                                                                                         |
| **test-workflow**    | Initialize a github test workflow what runs `npm run test` on each push to github                                                                                                                                                                              |                                                                                                                                                                                                                                         |
| **build-workflow**   | Initialize a github build workflow that runs `npm run build` on each push to github                                                                                                                                                                            |                                                                                                                                                                                                                                         |
| **codecov-workflow** | Initialize a codecov workflow that collects code coverage and send it to codecov. The workflow configured to work in public repositories (without codecov token), to run in private repository you need to modify the workflow and add token in codecov action |                                                                                                                                                                                                                                         |
| **dependabot**       | Initialize github dependabot what manages project dependencies vulnerabilities and opens pull requests with fixes                                                                                                                                              |                                                                                                                                                                                                                                         |

\*_Integrations run only if the package is installing or installed._

## License

CLI is [MIT licensed](/LICENSE).
