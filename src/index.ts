#!/usr/bin/env node

import { manyOf, oneOf } from "./utils/prompt";
import { jsState, jsStateValues } from "./utils/config";
import jsOptions from './categories/js';
import ora from 'ora';
import { white } from "./utils/console";
import { camelize, kebablize } from "./utils/string";

const categories = ['js'] as const;
const configs = {
  js: { state: jsState, values: jsStateValues, options: jsOptions }
};

const main = async () => {
  console.log(white(`Wellcome to Allohamora's cli`));

  const choosedCategory = await oneOf('choose a category', categories);
  const { state, values, options } = configs[choosedCategory];

  const [,setConfig] = state;
  const choosedConfig = await oneOf('choose a config', values);
  setConfig(choosedConfig);

  const kebablizedOptions = Object.keys(options).map(kebablize);
  const choosedKebablizedOptions = await manyOf('choose a options', kebablizedOptions);

  const spinner = ora('starting install').start();

  await choosedKebablizedOptions.reduce((chain, kebabName) => {
    return chain.then(async () => {
      const optionName = camelize(kebabName) as keyof typeof options;

      spinner.text = `${kebabName} is installing`;

      return await options[optionName]()
    });
  }, Promise.resolve()); 

  spinner.stop();
  console.log(white('Installation completed'));
};

main();