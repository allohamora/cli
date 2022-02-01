import categories from 'src/categories';
import ora from 'ora';
import { manyOf, oneOf } from 'src/utils/prompt';
import { camelize, kebablize } from 'src/utils/string';
import { Category } from 'src/types/category';
import { setInstalling } from 'src/states/context';

const categoriesKeys = Object.keys(categories);

export const getCategory = async () => {
  const choosedCategory = (await oneOf('choose a category', categoriesKeys)) as keyof typeof categories;
  const category = categories[choosedCategory];

  return category as Category;
};

export const getOptions = async ({ state: { configState, configTypes }, options }: Category) => {
  const [, setConfig] = configState;
  const choosedConfig = await oneOf('choose a config', configTypes);
  setConfig(choosedConfig);

  return options;
};

export const chooseOptions = async (options: Category['options']) => {
  const kebablizedOptions = Object.keys(options).map(kebablize);
  const choosedKebablizedOptions = await manyOf('choose a options', kebablizedOptions);

  return choosedKebablizedOptions.map(camelize);
};

export const installOptions = async (options: Category['options'], keys: string[]) => {
  const spinner = ora('starting install').start();

  setInstalling(keys);

  await keys.reduce((chain, key) => {
    return chain.then(async () => {
      const kebablizeKey = kebablize(key);
      spinner.text = `${kebablizeKey} is installing`;

      return await options[key]();
    });
  }, Promise.resolve());

  spinner.stop();
};
