import { configState, fileSystem, terminal } from '#__tests__/setup-test-context.ts';
import { defaultConfig } from '#src/categories/js/standard-version/config/default.config.ts';
import { standardVersion } from '#src/categories/js/standard-version/standard-version.entrypoint.ts';

describe('standard-version.entrypoint', () => {
  beforeEach(() => {
    configState.setConfig('default');
  });

  describe('standardVersion', () => {
    it('installs standard-version and writes repository-aware config', async () => {
      const repositoryUrl = 'https://github.com/Allohamora/cli';
      fileSystem.seed({ packageJson: { homepage: `${repositoryUrl}#readme` } });

      await standardVersion();

      expect(terminal.getCommands()).toEqual([['npm', ['i', '-D', 'standard-version']]]);
      expect(fileSystem.readJson('.versionrc.json')).toEqual(defaultConfig.createConfig(repositoryUrl));
    });

    it('uses placeholder repository url when package homepage is missing', async () => {
      await standardVersion();

      expect(fileSystem.readJson('.versionrc.json')).toEqual(defaultConfig.createConfig('<repository url>'));
    });

    it('adds release scripts to package.json', async () => {
      fileSystem.seed({ packageJson: { scripts: { test: 'vitest' } } });

      await standardVersion();

      expect(fileSystem.readJson('package.json')).toEqual({
        scripts: {
          test: 'vitest',
          release: 'standard-version --tag-prefix=',
          'release:minor': 'standard-version --release-as minor --tag-prefix=',
          'release:patch': 'standard-version --release-as patch --tag-prefix=',
          'release:major': 'standard-version --release-as major --tag-prefix=',
        },
      });
    });
  });
});
