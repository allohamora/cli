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

export const getCategory = async () => {
  const selectedCategory = (await chooseOne('choose a category', categoriesKeys)) as keyof typeof categories;
  const category = categories[selectedCategory];

  return category as Category;
};

export const getOptions = async ({ state: { configState, configTypes }, options }: Category) => {
  const [, setConfig] = configState;
  const selectedConfig = await chooseOne('choose a config', configTypes);
  setConfig(selectedConfig);

  return options;
};

export const chooseOptions = async (options: Category['options']) => {
  const kebablizedOptions = Object.keys(options).map(toKebabCase);
  const selectedKebablizedOptions = await chooseMany('choose a options', kebablizedOptions);

  return selectedKebablizedOptions.map(toCamelCase);
};

export const installOptions = async (options: Category['options'], keys: string[]) => {
  const spinner = ora('starting install').start();

  setSelectedInstallOptions(keys);

  await keys.reduce((chain, key) => {
    return chain.then(() => {
      const kebablizeKey = toKebabCase(key);
      spinner.text = `${kebablizeKey} is installing\n`;

      return options[key]?.();
    });
  }, Promise.resolve());

  spinner.stop();
};
