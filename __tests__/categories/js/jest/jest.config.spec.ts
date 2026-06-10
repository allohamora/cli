import { getConfig } from '#src/categories/js/jest/jest.config.ts';
import { parse } from '#__tests__/test-utils/cjs-module.ts';
import { expectJsConfig } from '#__tests__/test-utils/js-config.ts';

describe('jest.config', () => {
  const expectCanBeParsed = (config: ReturnType<typeof getConfig>) => {
    it('is parsed', () => {
      const parsed = parse(config.configFileContent);

      expect(parsed.module.exports).toBeDefined();
      expect(typeof parsed.module.exports).toBe('object');
    });
  };

  expectJsConfig(getConfig, [expectCanBeParsed]);
});
