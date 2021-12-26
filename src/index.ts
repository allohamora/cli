#!/usr/bin/env node

import categories from './categories';
import ora from 'ora';
import { manyOf, oneOf } from './utils/prompt';
import { white } from './utils/console';
import { camelize, kebablize } from './utils/string';
import { Category } from './utils/category';

const categoriesKeys = Object.keys(categories);

const getCategory = async () => {
  const choosedCategory = (await oneOf('choose a category', categoriesKeys)) as keyof typeof categories;
  const category = categories[choosedCategory];

  return category as Category;
};

const getOptions = async ({ state: { configState, configTypes }, options }: Category) => {
  const [, setConfig] = configState;
  const choosedConfig = await oneOf('choose a config', configTypes);
  setConfig(choosedConfig);

  return options;
};

const chooseOptions = async (options: Category['options']) => {
  const kebablizedOptions = Object.keys(options).map(kebablize);
  const choosedKebablizedOptions = await manyOf('choose a options', kebablizedOptions);

  return choosedKebablizedOptions.map(camelize);
};

const installOptions = async (options: Category['options'], keys: string[]) => {
  const spinner = ora('starting install').start();

  await keys.reduce((chain, key) => {
    return chain.then(async () => {
      const kebablizeKey = kebablize(key);
      spinner.text = `${kebablizeKey} is installing`;

      return await options[key]();
    });
  }, Promise.resolve());

  spinner.stop();
};

const main = async () => {
  console.log(white(`Wellcome to Allohamora's cli`));

  const category = await getCategory();
  const options = await getOptions(category);
  const choosedOptionKeys = await chooseOptions(options);

  await installOptions(options, choosedOptionKeys);

  console.log(white('Installation completed'));
};

main();
