import categories from '#src/categories/index.ts';
import { installationState, loading, prompt } from '#__tests__/setup-test-context.ts';
import {
  chooseMany,
  chooseOne,
  chooseOptions,
  getCategory,
  getOptions,
  installOptions,
  requireAtLeastOneChoice,
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

    it('returns false if answers contain less than one item', () => {
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

  describe('getCategory', () => {
    it('returns the selected category', async () => {
      prompt.selectCategory('js');

      expect(await getCategory()).toBe(js);
    });
  });

  describe('getOptions', () => {
    it('sets selected config and returns category options', async () => {
      const selectedConfig = js.state.configTypes[1]!;
      prompt.selectConfig(selectedConfig);

      expect(await getOptions(js)).toBe(js.options);
      expect(js.state.configState[0]()).toBe(selectedConfig);
    });
  });

  describe('chooseOptions', () => {
    it('returns selected entrypoints in camelCase', async () => {
      const kebablized = jsOptionKeys.map(toKebabCase);
      const selected = [kebablized[1]!];
      prompt.selectEntrypoints(...selected);

      expect(await chooseOptions(js.options)).toEqual(selected.map(toCamelCase));
    });
  });

  describe('installOptions', () => {
    it('starts and finishes loading while printing installed option names', async () => {
      const optionHello = vi.fn();

      await installOptions({ optionHello }, ['optionHello']);

      expect(optionHello).toHaveBeenCalled();
      expect(loading.getLabels()).toEqual(['starting install']);
      expect(loading.getStarts()).toBe(1);
      expect(loading.getTexts()).toEqual(['option-hello is installing\n']);
      expect(loading.getFinishes()).toBe(1);
    });

    it('sets selected install options', async () => {
      const option = vi.fn();
      const options = { option };
      const keys = ['option'];

      await installOptions(options, keys);

      expect(installationState.getSelectedInstallOptions()).toEqual(keys);
    });

    it('runs selected scripts', async () => {
      const option1 = vi.fn();
      const option2 = vi.fn();
      const options = { option1, option2 };
      const keys = ['option1', 'option2'];

      await installOptions(options, keys);

      expect(option1).toHaveBeenCalled();
      expect(option2).toHaveBeenCalled();
    });
  });
});
