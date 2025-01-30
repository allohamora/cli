import prettier from 'prettier';
import { getConfig } from 'src/categories/js/prettier/prettier.config';
import { defaultConfig } from 'src/categories/js/prettier/config/default.config';
import { format } from 'src/utils/javascript';

// we need to mock prettier because it doesn't work with jest
// TypeError: A dynamic import callback was invoked without --experimental-vm-modules
// https://github.com/prettier/prettier/issues/15769
jest.mock('prettier', () => ({
  format: jest.fn(),
}));
const prettierMocked = jest.mocked(prettier);

jest.mock('src/categories/js/prettier/prettier.config', () => ({ getConfig: jest.fn() }));
const getConfigMocked = jest.mocked(getConfig);

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
