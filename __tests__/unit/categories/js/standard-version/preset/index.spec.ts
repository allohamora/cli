import { getStandardVersionPreset } from '#src/categories/js/standard-version/preset/index.ts';
import { describe, expect, it } from 'vitest';

describe('standard-version/preset', () => {
  it('returns repository-aware changelog link config', () => {
    expect(getStandardVersionPreset().createConfig('https://github.com/allohamora/cli')).toEqual({
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
      commitUrlFormat: 'https://github.com/allohamora/cli/commit/{{hash}}',
      compareUrlFormat: 'https://github.com/allohamora/cli/compare/{{previousTag}}...{{currentTag}}',
    });
  });

  it('returns release scripts', () => {
    expect(getStandardVersionPreset().scripts).toEqual([
      { name: 'release', script: 'standard-version --tag-prefix=' },
      { name: 'release:minor', script: 'standard-version --release-as minor --tag-prefix=' },
      { name: 'release:patch', script: 'standard-version --release-as patch --tag-prefix=' },
      { name: 'release:major', script: 'standard-version --release-as major --tag-prefix=' },
    ]);
  });
});
