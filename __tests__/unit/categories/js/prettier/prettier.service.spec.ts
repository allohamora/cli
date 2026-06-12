import { fileSystem, installationState } from '#__tests__/setup-test-context.ts';
import { formatJavascript, isPrettierInstalled } from '#src/categories/js/prettier/prettier.service.ts';

describe('prettier.service', () => {
  describe('formatJavascript', () => {
    it('formats input with default config', async () => {
      const input = `const foo   =    "bar"`;
      const formatted = `const foo = 'bar';\n`;

      const actual = await formatJavascript(input);
      const expected = formatted;

      expect(actual).toBe(expected);
    });
  });

  describe('isPrettierInstalled', () => {
    it('returns true if prettier is selected for install', async () => {
      installationState.setSelectedInstallOptions(['prettier']);

      expect(await isPrettierInstalled()).toBe(true);
    });

    it('returns true if prettier config exists', async () => {
      fileSystem.writeFile('.prettierrc', '');

      expect(await isPrettierInstalled()).toBe(true);
    });

    it('returns false if prettier is not selected for install and config does not exist', async () => {
      expect(await isPrettierInstalled()).toBe(false);
    });
  });
});
