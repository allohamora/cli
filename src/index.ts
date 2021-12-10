#!/usr/bin/env node

import { manyOf, oneOf } from "./utils/prompt";
import { jsState, jsStateValues } from "./utils/config";
import jsOptions from './categories/js';

const categories = ['js'] as const;
const configs = {
  js: { state: jsState, values: jsStateValues, options: jsOptions }
};

const main = async () => {
  const choosedCategory = await oneOf('choose a category', categories);
  const { state, values, options } = configs[choosedCategory];

  const [,setConfig] = state;
  const choosedConfig = await oneOf('choose a config', values);
  setConfig(choosedConfig);

  const choosedOptions = await manyOf('choose a options', Object.keys(options));
  await choosedOptions.reduce((chain, name) => {
    return chain.then(async () => await options[name as keyof typeof options]());
  }, Promise.resolve()); 
};

main();