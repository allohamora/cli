import { white } from './utils/console';
import { getCategory, getOptions, installOptions, chooseOptions } from './utils/main';

export const main = async () => {
  console.log(white(`Welcome to Allohamora's cli`));

  const category = await getCategory();
  const options = await getOptions(category);
  const selectedOptionKeys = await chooseOptions(options);

  await installOptions(options, selectedOptionKeys);

  console.log(white('Installation completed'));
};

if (require.main) {
  void main();
}
