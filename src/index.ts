#!/usr/bin/env node
import { white } from './utils/console';
import { getCategory, getOptions, installOptions, chooseOptions } from './utils/main';

export const main = async () => {
  console.log(white(`Wellcome to Allohamora's cli`));

  const category = await getCategory();
  const options = await getOptions(category);
  const choosedOptionKeys = await chooseOptions(options);

  await installOptions(options, choosedOptionKeys);

  console.log(white('Installation completed'));
};

if (require.main) {
  main();
}
