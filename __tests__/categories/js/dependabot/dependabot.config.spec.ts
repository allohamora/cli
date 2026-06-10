import { getConfig } from '#src/categories/js/dependabot/dependabot.config.ts';
import { expectJsConfig } from '#__tests__/test-utils/js-config.ts';
import { yamlParse } from '#__tests__/test-utils/yaml.ts';

describe('dependabot.config', () => {
  const expectDependaBotConfig = ({ content }: { content: string }) => {
    const parsed = yamlParse(content) as { version: number; updates: [] };

    expect(typeof parsed.version).toBe('number');
    expect(typeof parsed.updates).toBe('object');
  };

  expectJsConfig(getConfig, [expectDependaBotConfig]);
});
