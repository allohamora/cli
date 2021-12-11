#!/usr/bin/env node

import { manyOf, oneOf } from "./utils/prompt";
import { jsState, jsStateValues } from "./utils/config";
import jsOptions from './categories/js';
import ora from 'ora';
import { white } from "./utils/console";

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

  const choosedOptions = await manyOf('choose a options', Object.keys(options));

  const spinner = ora('starting install').start();

  await choosedOptions.reduce((chain, name) => {
    return chain.then(async () => {
      const optionName = name as keyof typeof options;

      spinner.text = `${name} is installing`;

      return await options[optionName]()
    });
  }, Promise.resolve()); 

  spinner.stop();
  console.log(white('Installation completed'));
};

main();