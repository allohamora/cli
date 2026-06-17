import categories from '#src/categories/index.ts';
import { installationState, loading, prompt } from '#__tests__/setup-test-context.ts';
import { describe, expect, it, vi } from 'vitest';
import {
  CliError,
  chooseMany,
  chooseOne,
  chooseCategoryOptions,
  chooseCategory,
  chooseCategoryPreset,
  installCategoryOptions,
  requireAtLeastOneChoice,
  resolveArgs,
} from '#src/services/cli.service.ts';
import type { Category } from '#src/services/state.service.ts';
import { toCamelCase, toKebabCase } from '#src/utils/string.utils.ts';

describe('cli.service', () => {
  const message = '__test__';
  const choices = ['a', 'b', 'c'] as const;
  const js = categories.js as Category;
  const jsOptionKeys = Object.keys(js.options);

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
        category: 'js',
        preset: 'node:ts',
        optionKeys: ['eslint', 'prettier'],
      });
    });

    it('converts kebab-case options to camelCase keys', () => {
      expect(resolveArgs(['js', 'default', 'standard-version'])).toEqual({
        category: 'js',
        preset: 'default',
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
