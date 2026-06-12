import { bold } from '#src/utils/console.utils.ts';
import {
  chooseCategory,
  chooseCategoryPreset,
  installCategoryOptions,
  chooseCategoryOptions,
} from '#src/services/cli.service.ts';

export const main = async () => {
  console.log(bold(`Welcome to Allohamora's cli`));

  const category = await chooseCategory();
  const options = await chooseCategoryPreset(category);
  const selectedOptionKeys = await chooseCategoryOptions(options);

  await installCategoryOptions(options, selectedOptionKeys);

  console.log(bold('Installation completed'));
};

/* v8 ignore next 3 -- CLI bootstrap path is exercised by direct Node startup. */
if (import.meta.main) {
  void main();
}
