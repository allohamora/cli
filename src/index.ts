import { white } from '#src/utils/console.ts';
import { getCategory, getOptions, installOptions, chooseOptions } from '#src/utils/main.ts';

export const main = async () => {
  console.log(white(`Welcome to Allohamora's cli`));

  const category = await getCategory();
  const options = await getOptions(category);
  const selectedOptionKeys = await chooseOptions(options);

  await installOptions(options, selectedOptionKeys);

  console.log(white('Installation completed'));
};

/* v8 ignore next 3 -- CLI bootstrap path is exercised by direct Node startup. */
if (import.meta.main) {
  void main();
}
