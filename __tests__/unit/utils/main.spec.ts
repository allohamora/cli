import categories from '#src/categories/index.ts';
import { contextState, loading, prompt } from '#__tests__/setup-test-context.ts';
import { chooseOptions, getCategory, getOptions, installOptions } from '#src/utils/main.ts';
import type { Category } from '#src/types/category.ts';
import { toCamelCase, toKebabCase } from '#src/utils/string.utils.ts';

describe('main', () => {
  const js = categories.js as Category;
  const jsOptionKeys = Object.keys(js.options);

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

    it('sets installing options', async () => {
      const option = vi.fn();
      const options = { option };
      const keys = ['option'];

      await installOptions(options, keys);

      expect(contextState.getInstalling()).toEqual(keys);
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
