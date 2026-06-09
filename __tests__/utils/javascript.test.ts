import prettier from 'prettier';
import { getConfig } from 'src/categories/js/prettier/prettier.config';
import { defaultConfig } from 'src/categories/js/prettier/config/default.config';
import { format } from 'src/utils/javascript';

vi.mock('prettier', () => ({
  default: {
    format: vi.fn(),
  },
}));
const prettierMocked = vi.mocked(prettier);

vi.mock('src/categories/js/prettier/prettier.config', () => ({ getConfig: vi.fn() }));
const getConfigMocked = vi.mocked(getConfig);

describe('format', () => {
  test('formats input with default config', async () => {
    const input = `const foo   =    "bar"`;
    const formatted = `const foo = 'bar';`;

    getConfigMocked.mockImplementation(() => ({ config: { printWidth: 90 } }) as typeof defaultConfig);
    prettierMocked.format.mockResolvedValueOnce(formatted);

    const actual = await format(input);
    const expected = formatted;

    expect(actual).toBe(expected);
    expect(prettierMocked.format).toHaveBeenCalledWith(input, { parser: 'typescript', printWidth: 90 });
  });
});
