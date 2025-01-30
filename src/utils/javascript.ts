import prettier from 'prettier';
import { getConfig } from 'src/categories/js/prettier/prettier.config';

export const format = async (input: string) => {
  const { config } = getConfig();

  return await prettier.format(input, { parser: 'typescript', ...config } as prettier.Options);
};
