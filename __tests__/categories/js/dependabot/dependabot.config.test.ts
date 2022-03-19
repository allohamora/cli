import { getConfig } from 'src/categories/js/dependabot/dependabot.config';
import { expectJsConfig } from '__tests__/test-utils/js-config';
import { yamlParse } from '__tests__/test-utils/yaml';

const expectDependaBotConfig = ({ content }: { content: string }) => {
  const parsed = yamlParse(content) as { version: number; updates: [] };

  expect(typeof parsed.version).toBe('number');
  expect(typeof parsed.updates).toBe('object');
};

expectJsConfig(getConfig, [expectDependaBotConfig]);
