import { presetState, fileSystem, terminal } from '#__tests__/setup-test-context.ts';
import { standardVersion } from '#src/categories/js/standard-version/standard-version.installer.ts';
import { beforeEach, describe, expect, it } from 'vitest';

describe('standard-version.installer', () => {
  beforeEach(() => {
    presetState.setJsPreset('default');
  });

  describe('standardVersion', () => {
    it('installs standard-version and writes repository-aware config', async () => {
      const repositoryUrl = 'https://github.com/Allohamora/cli';
      fileSystem.seed({ packageJson: { homepage: `${repositoryUrl}#readme` } });

      await standardVersion();

      expect(terminal.getCommands()).toEqual([['npm', ['i', '-D', 'standard-version']]]);
      expect(fileSystem.readJson('.versionrc.json')).toEqual({
        types: [
          { type: 'feat', section: 'Features' },
          { type: 'fix', section: 'Bug Fixes' },
          { type: 'chore', hidden: true },
          { type: 'docs', hidden: true },
          { type: 'style', hidden: true },
          { type: 'refactor', hidden: true },
          { type: 'perf', hidden: true },
          { type: 'test', hidden: true },
        ],
        commitUrlFormat: `${repositoryUrl}/commit/{{hash}}`,
        compareUrlFormat: `${repositoryUrl}/compare/{{previousTag}}...{{currentTag}}`,
      });
    });

    it('uses placeholder repository url when package homepage is missing', async () => {
      await standardVersion();

      expect(fileSystem.readJson('.versionrc.json')).toEqual({
        types: [
          { type: 'feat', section: 'Features' },
          { type: 'fix', section: 'Bug Fixes' },
          { type: 'chore', hidden: true },
          { type: 'docs', hidden: true },
          { type: 'style', hidden: true },
          { type: 'refactor', hidden: true },
          { type: 'perf', hidden: true },
          { type: 'test', hidden: true },
        ],
        commitUrlFormat: '<repository url>/commit/{{hash}}',
        compareUrlFormat: '<repository url>/compare/{{previousTag}}...{{currentTag}}',
      });
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
