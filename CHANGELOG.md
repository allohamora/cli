# Changelog

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.2.2](https://github.com/allohamora/cli/compare/v2.2.1...v2.2.2) (2026-06-19)

### Chores

- Apply format:fix ([66b6ef2](https://github.com/allohamora/cli/commit/66b6ef2c85ab52c6f0d59b8cb1206161b0d2f1eb))

### Other

- Revert "feat: remove yml override in prettier" ([650257b](https://github.com/allohamora/cli/commit/650257ba8999c111ef8f078e03fbce74fa68db24))

## [2.2.1](https://github.com/allohamora/cli/compare/v2.2.0...v2.2.1) (2026-06-18)

### Features

- Remove . in version description in release workflow ([1c40235](https://github.com/allohamora/cli/commit/1c4023559bfa2819875f3d71a511011d0ef3a48a))

## [2.2.0](https://github.com/allohamora/cli/compare/v2.1.0...v2.2.0) (2026-06-18)

### Features

- Add git-cliff based release workflow ([44ccdd0](https://github.com/allohamora/cli/commit/44ccdd02a88ea0a659b61c0261b832c79f126829))
- Add publish workflow ([7ee8e4e](https://github.com/allohamora/cli/commit/7ee8e4e889c38b565894bfd0dc1029354887cc8a))
- Remove standard-version ([48d8612](https://github.com/allohamora/cli/commit/48d8612cacb84f01e830de467ff41db972aa6b9f))
- Remove css-in-js configs ([05ebffe](https://github.com/allohamora/cli/commit/05ebffef9c172061c0bb5acc05f78b0c3c65609b))
- Add temp-dir ([b99bae4](https://github.com/allohamora/cli/commit/b99bae4b6cf6c405832ece93dff29a645813c5c0))
- Add set-pr-title workflow ([0ba0df4](https://github.com/allohamora/cli/commit/0ba0df4a023d64c09e6ea2bb1e472d9ebb70ff2e))
- Add engines ([b367ee5](https://github.com/allohamora/cli/commit/b367ee5ee99a9f4affbf86979d013945b5f708c8))

### Refactor

- Add option constants ([9c54525](https://github.com/allohamora/cli/commit/9c54525daac2527a0a21da78444ee76be0665928))
- Improve regex in getRepositoryUrl ([7d3994d](https://github.com/allohamora/cli/commit/7d3994de3ee3cef50172e5d74f3854fdc8eccca7))
- Remove relative import in index.ts ([bf50553](https://github.com/allohamora/cli/commit/bf50553fa52acbc67e13475838ede9f27311aa78))
- Call getRepositoryUrl() before other steps ([a53eaab](https://github.com/allohamora/cli/commit/a53eaabe72154db2523863f25eff0daf7027db66))
- Add handling for \r\n in gitignore ([5435ffc](https://github.com/allohamora/cli/commit/5435ffcb022f8bbb7e9587bf9906894beb01c478))
- Add TEMP_DIR_NAME ([4fa511e](https://github.com/allohamora/cli/commit/4fa511e29dd879748c5c768035cbb17120a815a9))

### Documentation

- Add publish workflow to README.md ([09ab90b](https://github.com/allohamora/cli/commit/09ab90ba393c01f6c91363b0d4d92d33c89531f6))

### Testing

- Add correct error imports ([4709c5f](https://github.com/allohamora/cli/commit/4709c5f8dbdc45dcb15b875f36e0dbd06057ba23))
- Add inline expects for configs ([1d8d2bb](https://github.com/allohamora/cli/commit/1d8d2bbaab9b7fcf2cbb51d071451c1c5de183cc))

### Continuous Integration

- Remove '' from publish ([10a76ef](https://github.com/allohamora/cli/commit/10a76ef11b76889f7203d930c2eb1ae5f471c7bf))
- Rename pr-title to set-pr-title ([adee3a2](https://github.com/allohamora/cli/commit/adee3a26c4424633fa05cdf88cd1a097ec88e803))

### Chores

- Apply npm audit fix ([1f78a62](https://github.com/allohamora/cli/commit/1f78a62ef0c6054eb2a41101cf31efe34f10a4a9))
- Add types to package.json ([122a51b](https://github.com/allohamora/cli/commit/122a51bf902142db6b42aa9afa29722bc298d909))

## [2.1.0](https://github.com/allohamora/cli/compare/v2.0.0...v2.1.0) (2026-06-17)

### Features

- Add npmrc option ([3a1ccc1](https://github.com/allohamora/cli/commit/3a1ccc109a478ed0eff83bb202e17595d67686b8))
- Add .editorconfig ([ff6237d](https://github.com/allohamora/cli/commit/ff6237d7d3dbcf3da739134018dce67aad84bd40))
- Add args based interface ([81891e5](https://github.com/allohamora/cli/commit/81891e5c60432da5525e262c799a390cc615c558))
- Add --version ([ba4f01c](https://github.com/allohamora/cli/commit/ba4f01c8bbdb0f563a951c68c2bcb0d86d9dd41c))
- Add --help ([6f13fba](https://github.com/allohamora/cli/commit/6f13fbacd60f17fb9c9cb1fe1516ca2530e9936c))
- Remove option duplicates in args approach ([81f5f10](https://github.com/allohamora/cli/commit/81f5f109ddf4d33c94c9777c51365348411d5e4c))
- Migrate to tsdown ([f0edfa0](https://github.com/allohamora/cli/commit/f0edfa0babe50fa4b84e318a2298304c4f311538))
- Add dts ([1f96eeb](https://github.com/allohamora/cli/commit/1f96eeb02218371c4bee5675a4853efa8765c2d8))
- Add prompt exit on ctrl+c ([072d4a4](https://github.com/allohamora/cli/commit/072d4a4b6a696d199906f10b08c986cc4c6c7593))

### Refactor

- Update editorconfig url to use https ([4b6a0ee](https://github.com/allohamora/cli/commit/4b6a0eed4a49dfd505d4936c0d32e47f173db166))
- Add parseArgv ([6dfd6b7](https://github.com/allohamora/cli/commit/6dfd6b76b0fe31d0dbc715c9eda644c2d9e4385d))
- Simplify parseArgv ([f5c1704](https://github.com/allohamora/cli/commit/f5c170404a69b418bc015b236d1d57b9a56b21a4))
- Add default [] argv to main ([ce08c70](https://github.com/allohamora/cli/commit/ce08c705ad8ba497a6962694f18620e21f19817d))
- Move yaml to dependencies ([89499f2](https://github.com/allohamora/cli/commit/89499f235b7cfda4d5ce86588ee9fd2b3abb54b3))
- Remove constructor from CliError ([43523d3](https://github.com/allohamora/cli/commit/43523d3213214c9ac4bc46ed5f2f60983a7b48be))

### Documentation

- Add missing jest integration to eslint ([013ec24](https://github.com/allohamora/cli/commit/013ec24163e0745507c7871397e8a38e86beefe8))
- Improve README.md options text ([12d5854](https://github.com/allohamora/cli/commit/12d5854eedfe527315d04e08e855d88b4e711c71))
- Add args usage to README.md ([a0141ea](https://github.com/allohamora/cli/commit/a0141ea22511c99e6567138504e45e6c630ec1cf))
- Add missing space to README.md ([07af3f5](https://github.com/allohamora/cli/commit/07af3f5f06a5fab34d2337ac57cbbdd616e232a6))

### Continuous Integration

- Remove checkout options from publish and add to release ([33e67e3](https://github.com/allohamora/cli/commit/33e67e3b319c50d919ad0a204565bd84761cc1c3))

### Chores

- Remove "chmod +x ./bin/cli.mjs" ([cb8a99c](https://github.com/allohamora/cli/commit/cb8a99c946c90025a39d9eca11d7a58652b9afb0))
- Reorder tsdown config keys ([9a055c1](https://github.com/allohamora/cli/commit/9a055c15bf0c4760bda70c59c3f58de9be7738c2))

## [2.0.0](https://github.com/allohamora/cli/compare/1.22.0...v2.0.0) (2026-06-17)

### ⚠ BREAKING CHANGES

- Migrate to erasable syntax ([882c511](https://github.com/allohamora/cli/commit/882c511d6aa5e2db4b4932a0130cf9178b2c8e8f))
- Update ora to 9.4.0 ([f1a4055](https://github.com/allohamora/cli/commit/f1a40559784d6e5c3e59927fc6c51cacc9e7c825))
- Update inquirer to 14.0.2 ([05f6d91](https://github.com/allohamora/cli/commit/05f6d91a413bd4da20af4e4ff4aa5614ba20a5a0))
- Update type-fest to 5.7.0 ([8f3e4a2](https://github.com/allohamora/cli/commit/8f3e4a24fd9bc5f1d412a21cad584da4c30a8498))
- Remove build workflow → use check workflow instead ([f4b6432](https://github.com/allohamora/cli/commit/f4b64323dca5ea026bce82a20ad2340f36d5339d))

### Features

- Add pull request template ([c7a3630](https://github.com/allohamora/cli/commit/c7a3630d4d164b92fa2aa2acec442d48bf636089))
- Make npm ci instead of npm i ([1f61836](https://github.com/allohamora/cli/commit/1f61836f8f9a27c73edf577ce59b66352f26fa3f))
- Add execa ([33b0240](https://github.com/allohamora/cli/commit/33b02407642fab82e4cdd8cc25dd996143d2bdfb))
- Add sort-package-json ([0fed40f](https://github.com/allohamora/cli/commit/0fed40f5d5cca49657a65d65a6d522d4dd1dbeab))
- Add dedent ([b8afae8](https://github.com/allohamora/cli/commit/b8afae842cd46b6ffa85abf4a1582149bae162aa))
- Add zero presets guard ([29fd893](https://github.com/allohamora/cli/commit/29fd893fee7a3e355d807334f044e9193d66fa1b))
- Add separate ignores for eslint ([1f687ad](https://github.com/allohamora/cli/commit/1f687ad7decf8c921e01adfa885fd2a814df1680))
- Add beautifulSort.configs.recommended usage ([5e3f39f](https://github.com/allohamora/cli/commit/5e3f39f073cfffbead639c64ad675fc0eedf0fee))
- Add check workflow ([bda7ace](https://github.com/allohamora/cli/commit/bda7ace950f04ac1ac40ffc3d9685d626a1d28c8))
- Add .nvmrc option ([c94e39a](https://github.com/allohamora/cli/commit/c94e39a4ac11669eedd0d6af5acbee7d0828baf8))
- Add object based workflows ([2c26773](https://github.com/allohamora/cli/commit/2c2677321729c51f5ca3128935eed623086ba9f8))
- Add nvmrc mutation ([803270a](https://github.com/allohamora/cli/commit/803270ab7f054c9225f2856ec206ed2c7b9ce5e5))
- Update all step versions ([cbd6584](https://github.com/allohamora/cli/commit/cbd6584356e0748579e9b6a22fb8d761de4481b6))
- Replace on: [push] with branches: "\*\*" in codecov ([a7ce3a7](https://github.com/allohamora/cli/commit/a7ce3a711b5fd98758acb645a065735cf08e3d29))
- Remove yml override in prettier ([7d32454](https://github.com/allohamora/cli/commit/7d324541a3e52b09d2f67d9b90f25b6f78ed9dd9))

### Bug Fixes

- Remove testRegex duplicate from react-ts jest config ([af2aaea](https://github.com/allohamora/cli/commit/af2aaea4ba63452cd082a07a904724dbbcbfa65e))
- Add correct spelling of minimumOneValidate ([5aa93b3](https://github.com/allohamora/cli/commit/5aa93b3b780e59953b587668b974a4b31b09c190))

### Refactor

- Add rolldown ([2254eb1](https://github.com/allohamora/cli/commit/2254eb123f4a34af58be51a2e7dff800fb652d9f))
- Move .ncurc to mjs ([9c61e16](https://github.com/allohamora/cli/commit/9c61e169d268fb7381257524401a4490262fa254))
- Fix node: in names ([b21209d](https://github.com/allohamora/cli/commit/b21209d821a15c5006a60df68e89fdc91f0c9560))
- Add runCommand helper ([afa78f9](https://github.com/allohamora/cli/commit/afa78f90baaab159e26451f8eabed7a33495dd96))
- Update command execution to use runCommand utility for consistency ([5d51e85](https://github.com/allohamora/cli/commit/5d51e857f7d878927255c9774aae17172076a915))
- Rename category.utils to category.service ([c071b21](https://github.com/allohamora/cli/commit/c071b21af818d18d45bf92b9ac0f862779f112d2))
- Move formatJavascript to prettier service ([bf61c6b](https://github.com/allohamora/cli/commit/bf61c6ba5514014a596ef6df9506a7e82126a1fa))
- Add utils ([0a787cf](https://github.com/allohamora/cli/commit/0a787cf110174a64cf35f1dd4a1ddb14e316130c))
- Add root.service ([7a37014](https://github.com/allohamora/cli/commit/7a37014dde0da535ecf857d9bd255242ce524141))
- Add npm.service ([82d3aba](https://github.com/allohamora/cli/commit/82d3aba487941ae195f132189f5ce66166ff4243))
- Add terminal.service ([e58a6c4](https://github.com/allohamora/cli/commit/e58a6c48755e7ded14a388e92955af5155c72129))
- Add github service ([e443248](https://github.com/allohamora/cli/commit/e44324857694b18f3501a8712562fac02fc344cd))
- Add node.service ([16b1e7f](https://github.com/allohamora/cli/commit/16b1e7fa525e754605f3dbb482b9dbad26837845))
- Add prompt.service ([0c6a86e](https://github.com/allohamora/cli/commit/0c6a86ee22bdb19ec90ea2f37760bd93ce413f73))
- Add installation.service ([fc6d63c](https://github.com/allohamora/cli/commit/fc6d63ceca6667a67f1b4637ebda2733cfcfc846))
- Remove unused utils ([b6eaee1](https://github.com/allohamora/cli/commit/b6eaee18f394e599a0ac670bb0e1e8c3dd6dcba2))
- Add cli.service and state.service ([e0c974c](https://github.com/allohamora/cli/commit/e0c974cd60059a52c427f1038ecbab89dc7daca6))
- Simplify state.service ([38dec02](https://github.com/allohamora/cli/commit/38dec0286e6b7083c7d14adc93d0439fc6440bda))
- Move terminal.service to terminal.utils ([8aa7575](https://github.com/allohamora/cli/commit/8aa757559ab011e7beadfa55652bc0c9e678b1cb))
- Simplify installCategoryOptions function using for-await-of loop ([95ea8f2](https://github.com/allohamora/cli/commit/95ea8f2f503a8398602af0d6028dc8aa1899619a))
- Remove useless for await ([4bc3b22](https://github.com/allohamora/cli/commit/4bc3b224c8f252838651e371f4a1c090215cc42f))
- Replace any with string ([5131875](https://github.com/allohamora/cli/commit/5131875ee1d0a7f7bef677aff19d206f1cfd1ead))
- Remove redundant expects in root.service.spec ([2b67943](https://github.com/allohamora/cli/commit/2b679435b99cd46ea2ad8f3644b23c64dc60b7c1))
- Remove shared options array ([d6ad229](https://github.com/allohamora/cli/commit/d6ad229c36c848df82c8705928c21ec24a918638))
- Remove shared selectedInstallOptions array ([6a95cb8](https://github.com/allohamora/cli/commit/6a95cb8dc541375b63652fa43354a57ccbb85efe))
- Add recursive: true ([b0d68d0](https://github.com/allohamora/cli/commit/b0d68d002c2f424117e39ce80dc2c484e7f93db1))
- Fix grammar mistakes ([ee7d903](https://github.com/allohamora/cli/commit/ee7d903c997f50ede0aae5ca4aff94508ec6dd39))
- Remove type-guard from addNpmScripts ([5563620](https://github.com/allohamora/cli/commit/5563620418fc1bb003253390c78273ee0c42fcb4))
- Make naming like config/index instead of name.config ([5d63e05](https://github.com/allohamora/cli/commit/5d63e054fd1d6c8123847f8fa6ed205a75a7e6cc))
- Remove vitest globals ([27217f5](https://github.com/allohamora/cli/commit/27217f56fb187a57d135f3bd3d45dfbf3988786c))
- Rename jestEntrypoint to jest for consistency ([45bbd16](https://github.com/allohamora/cli/commit/45bbd163483ab7b094378b3769b74f77bbe80ee4))
- Rename .entrypoint to .installer ([3175cc4](https://github.com/allohamora/cli/commit/3175cc4b69fce0bced7e847f4c178f6746c385f8))
- Standardize constant naming conventions ([8142ea9](https://github.com/allohamora/cli/commit/8142ea99ca4c724d20997e7ec22c452afb26ae23))
- Rename config retrieval functions for clarity ([ba8705e](https://github.com/allohamora/cli/commit/ba8705e83d4d07a9286e81f0c5c43b2d3acc5b0b))
- Rename configs to presets ([b5930d2](https://github.com/allohamora/cli/commit/b5930d225511bcca8647556580bfe164f26679b5))
- Simplify usePreset return type ([9e7c697](https://github.com/allohamora/cli/commit/9e7c6978834f9a97e1348c8bb0bb335a473a447f))
- Remove node-version-file: ".nvmrc"' ([40403a7](https://github.com/allohamora/cli/commit/40403a7ddf6515226e867f6869837f09f1ac48d7))
- Rename WORKFLOW_FILENAME to CHECK_WORKFLOW_FILENAME for consistency ([ef6e1a4](https://github.com/allohamora/cli/commit/ef6e1a4485899f75cca4ecd1638389a53a03a15a))
- Add spaces in github workflows ([632f76f](https://github.com/allohamora/cli/commit/632f76ffe6c7c337e6544305eff20972df2ec8ee))
- Replace content.trim() with content.trimEnd() ([39841c4](https://github.com/allohamora/cli/commit/39841c4964f4eb581c9b9973e0d6f381fa943f03))
- Remove structuredClone usage ([6d848e9](https://github.com/allohamora/cli/commit/6d848e99122eaf9fcbbc08ed65d8c0d8a37cd9b4))
- Remove const { content } usage ([32ea005](https://github.com/allohamora/cli/commit/32ea0054e8dfbff11bf7631a3457e8c48921314a))
- Remove CI environment variable from workflow configurations ([2cd3715](https://github.com/allohamora/cli/commit/2cd37153b5bf8dcc2bb9d641037bf8d0f94043a4))
- Make node-version-file on top ([733bf8b](https://github.com/allohamora/cli/commit/733bf8b166e3a5f6770af9de230a74403a9c3ac5))
- Remove quotes from node-version-file and cache in workflow configurations ([0579a3a](https://github.com/allohamora/cli/commit/0579a3a037f8fbf5fe5fe33511289b5c3f8a6a0f))
- Add space between updates in dependabot ([37c0dd9](https://github.com/allohamora/cli/commit/37c0dd9b2fb4222c0694d4bdae17a29dce3309d5))

### Documentation

- Update requirements in README.md ([36451fc](https://github.com/allohamora/cli/commit/36451fc150e9dca9170eb60b176f2777848f9b21))
- Replace build badge to check badge in README ([0bf7508](https://github.com/allohamora/cli/commit/0bf7508bd0c9fff7c8ce5b9eae8f5e62c13f7147))

### Testing

- Migrate to vitest ([b8b75ae](https://github.com/allohamora/cli/commit/b8b75aeb2a45dfe395b9c56d0ca61d9e9cb90273))
- Make coverage 100% ([a036b08](https://github.com/allohamora/cli/commit/a036b0886c2d16fd7c9f08767efa099e92cbe7a7))
- Fix type issues ([1f371bb](https://github.com/allohamora/cli/commit/1f371bba08aee4ed1013e1268707b6e228ad9993))
- Add setup-test-context ([9cf4736](https://github.com/allohamora/cli/commit/9cf4736844f9dc34f5f32963adff6504e0227511))
- Add setup-text-context usage ([fa581d1](https://github.com/allohamora/cli/commit/fa581d15ccfe43372b117cf56451b7be4a3d5f64))
- Rename all .test files to .spec ([22429b2](https://github.com/allohamora/cli/commit/22429b2f3462ca27c2bcd67968315183fdc92c21))
- Unify tests ([6bfd69d](https://github.com/allohamora/cli/commit/6bfd69d9d84d700bbc0fa4389b90c9ec37d269e1))
- Fix entypoint typo ([26b2dfd](https://github.com/allohamora/cli/commit/26b2dfde76328f621571f3c4f42d00c50ee0ae15))
- Add missing stylelint tests ([4612917](https://github.com/allohamora/cli/commit/46129174fbd1cdcf36e2506d55835d219f6c2f84))
- Add inline fixtures ([1fcc239](https://github.com/allohamora/cli/commit/1fcc2398525d3bf5617ea9760e20e623d65ef0f0))
- Move tests to **tests**/unit ([15ad1ce](https://github.com/allohamora/cli/commit/15ad1ce424afa1d06d703246b83626a8b5adb5e8))
- Remove test duplication ([cd8aca2](https://github.com/allohamora/cli/commit/cd8aca29273fe79856f1ee01b7e7000a9a0239fb))
- Add tests for missing package.json ([5f0125d](https://github.com/allohamora/cli/commit/5f0125d456ee425fc47e0ab311e00d96b0b82b5d))
- Add self to Loading mock ([affe0a8](https://github.com/allohamora/cli/commit/affe0a8636be7e6c0b341ff532f1fe423a7b2205))
- Update test description for js options export ([1032585](https://github.com/allohamora/cli/commit/1032585a1023f04ee2bb300297bdf65795692a21))
- Ensure default config is set before each test ([c0a6888](https://github.com/allohamora/cli/commit/c0a6888884010c7eb652d89c7cec8d446793de32))
- Remove arrayContaining from command expectations ([779bec1](https://github.com/allohamora/cli/commit/779bec18fcc9ed30b83eda9c30d463221df83311))
- Unify test utils ([8e645b0](https://github.com/allohamora/cli/commit/8e645b0a7192cbfd73a9e65cb82a2127aed0f970))
- Add missing toEqual ([12179e3](https://github.com/allohamora/cli/commit/12179e3084ccf1c74412ed6b874ee35eed94c227))
- Make readable array based toBe ([b6b8985](https://github.com/allohamora/cli/commit/b6b89855740c54a02d0db60c66d201dc9d026759))
- Add stronger checks for expectGithubWorkflow ([d3be1e2](https://github.com/allohamora/cli/commit/d3be1e2d656d72dd79ce6ce02bfb6d7c64767aa3))

### Continuous Integration

- Add pr-title action ([25c98b6](https://github.com/allohamora/cli/commit/25c98b6ab1e8903dddf23b52cefe810a1da16cf0))
- Remove pr-title execution for forks ([40c9c59](https://github.com/allohamora/cli/commit/40c9c597c8c0e19bed41901e92ee671529d30307))
- Replace build.yml with check.yml ([a965049](https://github.com/allohamora/cli/commit/a965049764df17baeff5497218a2fc3e99e00d17))
- Add node-version-file: ".nvmrc" to workflows ([bedc39e](https://github.com/allohamora/cli/commit/bedc39e2e9fbfa3d6135922e5e509f0c74458ce2))
- Update dependabot ([db9aaef](https://github.com/allohamora/cli/commit/db9aaefedd76398cf676f34c85b369112067af44))
- Add publish ([f99042f](https://github.com/allohamora/cli/commit/f99042f0b1848c87ae2af06937f2fc4abcc4073e))
- Add publish checkout options ([d7f8e34](https://github.com/allohamora/cli/commit/d7f8e34a465f8be8fc63cd2c1784b4758b57d380))
- Add missing fetch-depth: 0 to release.yml ([8fc7eb4](https://github.com/allohamora/cli/commit/8fc7eb471d78d4dfd22a63d7cf433937e9111b43))

### Chores

- **deps:** Bump actions/checkout from 5 to 6 ([301a097](https://github.com/allohamora/cli/commit/301a09733d0daa66f699b715a93546f30e7bd0fe))
- **deps:** Bump codecov/codecov-action from 5 to 6 ([f6e5025](https://github.com/allohamora/cli/commit/f6e5025cea75f292d170cac126334a9f033c1aff))
- **deps:** Bump softprops/action-gh-release from 2 to 3 ([1d420f7](https://github.com/allohamora/cli/commit/1d420f72aa6b83f3bb050410a1b92bc9d74226e9))
- **deps:** Bump codecov/codecov-action from 6 to 7 ([6b32e82](https://github.com/allohamora/cli/commit/6b32e82eb445dbc0a6aec3e17705f702ace7aaf3))
- Update commitlint ([260c7a5](https://github.com/allohamora/cli/commit/260c7a5331ec59a83779c4b80c3bd7a161e76b80))
- Update rollup ([7c0aed8](https://github.com/allohamora/cli/commit/7c0aed8811c19f2780a0ccc41b771ede20775a7d))
- Add .npmrc with min-release-age configuration ([afc7932](https://github.com/allohamora/cli/commit/afc793234300bdedd777588d907dfaf4c31fe3a2))
- Update engines ([95a01b6](https://github.com/allohamora/cli/commit/95a01b61cb902819b4612bdc564e7419389b3611))
- Add typecheck script ([bdfe18f](https://github.com/allohamora/cli/commit/bdfe18f77b10f415add85f56adb18a50e92d9be8))
- Update typescript ([a422ca1](https://github.com/allohamora/cli/commit/a422ca1825d201e100df4a06655db1e9092093ad))
- Bump deps ([1aedd72](https://github.com/allohamora/cli/commit/1aedd72294e350f59c099ee2add106a4cc0da858))
- Bump eslint ([2284900](https://github.com/allohamora/cli/commit/228490057dc271a2ba1f360804a3c9fa782ed4bd))
- Apply npm audit fix ([1500d7c](https://github.com/allohamora/cli/commit/1500d7ce8051d71ae8ec7b5b6b370d5659687081))
- Update prebuild script to include typecheck ([0bd9ed0](https://github.com/allohamora/cli/commit/0bd9ed08f363d634d5afed48969acb20e2283a4f))
- Remove --watch from dev script ([5b5bd24](https://github.com/allohamora/cli/commit/5b5bd246f212a9d4f6bac8f00ffd139ecc7a9504))
- Add git-cliff ([12d21e7](https://github.com/allohamora/cli/commit/12d21e7f787e9c3b9ee364d87ab2f24a7fd5fe09))

### Other

- Revert "feat: add sort-package-json" ([ce7a321](https://github.com/allohamora/cli/commit/ce7a321002e900a23995056beece99b6d6abfdda))
- Revert "ci: remove pr-title execution for forks" ([f5ebac3](https://github.com/allohamora/cli/commit/f5ebac366b66d1495010d72463d1aa23de650a96))

## [1.22.0](https://github.com/allohamora/cli/compare/1.21.1...1.22.0) (2025-11-24)

### Features

- Add define-config to eslint ([679cb3b](https://github.com/allohamora/cli/commit/679cb3bd620164df8626ed157c763594f224bf67))
- Add @ts-expect-error to react:ts eslint config ([fec6039](https://github.com/allohamora/cli/commit/fec603990d2dd61f9ffbe31aba1b0e73735a3f9a))

### Continuous Integration

- Add defineConfig to eslint.config.mjs ([c10a7eb](https://github.com/allohamora/cli/commit/c10a7eb9bff6a0db6d6da2f55a07bafd69fe07b8))

### Chores

- **deps:** Bump actions/checkout from 4 to 5 ([473a923](https://github.com/allohamora/cli/commit/473a923850994c50bb1ef00be60762307b500176))
- **deps:** Bump actions/setup-node from 4 to 5 ([38c2be1](https://github.com/allohamora/cli/commit/38c2be165595a57cc487f84bc25d700d3b35e27e))
- **deps:** Bump actions/setup-node from 5 to 6 ([8bd815e](https://github.com/allohamora/cli/commit/8bd815e4de2c52e87c40b0e0ad3d4b1a113b33b2))
- **deps:** Bump JS-DevTools/npm-publish from 3 to 4 ([0a6af6a](https://github.com/allohamora/cli/commit/0a6af6a370ad554b763bb49618eba2ad081793cc))
- Apply npm audit fix ([8917936](https://github.com/allohamora/cli/commit/8917936cc5b5b34699a43780532340eacf15dc52))
- Update eslint deps ([94d2448](https://github.com/allohamora/cli/commit/94d244883d45ba4db30b8b858d28651f5de1294b))
- **release:** 1.22.0 ([d5b48dc](https://github.com/allohamora/cli/commit/d5b48dc863b17ea64d59160a3ba5df2123f8963e))

## [1.21.1](https://github.com/allohamora/cli/compare/1.21.0...1.21.1) (2025-01-30)

### Bug Fixes

- Add missing \n after imports in eslint.config.mjs ([b26602c](https://github.com/allohamora/cli/commit/b26602ce5d95421fd5c789b25f8715cbade17bc7))

### Chores

- **release:** 1.21.1 ([87a15f6](https://github.com/allohamora/cli/commit/87a15f64b4b59f8c1e707932ba9722dbe9cf94df))

## [1.21.0](https://github.com/allohamora/cli/compare/1.20.0...1.21.0) (2025-01-30)

### Features

- Add prettier format for eslint config ([d9b8176](https://github.com/allohamora/cli/commit/d9b8176c77c00324ef6b0d8daa25e8c10aae927d))
- Move ignores to separate config ([cfc0a2f](https://github.com/allohamora/cli/commit/cfc0a2f264534dd39925f7632a6a3f987c483f93))

### Chores

- **deps:** Bump codecov/codecov-action from 4 to 5 ([c8e1c66](https://github.com/allohamora/cli/commit/c8e1c669d73805f58c085db3d4f53b25758f4fd0))
- Apply npm audit fix ([d7f970e](https://github.com/allohamora/cli/commit/d7f970e14724af31599ba4dfcb3aac2bd5a6e5e8))
- **release:** 1.21.0 ([244fe9b](https://github.com/allohamora/cli/commit/244fe9b6faae6b44ed2070ffa7be4a3756258692))

### Other

- Merge branch 'release/1.20.0' into develop ([c482d8c](https://github.com/allohamora/cli/commit/c482d8c9028444e56004eb8178c556365f7d18cb))

## [1.20.0](https://github.com/allohamora/cli/compare/1.19.0...1.20.0) (2024-09-22)

### Features

- Add \n to the end of eslint.config.mjs ([ee69d08](https://github.com/allohamora/cli/commit/ee69d08bbd4767349bdbbe759c502f9a7e633397))
- Add files to default eslint config ([b12945a](https://github.com/allohamora/cli/commit/b12945a629354aa3eb57ddebf833beab63902852))
- Remove @typescript-eslint usage ([f664f0d](https://github.com/allohamora/cli/commit/f664f0d0c6617090aff99ec32fb74d9cbe1e7733))
- Add react:ts eslint config ([5259ae4](https://github.com/allohamora/cli/commit/5259ae4cbf20aac5c2916d606528787ca7a6ba3c))
- Add eslint-plugin-jsx-a11y to react:ts config ([16d1d5a](https://github.com/allohamora/cli/commit/16d1d5a267652ff24c2c478bc6ff72e52ecda85e))
- Add \n to the end of all files ([7ccea1d](https://github.com/allohamora/cli/commit/7ccea1d5a26e8410eb5372e8619df0782d761d7a))
- Remove spaces after env: in workflow ([0496220](https://github.com/allohamora/cli/commit/049622020b3f655f055080684139eb4eeea5146b))
- Add cjs and mjs to the prettier integration ([586c345](https://github.com/allohamora/cli/commit/586c345ea210d3eb072539333a8732d6c013f16f))
- Bump yashanand1910/standard-release-notes to 1.5.0 ([d4a7dfd](https://github.com/allohamora/cli/commit/d4a7dfd4e2e25c247162515d481eeebf619fc9cc))

### Bug Fixes

- Remove eslintPluginPrettierRecommended import from node:ts config ([680980e](https://github.com/allohamora/cli/commit/680980e1488ffce4f271602d2373b47458bac63b))
- Add handling for last ";" in imports ([dec8afc](https://github.com/allohamora/cli/commit/dec8afc759d99534a6fb2682b4344f28e8a763aa))

### Refactor

- Move tseslint import in eslint.config.mjs ([f8ae7a4](https://github.com/allohamora/cli/commit/f8ae7a49e4eafef46156d55181444d06d91b0a6f))

### Chores

- Update package-lock.json ([48cd58b](https://github.com/allohamora/cli/commit/48cd58bac7cad6fc2e4da9f4b9436d82429d1067))
- Update jest config ([bce8533](https://github.com/allohamora/cli/commit/bce853393407bd63f37e5cb5b9bce91257c864ad))
- Add \n to the end of .prettierignore ([93b995e](https://github.com/allohamora/cli/commit/93b995e26ad9b95f6dd106a1e37ec1a00a003985))
- **release:** 1.20.0 ([a9b7971](https://github.com/allohamora/cli/commit/a9b79712d2b27643ccfaa0d4e2210ba4ceac4955))

### Other

- Merge branch 'release/1.19.0' into develop ([b4ec96f](https://github.com/allohamora/cli/commit/b4ec96f7ebe80993a9feb8db1a635b55a97a43f3))

## [1.19.0](https://github.com/allohamora/cli/compare/1.18.7...1.19.0) (2024-09-21)

### Features

- Add eslint flat config ([f778f46](https://github.com/allohamora/cli/commit/f778f4607bd0b74f5b30ef3d05648c3d2b05b047))

### Continuous Integration

- Add .ncurc.js for "npx npm-check-updates" ([890996f](https://github.com/allohamora/cli/commit/890996f5c9490888311211af42111c7f749eea38))

### Chores

- **deps:** Bump yashanand1910/standard-release-notes ([def99af](https://github.com/allohamora/cli/commit/def99af0dcc7c4548ac9b1efd266598add07700f))
- Lock type-fest, inquirer and ora ([6e0b821](https://github.com/allohamora/cli/commit/6e0b821a0e3fc0d2071b51a5fbc26d77d671d3b6))
- Lock eslint version ([be248b6](https://github.com/allohamora/cli/commit/be248b6a3224f5ff1e5e5613171cfc27f7d4d190))
- Lock @types/inquirer ([c579b0e](https://github.com/allohamora/cli/commit/c579b0e252d9a3357058fc0c1e23d6cea1531729))
- Bump deps ([0c661f2](https://github.com/allohamora/cli/commit/0c661f2003b0f54246c1c9b102a6ae9bca338bbf))
- **release:** 1.19.0 ([fe6552b](https://github.com/allohamora/cli/commit/fe6552b39a0e773ebbde158c4dec6dfdae9edcd0))

## [1.18.7](https://github.com/allohamora/cli/compare/1.18.6...1.18.7) (2024-03-30)

### Features

- Add link to develop ([b2be74d](https://github.com/allohamora/cli/commit/b2be74d68a8ce56920f3d77006803782158fcdca))
- Add integration tags instead of links ([af8b351](https://github.com/allohamora/cli/commit/af8b351b71cb59e891cb203e7316238e18aabb39))
- Add release scripts to standard-version description ([17188e6](https://github.com/allohamora/cli/commit/17188e6874cb8e08e7b317043db0112c779c5aea))
- Add one style for options and categories ([e36f5b1](https://github.com/allohamora/cli/commit/e36f5b1ffdf30e3decec13b0a0302220f98a83f8))
- Rename on each push to on a push ([9cc5fc8](https://github.com/allohamora/cli/commit/9cc5fc87401cbe6c81e549aaf29f9fa8e34943cb))
- Add a to code coverage ([bfcb21f](https://github.com/allohamora/cli/commit/bfcb21f70a472feab13ef28655ed6756e34b6687))
- Rename CLI to @allohamora/cli ([64e400d](https://github.com/allohamora/cli/commit/64e400deca1646a8ad37ece72090c70769caa0d6))
- Add descriptions to husky and lints-staged ([6ac5772](https://github.com/allohamora/cli/commit/6ac5772db8f079447076eb646a50e2d701c32dde))
- Remove a from on a push ([527cc05](https://github.com/allohamora/cli/commit/527cc05e4f1daf8e1886e4273fb9afee0f53d26e))

### Bug Fixes

- Dependabot description typo ([1185a1f](https://github.com/allohamora/cli/commit/1185a1f1116b294d344c33447a6b3273eaead55c))
- Release-workflow the CHANGELOG.md typo ([ce6e83a](https://github.com/allohamora/cli/commit/ce6e83a07a25c4b760c4789059da2a183b920bda))

### Chores

- **release:** 1.18.7 ([ce036fa](https://github.com/allohamora/cli/commit/ce036fa2f8fba20ae995ca9b36d4f6227546edaa))

## [1.18.6](https://github.com/allohamora/cli/compare/1.18.5...1.18.6) (2024-03-30)

### Features

- Update text in README ([d045ce2](https://github.com/allohamora/cli/commit/d045ce24e4735addae2a1486e0358ed2ff68f16c))
- Rename Options to presets ([d0b33ba](https://github.com/allohamora/cli/commit/d0b33ba2f5762b4aeeaccf7c9f1c6bdfad6570d6))
- Update text of js options ([335c4ee](https://github.com/allohamora/cli/commit/335c4ee442b03bb268a60ed67d8baac4a560dcd3))

### Refactor

- Fix aditionalHandlers typo ([f83d10e](https://github.com/allohamora/cli/commit/f83d10ef7cdbb40566a29f4b69ee85cbd028dc4a))
- Fix proccess typo ([91e8df7](https://github.com/allohamora/cli/commit/91e8df75dc8f351ac527602e6050d6850b0cdcf6))

### Chores

- **release:** 1.18.6 ([e48b64f](https://github.com/allohamora/cli/commit/e48b64f428d740fede6e78d16e55ec8f0de79904))

## [1.18.5](https://github.com/allohamora/cli/compare/1.18.4...1.18.5) (2024-03-30)

### Features

- Replace github asset with the video tag ([f7ae825](https://github.com/allohamora/cli/commit/f7ae8258fdedfa24d1b578346ce7d0e6f2bc29e1))

### Chores

- **release:** 1.18.5 ([3686eee](https://github.com/allohamora/cli/commit/3686eee7493d209dd65752aa16db2a2361891919))

## [1.18.4](https://github.com/allohamora/cli/compare/1.18.3...1.18.4) (2024-03-30)

### Features

- Add usage.mp4 to README ([02f5899](https://github.com/allohamora/cli/commit/02f589965a71e164c75cf573fd1f85031ffde078))

### Styling

- Format README ([6d29f1e](https://github.com/allohamora/cli/commit/6d29f1ecc2603f15a4f3bb6464ec24796394e9e3))

### Chores

- **release:** 1.18.4 ([a147ca2](https://github.com/allohamora/cli/commit/a147ca26a53115b53a54f7314ec103b2786e7620))

## [1.18.3](https://github.com/allohamora/cli/compare/1.18.2...1.18.3) (2024-03-30)

### Features

- Update README text ([42f11fc](https://github.com/allohamora/cli/commit/42f11fcb9052ac88e9b5c07fb3cc7fdda4b960e4))

### Bug Fixes

- Remove addDirToRootIfNotExists from addHook ([5b0c6dc](https://github.com/allohamora/cli/commit/5b0c6dc19c75151d1543b87fd4eb6bbc20d5a031))

### Chores

- **release:** 1.18.3 ([3178612](https://github.com/allohamora/cli/commit/3178612b781830213f5ddac810642f6f4c054b06))

## [1.18.2](https://github.com/allohamora/cli/compare/1.18.1...1.18.2) (2024-03-30)

### Bug Fixes

- Run husky prepare script instead of husky init ([4df55be](https://github.com/allohamora/cli/commit/4df55be57c2c88d1602fc01bcd92db185e2859a8))

### Chores

- **release:** 1.18.2 ([cee177f](https://github.com/allohamora/cli/commit/cee177f7b9af095e14a00b4964e495ae4047a9c3))

## [1.18.1](https://github.com/allohamora/cli/compare/1.18.0...1.18.1) (2024-03-30)

### Bug Fixes

- Add .husky dir creation if it does not exist ([a436c4b](https://github.com/allohamora/cli/commit/a436c4bfacf4f838ab95c88c43413169868a7cef))

### Chores

- **release:** 1.18.1 ([c519b09](https://github.com/allohamora/cli/commit/c519b0992fea0801a440350f9ea3774032eb34f8))

## [1.18.0](https://github.com/allohamora/cli/compare/1.17.0...1.18.0) (2024-03-30)

### Features

- Bump softprops/action-gh-release ([7f9dd83](https://github.com/allohamora/cli/commit/7f9dd8367db2275a1a436db714f148a4f5ee6073))
- Bump actions/checkout@v4 ([b5223b2](https://github.com/allohamora/cli/commit/b5223b226b1742c14043fa6983bd0b15f0f1145a))
- Bump yashanand1910/standard-release-notes ([421d0e0](https://github.com/allohamora/cli/commit/421d0e09d4a5084aaf8086d768412b9b4aae53fb))
- Bump codecov/codecov-action ([0c51c22](https://github.com/allohamora/cli/commit/0c51c229b4c59d13eb803ee3709350f06b5f913e))
- Bump actions/setup-node ([e34ddce](https://github.com/allohamora/cli/commit/e34ddce0ef1e71284552a3f65a0ff6b96f513bfd))
- Update README ([d698b5a](https://github.com/allohamora/cli/commit/d698b5a9d77385e778ff53b38a7ad6e5464888c2))
- Rename Script Name to Option ([394bfe9](https://github.com/allohamora/cli/commit/394bfe9e0f222dba5a1622e8c8fc0ffc6c20d8dc))
- Move usage block to the top ([e74d24d](https://github.com/allohamora/cli/commit/e74d24da7312fda079e6fd0aef1f56f8657fc51b))

### Bug Fixes

- Remove husky prepare script usage ([dcb61fc](https://github.com/allohamora/cli/commit/dcb61fcd872767a918a07ff2fc232fa201585526))

### Refactor

- Fix linter errors ([4115789](https://github.com/allohamora/cli/commit/4115789d4a20df868f8b1f45db924098084a9957))

### Styling

- Apply format:fix ([0ad596a](https://github.com/allohamora/cli/commit/0ad596ac486a5677d173488e0be205114dfcec33))

### Chores

- **deps:** Bump softprops/action-gh-release from 1 to 2 ([f45f8a1](https://github.com/allohamora/cli/commit/f45f8a15786f0e56a8bb2fe42c2c6c0d1d73d315))
- **deps:** Bump actions/checkout from 2 to 4 ([7f134b6](https://github.com/allohamora/cli/commit/7f134b6ba0e51ce8b0aaaa1bea50b6684a388cb9))
- **deps:** Bump yashanand1910/standard-release-notes ([8e8ec99](https://github.com/allohamora/cli/commit/8e8ec99f89b722f27567e86408baeda63b30a682))
- **deps:** Bump codecov/codecov-action from 2 to 4 ([84b5ed8](https://github.com/allohamora/cli/commit/84b5ed87fd5c7fffcd191d2bf9ce470c66f81054))
- **deps:** Bump actions/setup-node from 2 to 4 ([cd5139d](https://github.com/allohamora/cli/commit/cd5139d9e2763420029d94deea6bbbf45c777242))
- **release:** 1.18.0 ([d6db103](https://github.com/allohamora/cli/commit/d6db1036e1c3c2f7ff718f4e4f1d600154e41cbe))

## [1.17.0](https://github.com/allohamora/cli/compare/1.16.0...1.17.0) (2024-03-30)

### Features

- Update dependabot config ([69d5321](https://github.com/allohamora/cli/commit/69d532128af3de366710d2800f9a7c031813332f))

### Chores

- **release:** 1.17.0 ([7c1e393](https://github.com/allohamora/cli/commit/7c1e3933b6a246a4b95b551f3491eb3acda8f56a))

## [1.16.0](https://github.com/allohamora/cli/compare/1.15.1...1.16.0) (2024-03-30)

### Features

- Remove tag skipping for standard-version ([5842ffb](https://github.com/allohamora/cli/commit/5842ffb9d9373b727ae4390c35ed459e4ad3f71b))

### Refactor

- Change packageJson.scripts type-guard ([08b194b](https://github.com/allohamora/cli/commit/08b194be83668130bfa4429537739fc12d180107))

### Chores

- **release:** 1.16.0 ([6a1afb3](https://github.com/allohamora/cli/commit/6a1afb346ad8365b734f607e82cd3edb779bdcac))

### Other

- Merge branch 'master' into develop ([a4ef179](https://github.com/allohamora/cli/commit/a4ef179875c5666f87509921341bfb4d354bdc9b))

## [1.15.1](https://github.com/allohamora/cli/compare/1.15.0...1.15.1) (2024-03-30)

### Other

- Merge branch 'release/1.15.1' ([b5b1846](https://github.com/allohamora/cli/commit/b5b1846296f9e4a0f385117d9d17ead6fcb874e3))

## [1.15.0](https://github.com/allohamora/cli/compare/1.14.1...1.15.0) (2024-03-30)

### Other

- Merge branch 'release/1.15.0' ([dd78293](https://github.com/allohamora/cli/commit/dd78293f8abfad6fad07015db563b52f964deb8a))

## [1.14.1](https://github.com/allohamora/cli/compare/1.14.0...1.14.1) (2024-03-23)

### Features

- Add "react/jsx-no-leaked-render" rule ([12852dd](https://github.com/allohamora/cli/commit/12852ddb567a9fec21973caddabde541e4083231))
- Move react/jsx-no-leaked-render to warn ([372f078](https://github.com/allohamora/cli/commit/372f07832adcef22cb808823d3da8645d385e137))

### Bug Fixes

- Fix DockerFile typo ([ca7c4e3](https://github.com/allohamora/cli/commit/ca7c4e33911764ca8115cc5b9e7d3bd309bde33c))
- Fix release workflow ([c33972e](https://github.com/allohamora/cli/commit/c33972e256a7513bd3f4a8f4a81e311bcfb3a6e5))

### Continuous Integration

- Add releasing to npm ([bf27f33](https://github.com/allohamora/cli/commit/bf27f33314a9c5bb4f6cacfeccb4fa2fe9372d95))

### Chores

- Update CHANGELOG.md ([6b31910](https://github.com/allohamora/cli/commit/6b319106e2bd701138153cff2cacba20e85fa9ca))
- **release:** 1.14.1 ([4fe0b52](https://github.com/allohamora/cli/commit/4fe0b5215208b73c9a4892dd094608be6331aee7))
- **release:** 1.15.0 ([20e7138](https://github.com/allohamora/cli/commit/20e7138c48eb98dd87ad452a4a9f381b5305bf33))
- **release:** 1.15.1 ([629c9ad](https://github.com/allohamora/cli/commit/629c9adfe3bf3375d2ebf617a6658610bae7dc6f))

### Other

- Merge branch 'master' into develop ([57a43cb](https://github.com/allohamora/cli/commit/57a43cb213d79b7a7d5cf65e6c5ce6bf8d8994f7))
- Merge branch 'release/1.14.1' into develop ([b421f72](https://github.com/allohamora/cli/commit/b421f726ad67e0d0cfb6d288e661ab7362617398))
- Merge branch 'release/1.15.0' into develop ([b56b9ec](https://github.com/allohamora/cli/commit/b56b9ec9b1344ade98391a1f24ca972acc197f45))
- Merge branch 'release/1.15.1' into develop ([0c27efa](https://github.com/allohamora/cli/commit/0c27efa368405baa403038e0e9646abd126200d4))
- Merge branch 'release/1.14.1' ([bb4b319](https://github.com/allohamora/cli/commit/bb4b3198723db5a9b03a2ec1229bc5b7dd640581))

## [1.14.0](https://github.com/allohamora/cli/compare/1.13.0...1.14.0) (2024-03-16)

### Other

- Merge branch 'release/1.14.0' ([6d9abbe](https://github.com/allohamora/cli/commit/6d9abbe4bdd147eafb409d30a7a2daeb1af9ca30))

## [1.13.0](https://github.com/allohamora/cli/compare/1.12.0...1.13.0) (2024-02-18)

### Features

- Migrate to husky v9 ([396cdec](https://github.com/allohamora/cli/commit/396cdec3c68b29241759bae918699efb7c1f248d))
- Add better output for install warnings ([16cf67c](https://github.com/allohamora/cli/commit/16cf67c61ed38609b29508c3590b3953cc4617ba))
- Add eslint-plugin-deprecation to configs ([7e0924b](https://github.com/allohamora/cli/commit/7e0924b55ae379b1e894400e1b877bf44f5f3684))
- Add more eslint rules ([13fca82](https://github.com/allohamora/cli/commit/13fca82bdb21349845ed8c822c4f207e5279f0c9))
- Replace @typescript-eslint/no-use-before-define with no-use-before-define ([f46441f](https://github.com/allohamora/cli/commit/f46441f8666ca768e1af990765366a5560b01d3c))

### Refactor

- Fix eslint warnings/errors ([aa158dc](https://github.com/allohamora/cli/commit/aa158dcdf6afab21a5d9ffa1d30a4dd0376739f4))

### Chores

- Fix audit issues ([1f97080](https://github.com/allohamora/cli/commit/1f9708074a5cdb296aa04f6bfd12f2f7a3f06036))
- Bump husky to the latest version ([0d3c64f](https://github.com/allohamora/cli/commit/0d3c64f14a8dce5f223433f0700cc85db8da4280))
- **release:** 1.13.0 ([3c7d978](https://github.com/allohamora/cli/commit/3c7d97819822c672a51400aaea888711b53ce70f))
- Add eslint-plugin-deprecation ([8d56f0f](https://github.com/allohamora/cli/commit/8d56f0f258b81281809a5a312ddee3e63bfaee69))
- Add more rules to eslint ([4f377fa](https://github.com/allohamora/cli/commit/4f377faff8551856b4858eca4ae3147ebef88764))
- **release:** 1.14.0 ([c6bfcc2](https://github.com/allohamora/cli/commit/c6bfcc2fa223a75f5bbad40254a314e0ae4af7a3))

### Other

- Merge tag '1.12.0' into develop ([918897f](https://github.com/allohamora/cli/commit/918897f637c82c9231353328160f067b3f150c6f))
- Merge branch 'release/1.13.0' into develop ([3dba2a1](https://github.com/allohamora/cli/commit/3dba2a1b8600a8edbcb9310886f3475771adfa8d))
- Merge branch 'release/1.14.0' into develop ([3dfd153](https://github.com/allohamora/cli/commit/3dfd153ff131e3245882cbf1d723924c4d20892d))
- Merge branch 'release/1.13.0' ([a47e694](https://github.com/allohamora/cli/commit/a47e6940504573546670f3283419270cf4edd359))

## [1.12.0](https://github.com/allohamora/cli/compare/1.11.0...1.12.0) (2023-06-03)

### Features

- Add run-command error logs showing ([7073e1d](https://github.com/allohamora/cli/commit/7073e1d4995996e0b90af4f12be920114da61430))
- Update stylelint config ([037d0ae](https://github.com/allohamora/cli/commit/037d0ae385b2b6b7bafada561c07a38d1c330cc8))

### Chores

- **release:** 1.12.0 ([e8a19c0](https://github.com/allohamora/cli/commit/e8a19c0c958cc85d5e10c0eeaa0cc5da11a208ab))

### Other

- Merge tag '1.11.0' into develop ([ee69b67](https://github.com/allohamora/cli/commit/ee69b67105f3bb4f871349f7e39533a13cf92c1f))
- Merge branch 'release/1.12.0' ([b026d9a](https://github.com/allohamora/cli/commit/b026d9a11961f0866cde15768789b3390d162f64))

## [1.11.0](https://github.com/allohamora/cli/compare/1.10.0...1.11.0) (2023-06-03)

### Features

- Update eslint config for react:ts ([2f2e58c](https://github.com/allohamora/cli/commit/2f2e58ce18a54f1cd9b16ed731dae2ad58296304))

### Chores

- Remove codeql badge ([dc5ec0e](https://github.com/allohamora/cli/commit/dc5ec0e251e411d5b23ec2bdfd220b3bfa59aeeb))
- Add bin to .prettierignore ([6bce970](https://github.com/allohamora/cli/commit/6bce9706ead59f49eb61b92f0b50cd4c8442bbe1))
- **release:** 1.11.0 ([3bbcabc](https://github.com/allohamora/cli/commit/3bbcabc731f3bc5c6f2ba8840c7ef5c120cc205d))

### Other

- Merge tag '1.10.0' into develop ([9d046d0](https://github.com/allohamora/cli/commit/9d046d00543e71f78d37aefc6ae0f23a2531692a))
- Merge branch 'release/1.11.0' ([70cd6a3](https://github.com/allohamora/cli/commit/70cd6a38e6022c2215133c28b85dc976451ed693))

## [1.10.0](https://github.com/allohamora/cli/compare/1.9.0...1.10.0) (2023-04-15)

### Features

- Add 0 pull request limit to dependabot ([9a1012b](https://github.com/allohamora/cli/commit/9a1012b7ceeb20b35e0c637142e5e1c24c47dd1d))
- Add new ts-jest config type ([c7fff7c](https://github.com/allohamora/cli/commit/c7fff7c51b6437d55c87d07ee2e7da4ec6d1c77e))
- Add jest config type to default jest config ([ab89333](https://github.com/allohamora/cli/commit/ab89333fc76979874f7c925d0285b3b666e27500))
- Add passWithNoTests to jest configs ([9980e13](https://github.com/allohamora/cli/commit/9980e13bfcc9baa82b68976f8432eb6f144e5836))
- Add eslintignore to eslint ([40d0822](https://github.com/allohamora/cli/commit/40d0822f19223d49c2268c83da079d0fce99d7ba))

### Chores

- Fix typos in README.md ([e349a0d](https://github.com/allohamora/cli/commit/e349a0d19bd109224d6cf8324b3b44f324ae6835))
- Bump dev deps ([56a46da](https://github.com/allohamora/cli/commit/56a46da1c76c9583510692a95bd592df8f0f6baf))
- Fix dev deps issues ([e8a5925](https://github.com/allohamora/cli/commit/e8a59251c2222f2424b5505a4298fcb2a0a79840))
- Update build script ([1cfa4e1](https://github.com/allohamora/cli/commit/1cfa4e1fdfdfb9f3c343cf3ca72af084455ed608))
- **release:** 1.10.0 ([766fad3](https://github.com/allohamora/cli/commit/766fad3c0364f3a039d884f8b71e7eb35dd259ec))

### Other

- Merge tag '1.9.0' into develop ([1a81a78](https://github.com/allohamora/cli/commit/1a81a781683b46a91fae62b97ca4fc1938d5b256))
- Merge branch 'release/1.10.0' ([7ebbdca](https://github.com/allohamora/cli/commit/7ebbdca225ff0fec057f2c5d15476049d2596bdb))

## [1.9.0](https://github.com/allohamora/cli/compare/1.8.0...1.9.0) (2023-03-07)

### Features

- Remove codeql ([7a669e5](https://github.com/allohamora/cli/commit/7a669e5ce49cfd19ea9e87418b9f86906cd26881))

### Bug Fixes

- Fix release workflow ([d6f9cd3](https://github.com/allohamora/cli/commit/d6f9cd34d946d35f09e1db17d521101a4ea8e30a))

### Chores

- Fix audit issues ([71791c6](https://github.com/allohamora/cli/commit/71791c676726bae67074b0838f418d0a105b15bb))
- **release:** 1.9.0 ([e9531c8](https://github.com/allohamora/cli/commit/e9531c808e8a36765af9eab824d4d1a7d09c8e53))

### Other

- Merge tag '1.8.0' into develop ([cf31cd7](https://github.com/allohamora/cli/commit/cf31cd7ee1e746e910de5ea6608d80a5ed113ba5))
- Merge branch 'release/1.9.0' ([545a51e](https://github.com/allohamora/cli/commit/545a51e456772effadadc8b6e41580fe8e0af8e8))

## [1.8.0](https://github.com/allohamora/cli/compare/1.7.0...1.8.0) (2022-05-29)

### Features

- Add codecov workflow ([b11d9f0](https://github.com/allohamora/cli/commit/b11d9f0f044a3a0452c004ba5c95dbcb29273024))

### Refactor

- Prepare to esm migration ([927ca43](https://github.com/allohamora/cli/commit/927ca43a98b9fb7b7f9b8acf27796a542906bb78))
- Remove token from codecov-workflow ([a5b4849](https://github.com/allohamora/cli/commit/a5b484938337fae1ed96563a18524ff5c112e2eb))

### Testing

- Fix console.log undefined in main.ts ([6d654e0](https://github.com/allohamora/cli/commit/6d654e032d7e10df5f60c819ba651a259f63b5e5))
- Add codecov-workflow tests ([5d5b0ba](https://github.com/allohamora/cli/commit/5d5b0ba9eb3eaac2ce1713eb3e3a17a7abc941e4))

### Chores

- Update dependencies ([d35b026](https://github.com/allohamora/cli/commit/d35b026e9db229d70a00c3dd8fe11a94f5f90b71))
- Update node and npm versions ([3df903d](https://github.com/allohamora/cli/commit/3df903de9d539a9bbdfe83a20508b4469819925f))
- **release:** 1.8.0 ([86bf2f7](https://github.com/allohamora/cli/commit/86bf2f7efa6d0760369abb0be520b9e0ac1cb16c))

### Other

- Merge tag '1.7.0' into develop ([8b83776](https://github.com/allohamora/cli/commit/8b837765f4fbe6adb29d4ba7f9907df94ca66204))
- Merge branch 'release/1.8.0' ([1111bae](https://github.com/allohamora/cli/commit/1111baeb631eef0716afbd6a5694e415f98b9973))

## [1.7.0](https://github.com/allohamora/cli/compare/1.6.2...1.7.0) (2022-05-28)

### Features

- Add docker ([4f3ec35](https://github.com/allohamora/cli/commit/4f3ec3525527fdf86b08ee802dc47597123e4d5e))
- Remove develop coverage badge ([cb15103](https://github.com/allohamora/cli/commit/cb1510339936962b45f74ced8ab860b7c8accd7d))
- Add npm badge ([a5cdfd6](https://github.com/allohamora/cli/commit/a5cdfd65faf04ecea395d6f7818c70ffc9b6444a))
- Add react:ts eslint config ([21b09fa](https://github.com/allohamora/cli/commit/21b09faf5f1915ccb93e34ac79ff13df35bb27c8))
- Add react:ts jest config ([331a4b5](https://github.com/allohamora/cli/commit/331a4b58dc32dba269a745d079e684cb537f0460))
- Add stylelint ([47047a8](https://github.com/allohamora/cli/commit/47047a8b895613f07410bea0ecfab0d1f526c9a1))
- Add stylelint prettier mutation ([75ab3ef](https://github.com/allohamora/cli/commit/75ab3efc68dbe41e5bcee68270fe0095eade81f7))
- Add mutations support to stylelint entrypoint ([405727a](https://github.com/allohamora/cli/commit/405727ac579848ffd29eff2e3a3a1bbb68bd236c))
- Add stylelint lint-staged integration ([df80edc](https://github.com/allohamora/cli/commit/df80edc5607461adb76fd1a8748a115e5e7864c6))
- Add stylelint description ([d0d8d25](https://github.com/allohamora/cli/commit/d0d8d2558c3a2c6284d48b991b32c04de5e4ab59))

### Bug Fixes

- Change stylelint configs to correct ([c03866f](https://github.com/allohamora/cli/commit/c03866f60776689d283a27311c2dc639fb622d44))
- Fix conflicts in react:ts configs ([215f3a4](https://github.com/allohamora/cli/commit/215f3a41d695aec7258fe2b3bc4103396283acb3))

### Refactor

- Mini optimization in main.ts ([9f8f012](https://github.com/allohamora/cli/commit/9f8f0129eea92b27ae20d5e78c4fd1c53f7be398))

### Testing

- Add docker tests ([1777b81](https://github.com/allohamora/cli/commit/1777b81b51a3eda79b06e3d52478a47b5850f2f0))
- Add stylelint tests ([3bd4a7f](https://github.com/allohamora/cli/commit/3bd4a7f4757b0789a4899692f0212d38c736d5a4))

### Continuous Integration

- Add codecov workflow ([c7178e4](https://github.com/allohamora/cli/commit/c7178e4ed3c5af92d0028fe1a9114f0c00328f7a))
- Add codecov token to workflow ([577d8b7](https://github.com/allohamora/cli/commit/577d8b7d7de6c283a6d78d0015379655706a1e48))

### Chores

- Add build badge ([bacb2c8](https://github.com/allohamora/cli/commit/bacb2c8d77938f3f5f81eae71ea9bc2f6c9c5ccd))
- Add another workflow badges ([4f06713](https://github.com/allohamora/cli/commit/4f06713900b5c0e5c78f022cede4c61dbef983c3))
- Add codecov badge ([7675ba9](https://github.com/allohamora/cli/commit/7675ba988cedeafb26ac4525859eb66b6b3f64e1))
- Add develop and master coverage ([c7c03ce](https://github.com/allohamora/cli/commit/c7c03ced8740b9b2c8f116221596965bc2027acd))
- Fix npm badge ([1429c27](https://github.com/allohamora/cli/commit/1429c278da950cb4e671f748e44478fe2f631779))
- Add npm link to npm badge ([596bbcc](https://github.com/allohamora/cli/commit/596bbcc97247b2b4f372abbfdc8d02de186fbc83))
- Add docker description ([ead518c](https://github.com/allohamora/cli/commit/ead518c127cc7ced0abe77ea3ed5c4e05da73f52))
- Change badge order ([0932125](https://github.com/allohamora/cli/commit/09321250357172a62e9046523ec0f252596bdf81))
- **release:** 1.7.0 ([f379499](https://github.com/allohamora/cli/commit/f379499755da7571161af830caa00399ad413d6e))

### Other

- Merge tag '1.6.2' into develop ([1aabe8a](https://github.com/allohamora/cli/commit/1aabe8af4ff86a4658c30834e81875774e6519e4))
- Merge branch 'release/1.7.0' ([22c9110](https://github.com/allohamora/cli/commit/22c91102e68ad75b988dfb540bad63c9ba4bab30))

## [1.6.2](https://github.com/allohamora/cli/compare/1.6.1...1.6.2) (2022-03-19)

### Bug Fixes

- Codeql dependabot conflict ([e85a9ee](https://github.com/allohamora/cli/commit/e85a9ee39a238931efdc47819edd8f96d2dfa434))

### Chores

- **release:** 1.6.2 ([6ef9383](https://github.com/allohamora/cli/commit/6ef9383a688f7a1f9acee56c83e064c02d9e36f0))

### Other

- Merge tag '1.6.1' into develop ([46c62d7](https://github.com/allohamora/cli/commit/46c62d77a55147383abd574c3147f5dd676fbff0))
- Merge branch 'release/1.6.2' ([452403d](https://github.com/allohamora/cli/commit/452403d7ae7bc35922445fe9f3cab930fd3d3569))

## [1.6.1](https://github.com/allohamora/cli/compare/1.6.0...1.6.1) (2022-03-19)

### Features

- Add dependabot description to README ([31ffd14](https://github.com/allohamora/cli/commit/31ffd146470cba8751127e54c16677e11ed9cc48))

### Chores

- **release:** 1.6.1 ([9f70fa9](https://github.com/allohamora/cli/commit/9f70fa92ccab1f3f50faa9a3fc1822a3595b3951))

### Other

- Merge tag '1.6.0' into develop ([8340f0e](https://github.com/allohamora/cli/commit/8340f0efa19664d48cc21d85602c076ff09954e2))
- Merge branch 'release/1.6.1' ([9bbec4b](https://github.com/allohamora/cli/commit/9bbec4b48d16510f7c1085a8f0847d240347b51d))

## [1.6.0](https://github.com/allohamora/cli/compare/1.5.2...1.6.0) (2022-03-19)

### Features

- Add dependabot ([9fc209b](https://github.com/allohamora/cli/commit/9fc209bc9bb6e5efaef02d952176417df4aff0d7))

### Testing

- Add dependabot tests ([2852f76](https://github.com/allohamora/cli/commit/2852f76176d8a5453783fd82c702b5589adec853))

### Continuous Integration

- Add dependabot config ([9ab317b](https://github.com/allohamora/cli/commit/9ab317b859c9d45c73f35d7fca794700689f06e8))

### Chores

- **release:** 1.6.0 ([8e9307e](https://github.com/allohamora/cli/commit/8e9307ed4ce4d5c5e0ce36722a97e49f0da18bb5))

### Other

- Merge tag '1.5.2' into develop ([da7e999](https://github.com/allohamora/cli/commit/da7e9990747e82568ef4b2930d5fea19e3a438ec))
- Merge branch 'release/1.6.0' ([5812106](https://github.com/allohamora/cli/commit/5812106757759bd96930e611e648b606f2fc2d93))

## [1.5.2](https://github.com/allohamora/cli/compare/1.5.1...1.5.2) (2022-03-02)

### Bug Fixes

- Fix author link in README ([a5038b5](https://github.com/allohamora/cli/commit/a5038b5d785e8dbb48123b565e188af7ddc88275))

### Chores

- **release:** 1.5.2 ([d59fde9](https://github.com/allohamora/cli/commit/d59fde9eb76f8e5471f888c3e87406907e58964f))

### Other

- Merge tag '1.5.1' into develop ([16a1659](https://github.com/allohamora/cli/commit/16a16591741f2ec2b1618d6ec7917380a38428f9))
- Merge branch 'release/1.5.2' ([bf9d0b1](https://github.com/allohamora/cli/commit/bf9d0b1d4dd10e322ae2fd0dcfa8a09049adecc6))

## [1.5.1](https://github.com/allohamora/cli/compare/1.5.0...1.5.1) (2022-03-02)

### Bug Fixes

- Fix author links ([274e99a](https://github.com/allohamora/cli/commit/274e99a7495f5544ad2c2f9b27134f66e5a83171))

### Chores

- Update engines in README ([679c7b4](https://github.com/allohamora/cli/commit/679c7b4841a34079b6e6aa3d780f99e5edfe25c3))
- Update package-lock.json ([a481d4e](https://github.com/allohamora/cli/commit/a481d4ea19158c246a079a71a27ada7ad3eb931c))
- **release:** 1.5.1 ([b00cc5b](https://github.com/allohamora/cli/commit/b00cc5b16d2081ec6e288177a249691c6612b0a9))

### Other

- Merge tag '1.5.0' into develop ([fc26c71](https://github.com/allohamora/cli/commit/fc26c717fe418b74740d5e61da09e333d1e802cb))
- Merge branch 'release/1.5.1' ([e62558d](https://github.com/allohamora/cli/commit/e62558d7713ad90a389b5acaf7388060debdd557))

## [1.5.0](https://github.com/allohamora/cli/compare/1.4.1...1.5.0) (2022-02-08)

### Features

- Improve prettier config ([dd5338c](https://github.com/allohamora/cli/commit/dd5338cf5371252cd04fab80540047c1c89c980a))

### Chores

- Update engines ([3330a91](https://github.com/allohamora/cli/commit/3330a91cc84d913503b2a58bbd00a43a6c32fca3))
- **release:** 1.5.0 ([1831749](https://github.com/allohamora/cli/commit/183174943c4cb0ce3b249d0a9a417cb9ec491ca3))

### Other

- Merge tag '1.4.1' into develop ([d01f17c](https://github.com/allohamora/cli/commit/d01f17c9bb619359e8a57e215d231c318547b21e))
- Merge branch 'release/1.5.0' ([97db9a3](https://github.com/allohamora/cli/commit/97db9a3333abb2e784bed66db92ff71bb05d0161))

## [1.4.1](https://github.com/allohamora/cli/compare/1.4.0...1.4.1) (2022-02-04)

### Bug Fixes

- Replace any push to any branch push to fix double actions bug ([3f9440e](https://github.com/allohamora/cli/commit/3f9440e2c44c15fd47a3146a043818d9eba35b44))

### Chores

- Bump dev dependencies ([a2ff7cf](https://github.com/allohamora/cli/commit/a2ff7cf8ef3fb4b22360d0a2118e9257af1aa230))
- Bump eslint-plugin-beautiful-sort version ([0642ae6](https://github.com/allohamora/cli/commit/0642ae6a53d413fd56a826435c014ab42034fe9b))
- Bump eslint-plugin-beautiful-sort version ([7f4a00b](https://github.com/allohamora/cli/commit/7f4a00b003d357988591f41cdba0f6e865243ee1))
- **release:** 1.4.1 ([b995583](https://github.com/allohamora/cli/commit/b9955837eaa67f80ed758d0d49809ca0a42a0bd7))

### Other

- Merge tag '1.4.0' into develop ([ba2ebe7](https://github.com/allohamora/cli/commit/ba2ebe75e2e04ff470a6f3d569fc5377b1b3fbcc))
- Merge branch 'release/1.4.1' ([f014f57](https://github.com/allohamora/cli/commit/f014f57782800e16f8d993a783c94fe97bebe630))

## [1.4.0](https://github.com/allohamora/cli/compare/1.3.0...1.4.0) (2022-02-01)

### Features

- Add jest script for js category ([7209ca1](https://github.com/allohamora/cli/commit/7209ca15ea15163fcf9d97112d935d18047eb0be))
- Add test-workflow script for js category ([1ffbcbb](https://github.com/allohamora/cli/commit/1ffbcbb1773f936553ccaecffcc5f35df0e10758))
- Add jest:watch script to js/jest ([66d7d67](https://github.com/allohamora/cli/commit/66d7d67c6d2cc6bb16bc90df2d443b0665b4c2c8))
- Add jest mutator to lint-staged and refactor lint-staged mutators ([eec68ac](https://github.com/allohamora/cli/commit/eec68ac8c11f15e8ce6e0b04d466c1ad8a2c901d))
- Add tests for standard-version ([4134cfa](https://github.com/allohamora/cli/commit/4134cfae73c0ef630916304900cc74385ad4970f))
- Add codeql-workflow ([39ce3ed](https://github.com/allohamora/cli/commit/39ce3ed77b89d81ce0db9add3a2552ed05b2a7ed))
- Add build-workflow ([efdad73](https://github.com/allohamora/cli/commit/efdad73e6746f75d7a78fa13905be66e6e38c0b6))
- Add CI: true env to build and test workflows ([e08a2cf](https://github.com/allohamora/cli/commit/e08a2cf842ca23a30ba1e421e45858c343151145))
- Add jest mutation to eslint ([2ae637b](https://github.com/allohamora/cli/commit/2ae637b0f480137b9fa73bb92ef41b2a748f4020))

### Bug Fixes

- Rename main job in release-worflow to correct ([a07a8be](https://github.com/allohamora/cli/commit/a07a8be4729ea0933a6f8d70dcaf835bf7cae0d8))
- Replace npm test to npm run test in test-workflow ([18e78e3](https://github.com/allohamora/cli/commit/18e78e30565c717a62e6d2bbe3c7e3ce66694b9f))
- Fix invalid reduce in buildTemplate ([cba23b9](https://github.com/allohamora/cli/commit/cba23b9492ddc39d1b7f138ddb87b500cc7fc0f4))
- Fix invalid path to husky in lint-staged ([a98ecfb](https://github.com/allohamora/cli/commit/a98ecfbad3321902662f7e3054622c5854550d5b))
- Fix invalid husky integration ([a48982e](https://github.com/allohamora/cli/commit/a48982eef87caa75992a501da8e7985bde8d0241))
- Fix husky.entrypoint crash ([730c927](https://github.com/allohamora/cli/commit/730c9270a6d954b13aa2e02d8641bdee039cd367))
- Add collectCoverageFrom to jest configs ([f2a341b](https://github.com/allohamora/cli/commit/f2a341b37372ba00ce3e6b9d1e43651a0367bb19))

### Refactor

- Add prettyMultilineFormat ([036680c](https://github.com/allohamora/cli/commit/036680c03d7bc2045a44d1dea9bdfd865f35ee82))
- Move filename to const WORKFLOW_FILENAME ([b61c46e](https://github.com/allohamora/cli/commit/b61c46e9bebe414a85bff5070a66b49cf570766e))
- Rename libs to utils ([fe1051e](https://github.com/allohamora/cli/commit/fe1051e633c39773632d094288aa2014e10ec87c))
- Split eslint and prettier to modules for optional integration feature ([7fccabc](https://github.com/allohamora/cli/commit/7fccabc36d820b543356824c7334268ec0cc71f8))
- Move categories to states ([93356ba](https://github.com/allohamora/cli/commit/93356bae29b6d2af5bb7b3207a2b840d5c99713b))
- Move context to global ([77a0fff](https://github.com/allohamora/cli/commit/77a0fffec283a32551aa0cfb6bd6d2e9ff76ebf9))
- Migrate commitlint and husky to modules ([4a710f4](https://github.com/allohamora/cli/commit/4a710f4766d19050f973e5eb73939900d1ac9e25))
- Migrate jest to module ([cec9e1f](https://github.com/allohamora/cli/commit/cec9e1f973cc6067f79e913e32131b4c8e6765b0))
- Migrate lint-staged to module ([655be3c](https://github.com/allohamora/cli/commit/655be3ce38e7aeeb05f79dbc75eeefdccdd1bf1e))
- Migrate standard-version to module ([399e2df](https://github.com/allohamora/cli/commit/399e2dfb552887b82f8a3e008cf70a052443737f))
- Migrate release-workflow to module ([829d3d5](https://github.com/allohamora/cli/commit/829d3d5598a302cbe9932f68988fa534558548a6))
- Migrate test-workflow to module ([a935c94](https://github.com/allohamora/cli/commit/a935c94efccb40528223beef4d7674d0c0ae9ce3))
- Move package consts to package.config.ts ([92f55e5](https://github.com/allohamora/cli/commit/92f55e5f02bc5abeebbb8ae502f2bca0769b4263))
- Add installed utils ([053ef73](https://github.com/allohamora/cli/commit/053ef73fb9c889f029005f7a21c1ba1a58ddb41a))
- Move consts from .config to .const to resolve circulal dependencies ([49aeb01](https://github.com/allohamora/cli/commit/49aeb01681ca76f6cf58ddd498a1fb8a72410b12))
- Add mutator ([c4b22a2](https://github.com/allohamora/cli/commit/c4b22a2fd8c44f27f23a92e3b8960ef8256987a9))
- Move jest.config consts to jest.const ([4feaaa0](https://github.com/allohamora/cli/commit/4feaaa00244e6b2a791f3c7bbe2377561aefb7c6))
- Remove unused promiseChain ([1bbbd07](https://github.com/allohamora/cli/commit/1bbbd070039d81dcab1c8a4e91a9e859189da11f))
- Rename string utils methods ([435d520](https://github.com/allohamora/cli/commit/435d5205c21f6bbce89cf1a497ad7deb9887600f))
- Rename mutator to mutation ([00e6090](https://github.com/allohamora/cli/commit/00e6090944abc39cd90dab732a47fe9e45a4227b))
- Rename readableString to readableMultilineString ([d3590f4](https://github.com/allohamora/cli/commit/d3590f48d10aaa9fc57cb7067a1042b4d4a7851d))
- Add useful comments to jest ([9b26173](https://github.com/allohamora/cli/commit/9b26173055fe82d504da4333a435a2546b7b9600))
- Add missed consts ([da5e90f](https://github.com/allohamora/cli/commit/da5e90f9c657b66541b1b7a7a9e2fd2df848e195))
- Rename codeQl to codeql ([a8045fe](https://github.com/allohamora/cli/commit/a8045fefa62e3af0ed62f501ac5d317fb7f53249))

### Testing

- Add tests for src/utils/fs ([4658191](https://github.com/allohamora/cli/commit/46581919cb5646308162696ccd44249635f07c53))
- Fix text in src/utils/fs test ([9044c57](https://github.com/allohamora/cli/commit/9044c575dc03c85d6f4500673b7685d46d504565))
- Add should words to fs test ([f72fafa](https://github.com/allohamora/cli/commit/f72fafa8bf63d1bb218fd3bd11c02735a37c15a6))
- Add tests for src/utils/string ([9d26050](https://github.com/allohamora/cli/commit/9d26050768f78e35857a96b8dbf9b0ca243b4462))
- Add tests for src/utils/console ([32a1079](https://github.com/allohamora/cli/commit/32a107928a33388de0131b4412f2262748670789))
- Add tests for src/utls/fp ([4d405f4](https://github.com/allohamora/cli/commit/4d405f4a905d70e77d1560d27cad7cdb26741747))
- Add tests for src/utils/github ([7db6f3b](https://github.com/allohamora/cli/commit/7db6f3b07a869e7687f5cadebd9728fe5f7a2dfe))
- Add tests for src/utils/json ([350674d](https://github.com/allohamora/cli/commit/350674d907645954aa933473ee22d21778f60dcf))
- Remove global.JSON mock from fs test ([9aa3e46](https://github.com/allohamora/cli/commit/9aa3e464644241a575b67c6c32c77fd7e38a95fc))
- Add tests for src/utils/npm ([4f0f76d](https://github.com/allohamora/cli/commit/4f0f76ddb19b454068ec1d9668ec4d0ab1680542))
- Add tests for src/utils/categories ([519e3b5](https://github.com/allohamora/cli/commit/519e3b5b3cb41c99e9d631f4d9437faffd75eff2))
- Add tests for src/utils/path ([4d6396e](https://github.com/allohamora/cli/commit/4d6396ec0aee2edf5b1c99d301e068d0940b648a))
- Add tests for src/utils/prompt ([a31c6ec](https://github.com/allohamora/cli/commit/a31c6ece792de58368ad43ed9f1bb23af399bdce))
- Add tests for run-command ([f10a33a](https://github.com/allohamora/cli/commit/f10a33a0999169265ab1bdafca74545565147f40))
- Add tests for createTypeState ([1b5bd09](https://github.com/allohamora/cli/commit/1b5bd09c21cd8b7dcc75ce3a4868785fb0a5d764))
- Add createConfigState tests ([55d3b82](https://github.com/allohamora/cli/commit/55d3b8261fa0ce05d3c23f16c3d258076200f091))
- Add tests for createCategoryState ([aca5f4a](https://github.com/allohamora/cli/commit/aca5f4a2527a64ee6706caf4a9946ed5878cd6c3))
- Add tests for src/utils/installed ([8f63a2b](https://github.com/allohamora/cli/commit/8f63a2b77901b87686671bb6ec251de99bc01aaa))
- Add tests for utils/mutator ([b267a0e](https://github.com/allohamora/cli/commit/b267a0eeb40f0adb4591e8dfdade155374f371b1))
- Add installing tests ([e152979](https://github.com/allohamora/cli/commit/e15297900ed0f5310f6cf38b2877f4f25f3f5108))
- Add tests for commitlint ([37ff133](https://github.com/allohamora/cli/commit/37ff13374923cc85ef48ce64b75a2b6469338748))
- Add tests for eslint ([c4f29a3](https://github.com/allohamora/cli/commit/c4f29a39ec68efcfe3d21f2835c75899b6a4e1ad))
- Add tests for husky ([17e0816](https://github.com/allohamora/cli/commit/17e0816a8343e502f23b7dc280654dbebde559ed))
- Add tests for jest ([3f2fa27](https://github.com/allohamora/cli/commit/3f2fa274e5d766d0a86a04eb6dee9667bb2ebcae))
- Add tests for lint-staged ([93194f1](https://github.com/allohamora/cli/commit/93194f1d813303cab34444a1ddcfb9b35f7d2fcf))
- Add tests for prettier ([a1ba2a5](https://github.com/allohamora/cli/commit/a1ba2a52952642c9f6f63c3066f4aeec4740d829))
- Add tests for release-workflow ([1119b32](https://github.com/allohamora/cli/commit/1119b3226003f1217bf3e8e8474538bdb462bbc5))
- Add tests for test-workflow ([9a52d68](https://github.com/allohamora/cli/commit/9a52d68ebc15ec1f8b1daecf2381582f33672010))
- Add tests for categories ([4276f1c](https://github.com/allohamora/cli/commit/4276f1c6f26c4eb23bef51c967b349af59682b91))
- Add tests for index file ([4446782](https://github.com/allohamora/cli/commit/44467822dba2e1103f3e5862c30e971a83977787))
- Add tests for readableMultilineString ([7edd6a5](https://github.com/allohamora/cli/commit/7edd6a572fb4ae2362dd106de14f3305b6802018))
- Add tests for codeql-workflow ([b045da2](https://github.com/allohamora/cli/commit/b045da26ae482f024322864f871ef9ebd02d07f6))
- Add tests for build-workflow ([e38af6a](https://github.com/allohamora/cli/commit/e38af6a18e042e21ee73175ca0fb46973a65cc91))
- Add tests for eslint jestMutation ([b2f8f53](https://github.com/allohamora/cli/commit/b2f8f5391c8aff5ff64419688371dafb9cc40ca5))

### Continuous Integration

- Add test workflow ([eb360db](https://github.com/allohamora/cli/commit/eb360dbaf7f2dddbd97344c573cd31350b208ea9))
- Add build workflow ([5f04966](https://github.com/allohamora/cli/commit/5f049667ed0c03bff0ca4907ad24aa5b4b12c258))
- Add codeql workflow ([50cbff6](https://github.com/allohamora/cli/commit/50cbff6b2ab181e710ad886f1df58b2240a3301b))
- Apply reduction for push any branch ([0dcf6af](https://github.com/allohamora/cli/commit/0dcf6af12f5330ff7a686683a3937ad37bfe27ce))

### Chores

- Update README ([0cbce44](https://github.com/allohamora/cli/commit/0cbce4402ba973e1275c19ebe001fa52d8695dcb))
- **README:** Fix typo in lint-staged description ([fc1f161](https://github.com/allohamora/cli/commit/fc1f1615c63606fdd1b0b2652408686848b9c3e4))
- **README:** Update standard-version description ([34a63bf](https://github.com/allohamora/cli/commit/34a63bf980d6de986dddcbe1fe30d816c800312f))
- Update package.json description ([91b3788](https://github.com/allohamora/cli/commit/91b378849f79d9ba81407fe32034570ffc361445))
- Update dependencies ([eb2abc6](https://github.com/allohamora/cli/commit/eb2abc616bd1dfa7b9cea30cdac185d036407c25))
- Add jest description to README ([14cb10f](https://github.com/allohamora/cli/commit/14cb10f8914b821497388638bd56b703c578245f))
- Add prestart script ([bc9ea42](https://github.com/allohamora/cli/commit/bc9ea422455ef6095f18b04987426b176f42bee8))
- Apply release-workflow fix ([3c51858](https://github.com/allohamora/cli/commit/3c51858a2b759cc7bc4308613eb1da57289de103))
- Add test-workflow description to README ([586649b](https://github.com/allohamora/cli/commit/586649bb51672c3c806b4c1c9e76fe7c7c22ae24))
- Update standard-version description ([56d6e86](https://github.com/allohamora/cli/commit/56d6e869426fb66c88b96ed3dda5f4f121fd08ec))
- Fix standard-version description ([c618a67](https://github.com/allohamora/cli/commit/c618a672d553b10ec937c8bcf4c90bb9f9c2ddb7))
- Remove invalid space in README ([72b9094](https://github.com/allohamora/cli/commit/72b90949473bb9e465267c705343ac24ce081a9a))
- Init jest ([9bb5448](https://github.com/allohamora/cli/commit/9bb5448796abaf736922468e8423bd91dac4d9a7))
- Add test option for lint-staged .ts ([0d9793a](https://github.com/allohamora/cli/commit/0d9793a7f27f5fdc4eb01c989b53275ab4935c7a))
- Npm update ([4369166](https://github.com/allohamora/cli/commit/43691668d1f5a839d192b9152f24e9cf657d10d1))
- Update commitlint packages ([467661c](https://github.com/allohamora/cli/commit/467661cf8e80a90bc0936b8c6b07f22b9fc205eb))
- Update Readme ([5244758](https://github.com/allohamora/cli/commit/5244758ef1f766ae7685873b27e494c756776eba))
- **release:** 1.4.0 ([2bf8a77](https://github.com/allohamora/cli/commit/2bf8a7789a9a39443f8e13a3fb9550ba5628ca2c))
- Update @typescript-eslint dependencies ([b2afe07](https://github.com/allohamora/cli/commit/b2afe07f2d1b47627985f5cdfd285a97882316cd))

### Other

- Merge branch 'feature/jest' into develop ([cc6f862](https://github.com/allohamora/cli/commit/cc6f862539af38e5c4e01149418bc215c54d4079))
- Merge branch 'feature/test-workflow' into develop ([2b505bf](https://github.com/allohamora/cli/commit/2b505bfafb940878d70208067fa78b05b120b31f))
- Merge branch 'feature/state-test' into develop ([5560b0a](https://github.com/allohamora/cli/commit/5560b0a282308039bbd978648f9660be94958bc4))
- Merge branch 'release/1.4.0' ([58ef0f3](https://github.com/allohamora/cli/commit/58ef0f3daddca6e3933b5869d4b53e589f0bcae7))

## [1.3.0](https://github.com/allohamora/cli/compare/1.2.3...1.3.0) (2022-01-23)

### Features

- Add eslint default config ([662c865](https://github.com/allohamora/cli/commit/662c8657701a35255bca566fe5b40eb21bbde150))

### Chores

- Update README ([5922724](https://github.com/allohamora/cli/commit/5922724599778e689d3d6d46d554031c237d2b4f))
- Fix typo in README ([cb48e04](https://github.com/allohamora/cli/commit/cb48e04673f0672dd2346635edd973ecfc92a2af))
- **release:** 1.3.0 ([8da2cbb](https://github.com/allohamora/cli/commit/8da2cbb6ffdfd5efb0d78b0b1567439006e1656d))

### Other

- Merge tag '1.2.3' into develop ([fed02e6](https://github.com/allohamora/cli/commit/fed02e60409f83a7dc5a48c3f2fc7a0d39f10676))
- Merge branch 'release/1.3.0' ([31739fa](https://github.com/allohamora/cli/commit/31739fa8b3f57afa9e33b99bc7b4fcbda9d5ff25))

## [1.2.3](https://github.com/allohamora/cli/compare/1.2.2...1.2.3) (2022-01-23)

### Bug Fixes

- Add format to release-worflow content ([1fd2cd9](https://github.com/allohamora/cli/commit/1fd2cd926ed406faf084ee60c268306a06e7697c))

### Refactor

- Rename utils to libs ([49dd550](https://github.com/allohamora/cli/commit/49dd550de49dc5c79a637a53374d076db16c7a03))

### Chores

- Update README ([b148d50](https://github.com/allohamora/cli/commit/b148d505f057aa0ab652e85f11ff9a0d740e4e06))
- Add anchor links to README ([75b085c](https://github.com/allohamora/cli/commit/75b085c1228a0d0982a150e4cabf0f31bb5e79e2))
- Add relative links to README ([8e2bfab](https://github.com/allohamora/cli/commit/8e2bfab32580faeb52f44a226a4a03d45ebfef4e))
- Update package.json keywords ([10a6e86](https://github.com/allohamora/cli/commit/10a6e8604c1b2646766f95097f8354f0292ec10b))
- Update release-workflow README ([6601553](https://github.com/allohamora/cli/commit/6601553aa7007f32c508bbf07516c0aee7219dc4))
- **release:** 1.2.3 ([ef1fbd7](https://github.com/allohamora/cli/commit/ef1fbd70e716c76bd0fc0c6e05cf2205e3cf511b))

### Other

- Merge tag '1.2.2' into develop ([7d962c8](https://github.com/allohamora/cli/commit/7d962c81cd96a86aa27d411f66b692e989f2e2ae))
- Merge branch 'develop' of https://github.com/Allohamora/cli into develop ([03bcb21](https://github.com/allohamora/cli/commit/03bcb212a83dc7f8b163569bf403211a96eaf720))
- Merge branch 'release/1.2.3' ([2d8bbbd](https://github.com/allohamora/cli/commit/2d8bbbdf21332a8b12f491ba389480ef2bf78e6c))

## [1.2.2](https://github.com/allohamora/cli/compare/1.2.1...1.2.2) (2022-01-20)

### Bug Fixes

- Rename create-release-workflow to release-workflow ([608673f](https://github.com/allohamora/cli/commit/608673f1201418e82ea9cb8c6cbfeb88c4fdcae4))

### Continuous Integration

- Update release workflow ([7b56a76](https://github.com/allohamora/cli/commit/7b56a7697f5c2b441ccbe17b23673b3953d412a9))

### Chores

- **release:** 1.2.2 ([9d5dd2d](https://github.com/allohamora/cli/commit/9d5dd2db9efa75a72727910f69d8a2956f3ad944))

### Other

- Merge branch 'release/1.2.2' ([c6ef794](https://github.com/allohamora/cli/commit/c6ef794fc7437f128b87cd4069c1c403a9fc684d))

## [1.2.1](https://github.com/allohamora/cli/compare/1.2.0...1.2.1) (2022-01-20)

### Bug Fixes

- Change CHANGELOG.md parser to correct ([d4ab1fb](https://github.com/allohamora/cli/commit/d4ab1fb8b8d7b5c835ab81d2a69380b06b1da4b5))

### Chores

- **release:** 1.2.1 ([28fb9bc](https://github.com/allohamora/cli/commit/28fb9bc0392c67e2b9d2e5a25b45a6d30bdc155b))

### Other

- Merge tag '1.2.0' into develop ([01cab1e](https://github.com/allohamora/cli/commit/01cab1e201e804e6a486ee6537a6d5a4a4840750))
- Merge branch 'release/1.2.1' ([6f4ae5a](https://github.com/allohamora/cli/commit/6f4ae5a974a92d2210c7cafd42d4b9fa7000ef5c))

## [1.2.0](https://github.com/allohamora/cli/compare/1.1.1...1.2.0) (2022-01-20)

### Features

- Add github create release workflow ([9c6cbef](https://github.com/allohamora/cli/commit/9c6cbefa2fb3a451094f7d57a17fa9396593f650))

### Refactor

- Rename action to workflow ([28f6d2b](https://github.com/allohamora/cli/commit/28f6d2b3b076290b2d0e6fc809a3089d23e35ca0))

### Continuous Integration

- Add release workflow ([558bf0b](https://github.com/allohamora/cli/commit/558bf0bb5d9b82f493548c189e594e6920d7ad00))

### Chores

- Update CHANGELOG.md ([5b2668e](https://github.com/allohamora/cli/commit/5b2668e9df08495ade9d9aa5f4baa6be11adf3cc))
- Fix CHANGELOG.md ([88c74da](https://github.com/allohamora/cli/commit/88c74da4e7ff36d585e808a58c22a873ba6ef022))
- Fix error in CHANGELOG.md ([b3d721c](https://github.com/allohamora/cli/commit/b3d721cb2b2cbae29bb28edfa83d1dbbaa057fe6))
- **release:** 1.2.0 ([80d563c](https://github.com/allohamora/cli/commit/80d563cf02a1876dccbe65e5c4de276f130f1fc1))

### Other

- Merge branch 'release/1.2.0' ([616f8f3](https://github.com/allohamora/cli/commit/616f8f3d2f25b7deb46b50ab45c592e8c4d92b52))

## [1.1.1](https://github.com/allohamora/cli/compare/1.1.0...1.1.1) (2021-12-26)

### Bug Fixes

- Standard-version without prefix incorrect behavior ([34120bf](https://github.com/allohamora/cli/commit/34120bf3a722106a0eefda2b8f69169072ac5d69))

### Chores

- **release:** 1.1.1 ([2fed28f](https://github.com/allohamora/cli/commit/2fed28f746d778b12d2d97ba97bca715f4cb0fde))

## [1.1.0](https://github.com/allohamora/cli/compare/1.0.0...1.1.0) (2021-12-26)

### Bug Fixes

- And style js scripts ([8a3c5bf](https://github.com/allohamora/cli/commit/8a3c5bf9460fbb555c2266b396bd3a856b0ababe))

### Refactor

- Rename bad named variables ([1530c22](https://github.com/allohamora/cli/commit/1530c2215b1f064dde622064adbff28319210fa7))
- State using and composing ([7963daf](https://github.com/allohamora/cli/commit/7963dafbccf41123f51074430df1cc2515b44c01))
- Index.ts entrypoint ([2f28008](https://github.com/allohamora/cli/commit/2f28008e7d971c44c51fe431c430553780ae7d01))

### Styling

- Remove not pretty line breaks ([0243639](https://github.com/allohamora/cli/commit/024363986dc019ba31f0d31273d6f2a4ab4b0068))

### Chores

- Fix incorrect main field ([a2b1890](https://github.com/allohamora/cli/commit/a2b1890d2dfefc38c22bfcf2a91fcdb15fea0eb9))
- Update packages ([282c5a5](https://github.com/allohamora/cli/commit/282c5a599e229b95cbbd8c3d91fc294ccc05adbb))
- **release:** 1.1.0 ([dd41807](https://github.com/allohamora/cli/commit/dd4180724ae6b0f199874a68e68aa9f6278a3ab6))

### Other

- Merge branch 'release/1.0.0' ([f43c8f2](https://github.com/allohamora/cli/commit/f43c8f2d50b680a3e00516f5013b9752a0f7ae26))

## 1.0.0 (2021-12-11)

### Features

- Add base scripts ([8450be2](https://github.com/allohamora/cli/commit/8450be23d4af59b9257e3953b7eda606330c2957))
- Add eslint scripts ([b26b012](https://github.com/allohamora/cli/commit/b26b012cc8cc7b32a48590c44b11709f4674d376))
- Add prettier scripts ([cf1135c](https://github.com/allohamora/cli/commit/cf1135ce4c621b1f8d9ae34db7954420b5f48e83))
- Add pretty print for logs ([8f9c231](https://github.com/allohamora/cli/commit/8f9c231a0ebca37859a481dc3c72a57c8af12eca))
- Add kebablize for options select ([2ffc089](https://github.com/allohamora/cli/commit/2ffc089d3d93b69145f64c34fffeb917d067a7b2))

### Bug Fixes

- Invalid config value bug ([d72c314](https://github.com/allohamora/cli/commit/d72c314c287f00ac589bb9d58ba0a5f131444648))
- Husky addHook bug ([60aad35](https://github.com/allohamora/cli/commit/60aad35da3821b83d8af807ce6e958ea3e793373))
- Eslint node:ts config ([a9bfe7d](https://github.com/allohamora/cli/commit/a9bfe7dd8db35280803d8d1e435bed3b805f5e22))
- AddHook invalid args bug ([1713a93](https://github.com/allohamora/cli/commit/1713a9343f1a16ce1ce450e3756741424d2ab365))
- Husky invalid command bug ([a09966f](https://github.com/allohamora/cli/commit/a09966f0faaccba035b4943aa4fe5fb9e7434a1c))
- Missed reset in white ([d028db4](https://github.com/allohamora/cli/commit/d028db4be37d72aca71b01c92c4e297ab7dfff00))
- Rename commitLint to commitlint ([d35b350](https://github.com/allohamora/cli/commit/d35b3501d35eb54c2eae1c3da2d2afc91f3593bc))
- Incorrect pattern in eslint fix script ([6eda113](https://github.com/allohamora/cli/commit/6eda11350c0b7e2fa869a5855df4493cd8cf8ff5))

### Styling

- Apply lint:fix ([8f5221e](https://github.com/allohamora/cli/commit/8f5221ea5b75d03f11656c029ca66ae7710df679))
- Apply format:fix ([bceed7c](https://github.com/allohamora/cli/commit/bceed7ca40be789410c4a2b40098a077c33ac190))
- Format README.md ([6b1eb26](https://github.com/allohamora/cli/commit/6b1eb261061ee93a63aacfb71cf8954d9de271f1))

### Chores

- Add typescript, rollup and base scripts ([4731cdf](https://github.com/allohamora/cli/commit/4731cdf1fd728c819dcb4b9bfe9865a1fcce6be1))
- Fix build and dev scripts ([ca2f4c9](https://github.com/allohamora/cli/commit/ca2f4c93195906ee3b45e1b8f3a263f5c90e8006))
- Fix dev script ([ba4eb5c](https://github.com/allohamora/cli/commit/ba4eb5cf093f614c2eda0d6b292cf1d63a7d7f03))
- Add husky, commitlint, prettier, standard-version, eslint, lint-staged ([d58568e](https://github.com/allohamora/cli/commit/d58568ee885a35d4609041357126f11b495f47c2))
- Update Readme.md ([a08bd8b](https://github.com/allohamora/cli/commit/a08bd8bea0eba961eda3194eb954445f9feaa05f))
- Update Readme.md ([218fa7d](https://github.com/allohamora/cli/commit/218fa7df07d4a6fa9f98b58e897bb25a4aabe103))
- Add description ([839fa36](https://github.com/allohamora/cli/commit/839fa36ee70e9db360f3e133a013d10ffb887c8b))
- **release:** 1.0.0 ([6ba1892](https://github.com/allohamora/cli/commit/6ba1892495f42fee064087b8c11ff822f4518786))

### Other

- Initial commit ([7088541](https://github.com/allohamora/cli/commit/7088541c7aa1e66e848250967df72c5c55e641e1))
