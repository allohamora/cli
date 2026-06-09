import categories from '#src/categories/index.ts';
import ora from 'ora';
import { manyOf, oneOf } from '#src/utils/prompt.ts';
import { camelize, kebablize } from '#src/utils/string.ts';
import type { Category } from '#src/types/category.ts';
import { setInstalling } from '#src/states/context.ts';

const categoriesKeys = Object.keys(categories);

export const getCategory = async () => {
  const selectedCategory = (await oneOf('choose a category', categoriesKeys)) as keyof typeof categories;
  const category = categories[selectedCategory];

  return category as Category;
};

export const getOptions = async ({ state: { configState, configTypes }, options }: Category) => {
  const [, setConfig] = configState;
  const selectedConfig = await oneOf('choose a config', configTypes);
  setConfig(selectedConfig);

  return options;
};

export const chooseOptions = async (options: Category['options']) => {
  const kebablizedOptions = Object.keys(options).map(kebablize);
  const selectedKebablizedOptions = await manyOf('choose a options', kebablizedOptions);

  return selectedKebablizedOptions.map(camelize);
};

export const installOptions = async (options: Category['options'], keys: string[]) => {
  const spinner = ora('starting install').start();

  setInstalling(keys);

  await keys.reduce((chain, key) => {
    return chain.then(() => {
      const kebablizeKey = kebablize(key);
      spinner.text = `${kebablizeKey} is installing\n`;

      return options[key]?.();
    });
  }, Promise.resolve());

  spinner.stop();
};
