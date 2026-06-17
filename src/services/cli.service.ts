import pkg from '../../package.json' with { type: 'json' };
import categories from '#src/categories/index.ts';
import inquirer from 'inquirer';
import ora from 'ora';
import { ExitPromptError } from '@inquirer/core';
import { setSelectedInstallOptions } from '#src/services/installation.service.ts';
import { toCamelCase, toKebabCase } from '#src/utils/string.utils.ts';
import { unique } from '#src/utils/array.utils.ts';
import type { Category } from '#src/services/state.service.ts';

export class CliError extends Error {
  public override name = 'CliError';
}

export class CliExitError extends Error {
  public override name = 'CliExitError';
}

const categoriesKeys = Object.keys(categories);

export const toLines = (items: string[], maxLength = 60, indent = '  '): string[] => {
  const lines: string[] = [];
  let current = '';

  for (const item of items) {
    const next = current === '' ? item : `${current}, ${item}`;

    if (next.length > maxLength && current !== '') {
      lines.push(`${indent}${current},`);
      current = item;
    } else {
      current = next;
    }
  }

  if (current !== '') {
    lines.push(`${indent}${current}`);
  }

  return lines;
};

export const getVersion = () => pkg.version;

export const getHelp = () => {
  const lines: string[] = [
    'npx @allohamora/cli <category> <preset> <...options>',
    '',
    'Usage:',
    '',
    'npx @allohamora/cli js node:ts prettier eslint       install options for a js project',
    'npx @allohamora/cli --help                           show this help message',
    'npx @allohamora/cli --version                        print version number',
    '',
  ];

  for (const [name, category] of Object.entries(categories)) {
    const { state, options } = category as Category;

    lines.push(`Category "${name}" presets:`);
    lines.push('');
    lines.push(...toLines(Object.values(state.presets)));
    lines.push('');
    lines.push(`Category "${name}" options:`);
    lines.push('');
    lines.push(...toLines(Object.keys(options).map(toKebabCase)));
    lines.push('');
  }

  return lines.join('\n');
};

export type ResolvedArgs = {
  category: Category;
  categoryName: string;
  presetName: string;
  optionKeys: string[];
};

export const resolveArgs = (argv: string[]): ResolvedArgs => {
  const [categoryName, presetName, ...optionNames] = argv;

  if (!categoryName) {
    throw new CliError('Missing category. Available categories: ' + categoriesKeys.join(', '));
  }

  if (!categoriesKeys.includes(categoryName)) {
    throw new CliError(`Unknown category "${categoryName}". Available categories: ${categoriesKeys.join(', ')}`);
  }

  const category = categories[categoryName as keyof typeof categories] as Category;

  if (!presetName) {
    throw new CliError(
      `Missing preset for category "${categoryName}". Available presets: ${(category.state.presets as readonly string[]).join(', ')}`,
    );
  }

  if (!(category.state.presets as readonly string[]).includes(presetName)) {
    throw new CliError(
      `Unknown preset "${presetName}" for category "${categoryName}". Available presets: ${(category.state.presets as readonly string[]).join(', ')}`,
    );
  }

  if (optionNames.length === 0) {
    const validOptions = Object.keys(category.options).map(toKebabCase);

    throw new CliError(`Missing options for category "${categoryName}". Available options: ${validOptions.join(', ')}`);
  }

  const uniqueOptionNames = unique(optionNames);
  const validOptions = Object.keys(category.options).map(toKebabCase);

  for (const option of uniqueOptionNames) {
    if (!validOptions.includes(option)) {
      throw new CliError(
        `Unknown option "${option}" for category "${categoryName}". Available options: ${validOptions.join(', ')}`,
      );
    }
  }

  return { category, categoryName, presetName, optionKeys: uniqueOptionNames.map(toCamelCase) };
};

export type ParsedArgv = { type: 'help' } | { type: 'version' } | ({ type: 'run' } & ResolvedArgs);

export const parseArgv = (argv: string[]): ParsedArgv => {
  if (argv.includes('--help')) {
    return { type: 'help' };
  }

  if (argv.includes('--version')) {
    return { type: 'version' };
  }

  return { type: 'run', ...resolveArgs(argv) };
};

export const chooseOne = async <C extends string>(message: string, choices: readonly C[]) => {
  try {
    const res = await inquirer.prompt({
      type: 'select',
      name: message,
      message,
      choices,
    });

    return res[message] as C;
  } catch (error) {
    if (error instanceof ExitPromptError) {
      throw new CliExitError();
    }

    throw error;
  }
};

export const requireAtLeastOneChoice = (answers: unknown[]) => answers.length !== 0;

export const chooseMany = async <C extends string>(message: string, choices: readonly C[]) => {
  try {
    const res = await inquirer.prompt({
      type: 'checkbox',
      name: message,
      message,
      choices,
      validate: requireAtLeastOneChoice,
    });

    return res[message] as C[];
  } catch (error) {
    if (error instanceof ExitPromptError) {
      throw new CliExitError();
    }

    throw error;
  }
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
