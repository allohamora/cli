import categories from '#src/categories/index.ts';
import inquirer from 'inquirer';
import ora from 'ora';
import { setSelectedInstallOptions } from '#src/services/installation.service.ts';
import { toCamelCase, toKebabCase } from '#src/utils/string.utils.ts';
import type { Category } from '#src/services/state.service.ts';

const categoriesKeys = Object.keys(categories);

export const chooseOne = async <C extends string>(message: string, choices: readonly C[]) => {
  const res = await inquirer.prompt({
    type: 'select',
    name: message,
    message,
    choices,
  });

  return res[message] as C;
};

export const requireAtLeastOneChoice = (answers: unknown[]) => answers.length !== 0;

export const chooseMany = async <C extends string>(message: string, choices: readonly C[]) => {
  const res = await inquirer.prompt({
    type: 'checkbox',
    name: message,
    message,
    choices,
    validate: requireAtLeastOneChoice,
  });

  return res[message] as C[];
};

export const chooseCategory = async () => {
  const selectedCategory = (await chooseOne('choose a category', categoriesKeys)) as keyof typeof categories;
  const category = categories[selectedCategory];

  return category as Category;
};

export const chooseCategoryPreset = async ({ state: { presetState, presets }, options }: Category) => {
  const selectedPreset = await chooseOne('choose a preset', presets);
  presetState.setPreset(selectedPreset);

  return options;
};

export const chooseCategoryOptions = async (options: Category['options']) => {
  const kebablizedOptions = Object.keys(options).map(toKebabCase);
  const selectedKebablizedOptions = await chooseMany('choose options', kebablizedOptions);

  return selectedKebablizedOptions.map(toCamelCase);
};

export const installCategoryOptions = async (options: Category['options'], keys: string[]) => {
  const spinner = ora('starting installation').start();

  setSelectedInstallOptions(keys);

  for (const key of keys) {
    const kebablizeKey = toKebabCase(key);
    spinner.text = `installing ${kebablizeKey}\n`;

    await options[key]?.();
  }

  spinner.stop();
};
