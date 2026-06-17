import pkg from '../../../package.json' with { type: 'json' };
import categories from '#src/categories/index.ts';
import { installationState, loading, prompt } from '#__tests__/setup-test-context.ts';
import { describe, expect, it, vi } from 'vitest';
import {
  CliError,
  CliExitError,
  chooseMany,
  chooseOne,
  chooseCategoryOptions,
  chooseCategory,
  chooseCategoryPreset,
  getHelp,
  getVersion,
  installCategoryOptions,
  parseArgv,
  requireAtLeastOneChoice,
  resolveArgs,
  toLines,
} from '#src/services/cli.service.ts';
import type { Category } from '#src/services/state.service.ts';
import { toCamelCase, toKebabCase } from '#src/utils/string.utils.ts';
import { ExitPromptError } from '@inquirer/core';

describe('cli.service', () => {
  const message = '__test__';
  const choices = ['a', 'b', 'c'] as const;
  const js = categories.js as Category;
  const jsOptionKeys = Object.keys(js.options);

  describe('getVersion', () => {
    it('returns the package version', () => {
      expect(getVersion()).toBe(pkg.version);
    });
  });

  describe('getHelp', () => {
    it('includes usage header', () => {
      const help = getHelp();

      expect(help).toContain('npx @allohamora/cli <category> <preset> <...options>');
      expect(help).toContain('npx @allohamora/cli --help');
      expect(help).toContain('npx @allohamora/cli --version');
    });

    it('includes category presets and options', () => {
      const help = getHelp();

      for (const [name, category] of Object.entries(categories)) {
        const { state, options } = category as Category;

        expect(help).toContain(`Category "${name}" presets:`);
        expect(help).toContain(`Category "${name}" options:`);

        for (const preset of state.presets) {
          expect(help).toContain(preset);
        }

        for (const option of Object.keys(options).map(toKebabCase)) {
          expect(help).toContain(option);
        }
      }
    });
  });

  describe('chooseOne', () => {
    it('runs inquirer.prompt with type: select', async () => {
      const choice = choices[0];
      prompt.answer(message, choice);

      const actual = await chooseOne(message, choices);
      const expected = choice;

      const promptOptions = {
        type: 'select',
        name: message,
        message,
        choices,
      };

      expect(prompt.getQuestions()).toEqual([promptOptions]);
      expect(actual).toBe(expected);
    });

    it('throws CliExitError when prompt throws ExitPromptError', async () => {
      prompt.answer(message, new ExitPromptError('exit'));

      await expect(chooseOne(message, choices)).rejects.toThrow(CliExitError);
    });

    it('rethrows non-ExitPromptError errors', async () => {
      const error = new Error('unexpected');
      prompt.answer(message, error);

      await expect(chooseOne(message, choices)).rejects.toThrow(error);
    });
  });

  describe('requireAtLeastOneChoice', () => {
    it('returns true if answers contain at least one item', () => {
      const actual = requireAtLeastOneChoice([1]);
      const expected = true;

      expect(actual).toBe(expected);
    });

    it('returns false if answers contain no items', () => {
      const actual = requireAtLeastOneChoice([]);
      const expected = false;

      expect(actual).toBe(expected);
    });
  });

  describe('chooseMany', () => {
    it('runs inquirer.prompt with type: checkbox and at least one choice validation', async () => {
      const resolvedChoices = [choices[0], choices[2]];
      prompt.answer(message, resolvedChoices);

      const actual = await chooseMany(message, choices);
      const expected = resolvedChoices;

      const promptOptions = {
        type: 'checkbox',
        name: message,
        message,
        choices,
        validate: requireAtLeastOneChoice,
      };

      expect(prompt.getQuestions()).toEqual([promptOptions]);
      expect(actual).toBe(expected);
    });

    it('throws CliExitError when prompt throws ExitPromptError', async () => {
      prompt.answer(message, new ExitPromptError('exit'));

      await expect(chooseMany(message, choices)).rejects.toThrow(CliExitError);
    });

    it('rethrows non-ExitPromptError errors', async () => {
      const error = new Error('unexpected');
      prompt.answer(message, error);

      await expect(chooseMany(message, choices)).rejects.toThrow(error);
    });
  });

  describe('chooseCategory', () => {
    it('returns the selected category', async () => {
      prompt.selectCategory('js');

      expect(await chooseCategory()).toBe(js);
    });
  });

  describe('chooseCategoryPreset', () => {
    it('sets the selected preset and returns the category options', async () => {
      const selectedPreset = js.state.presets[1]!;
      prompt.selectPreset(selectedPreset);

      expect(await chooseCategoryPreset(js)).toBe(js.options);
      expect(js.state.presetState.getPreset()).toBe(selectedPreset);
    });
  });

  describe('chooseCategoryOptions', () => {
    it('returns the selected entry points in camelCase', async () => {
      const kebablized = jsOptionKeys.map(toKebabCase);
      const selected = [kebablized[1]!];
      prompt.selectOptions(...selected);

      expect(await chooseCategoryOptions(js.options)).toEqual(selected.map(toCamelCase));
    });
  });

  describe('resolveArgs', () => {
    it('resolves category, preset, and option keys', () => {
      expect(resolveArgs(['js', 'node:ts', 'eslint', 'prettier'])).toEqual({
        category: js,
        categoryName: 'js',
        presetName: 'node:ts',
        optionKeys: ['eslint', 'prettier'],
      });
    });

    it('converts kebab-case options to camelCase keys', () => {
      expect(resolveArgs(['js', 'default', 'standard-version'])).toEqual({
        category: js,
        categoryName: 'js',
        presetName: 'default',
        optionKeys: ['standardVersion'],
      });
    });

    it('throws CliError for missing category', () => {
      expect(() => resolveArgs([])).toThrow(CliError);
      expect(() => resolveArgs([])).toThrow('Missing category. Available categories: js');
    });

    it('throws CliError for unknown category', () => {
      expect(() => resolveArgs(['python'])).toThrow(CliError);
      expect(() => resolveArgs(['python'])).toThrow('Unknown category "python". Available categories: js');
    });

    it('throws CliError for missing preset', () => {
      expect(() => resolveArgs(['js'])).toThrow(CliError);
      expect(() => resolveArgs(['js'])).toThrow('Missing preset for category "js". Available presets:');
    });

    it('throws CliError for unknown preset', () => {
      expect(() => resolveArgs(['js', 'bad'])).toThrow(CliError);
      expect(() => resolveArgs(['js', 'bad'])).toThrow('Unknown preset "bad" for category "js". Available presets:');
    });

    it('throws CliError for missing options', () => {
      expect(() => resolveArgs(['js', 'default'])).toThrow(CliError);
      expect(() => resolveArgs(['js', 'default'])).toThrow('Missing options for category "js". Available options:');
    });

    it('throws CliError for unknown option', () => {
      expect(() => resolveArgs(['js', 'default', 'bad'])).toThrow(CliError);
      expect(() => resolveArgs(['js', 'default', 'bad'])).toThrow(
        'Unknown option "bad" for category "js". Available options:',
      );
    });

    it('deduplicates repeated options', () => {
      expect(resolveArgs(['js', 'default', 'eslint', 'eslint'])).toEqual({
        category: js,
        categoryName: 'js',
        presetName: 'default',
        optionKeys: ['eslint'],
      });
    });

    it('deduplicates repeated kebab-case options', () => {
      expect(resolveArgs(['js', 'default', 'standard-version', 'standard-version'])).toEqual({
        category: js,
        categoryName: 'js',
        presetName: 'default',
        optionKeys: ['standardVersion'],
      });
    });
  });

  describe('parseArgv', () => {
    it('returns help type for --help', () => {
      expect(parseArgv(['--help'])).toEqual({ type: 'help' });
    });

    it('returns help type when --help is mixed with other args', () => {
      expect(parseArgv(['js', '--help'])).toEqual({ type: 'help' });
    });

    it('returns version type for --version', () => {
      expect(parseArgv(['--version'])).toEqual({ type: 'version' });
    });

    it('returns version type when --version is mixed with other args', () => {
      expect(parseArgv(['js', '--version'])).toEqual({ type: 'version' });
    });

    it('returns help type when both --help and --version are present', () => {
      expect(parseArgv(['--help', '--version'])).toEqual({ type: 'help' });
    });

    it('returns run type with resolved category, preset, and optionKeys', () => {
      const result = parseArgv(['js', 'node:ts', 'eslint']);

      expect(result).toEqual({
        type: 'run',
        category: js,
        categoryName: 'js',
        presetName: 'node:ts',
        optionKeys: ['eslint'],
      });
    });

    it('returns run type with multiple options', () => {
      const result = parseArgv(['js', 'default', 'eslint', 'prettier']);

      expect(result).toEqual({
        type: 'run',
        category: js,
        categoryName: 'js',
        presetName: 'default',
        optionKeys: ['eslint', 'prettier'],
      });
    });

    it('converts kebab-case options to camelCase in run type', () => {
      const result = parseArgv(['js', 'default', 'standard-version']);

      expect(result).toEqual({
        type: 'run',
        category: js,
        categoryName: 'js',
        presetName: 'default',
        optionKeys: ['standardVersion'],
      });
    });

    it('throws CliError for invalid args', () => {
      expect(() => parseArgv(['unknown'])).toThrow(CliError);
    });
  });

  describe('toLines', () => {
    it('keeps items on one line when they fit', () => {
      expect(toLines(['a', 'b', 'c'], 60)).toEqual(['  a, b, c']);
    });

    it('wraps to the next line when maxLength is exceeded', () => {
      expect(toLines(['eslint', 'prettier', 'editorconfig', 'lint-staged', 'husky'], 30)).toEqual([
        '  eslint, prettier, editorconfig,',
        '  lint-staged, husky',
      ]);
    });

    it('handles a single item', () => {
      expect(toLines(['eslint'], 10)).toEqual(['  eslint']);
    });

    it('returns empty array for empty items', () => {
      expect(toLines([], 60)).toEqual([]);
    });
  });

  describe('installCategoryOptions', () => {
    it('starts and finishes loading while printing the installed option names', async () => {
      const optionHello = vi.fn();

      await installCategoryOptions({ optionHello }, ['optionHello']);

      expect(optionHello).toHaveBeenCalled();
      expect(loading.getLabels()).toEqual(['starting installation']);
      expect(loading.getStarts()).toBe(1);
      expect(loading.getTexts()).toEqual(['installing option-hello\n']);
      expect(loading.getFinishes()).toBe(1);
    });

    it('sets selected install options', async () => {
      const option = vi.fn();
      const options = { option };
      const keys = ['option'];

      await installCategoryOptions(options, keys);

      expect(installationState.getSelectedInstallOptions()).toEqual(keys);
    });

    it('runs selected scripts', async () => {
      const option1 = vi.fn();
      const option2 = vi.fn();
      const options = { option1, option2 };
      const keys = ['option1', 'option2'];

      await installCategoryOptions(options, keys);

      expect(option1).toHaveBeenCalled();
      expect(option2).toHaveBeenCalled();
    });
  });
});
