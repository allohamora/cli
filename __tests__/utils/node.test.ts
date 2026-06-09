import { execa } from 'execa';
import { getNodeVersion } from '#src/utils/node.ts';

vi.mock('execa');
const execaMocked = vi.mocked(execa);

describe('getNodeVersion', () => {
  test('should return nodejs version', async () => {
    const expected = '16.14.2';

    execaMocked.mockResolvedValueOnce({ stdout: `v${expected}\n` } as Awaited<ReturnType<typeof execa>>);

    const actual = await getNodeVersion();

    expect(actual).toBe(expected);
    expect(execaMocked).toHaveBeenCalledWith(expect.arrayContaining(['node -v']));
  });
});
