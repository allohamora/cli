#!/usr/bin/env node

import jsOptions from './categories/js';
import ora from 'ora';
import { manyOf, oneOf } from './utils/prompt';
import { jsState, jsStateValues } from './utils/config';
import { white } from './utils/console';
import { camelize, kebablize } from './utils/string';

const categoriesKeys = ['js'] as const;
const categories = {
  js: { state: jsState, values: jsStateValues, options: jsOptions },
};

const main = async () => {
  console.log(white(`Wellcome to Allohamora's cli`));

  const choosedCategory = await oneOf('choose a category', categoriesKeys);
  const { state, values, options } = categories[choosedCategory];

  const [, setConfig] = state;
  const choosedConfig = await oneOf('choose a config', values);
  setConfig(choosedConfig);

  const kebablizedOptions = Object.keys(options).map(kebablize);
  const choosedKebablizedOptions = await manyOf('choose a options', kebablizedOptions);

  const spinner = ora('starting install').start();

  await choosedKebablizedOptions.reduce((chain, kebabName) => {
    return chain.then(async () => {
      const optionName = camelize(kebabName) as keyof typeof options;

      spinner.text = `${kebabName} is installing`;

      return await options[optionName]();
    });
  }, Promise.resolve());

  spinner.stop();
  console.log(white('Installation completed'));
};

main();
