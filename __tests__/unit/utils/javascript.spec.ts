import { format } from '#src/utils/javascript.ts';

describe('javascript', () => {
  describe('format', () => {
    it('formats input with default config', async () => {
      const input = `const foo   =    "bar"`;
      const formatted = `const foo = 'bar';\n`;

      const actual = await format(input);
      const expected = formatted;

      expect(actual).toBe(expected);
    });
  });
});
