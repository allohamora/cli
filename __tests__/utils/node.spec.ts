import { terminal } from '#__tests__/setup-test-context.ts';
import { getNodeVersion } from '#src/utils/node.ts';

describe('node', () => {
  describe('getNodeVersion', () => {
    it('returns nodejs version', async () => {
      const expected = '16.14.2';

      terminal.setCommandResult({ stdout: `v${expected}\n` });

      const actual = await getNodeVersion();

      expect(actual).toBe(expected);
      expect(terminal.getCommands()).toEqual([[expect.arrayContaining(['node -v'])]]);
    });
  });
});
