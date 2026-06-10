import { prompt } from '#__tests__/setup-test-context.ts';
import { manyOf, miniumOneValidate, oneOf } from '#src/utils/prompt.ts';

describe('prompt', () => {
  const message = '__test__';
  const choices = ['a', 'b', 'c'];

  describe('oneOf', () => {
    it('runs inquirer.prompt with type: select', async () => {
      const choice = choices[0];
      prompt.answer(message, choice);

      const actual = await oneOf(message, choices);
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

  describe('miniumOneValidate', () => {
    it('returns true if answers contain minium one item', () => {
      const actual = miniumOneValidate([1]);
      const expected = true;

      expect(actual).toBe(expected);
    });

    it('returns false if answers contain less than one item', () => {
      const actual = miniumOneValidate([]);
      const expected = false;

      expect(actual).toBe(expected);
    });
  });

  describe('manyOf', () => {
    it('runs inquirer.prompt with type: checkbox and minium one validate rule', async () => {
      const resolvedChoices = [choices[0], choices[2]];
      prompt.answer(message, resolvedChoices);

      const actual = await manyOf(message, choices);
      const expected = resolvedChoices;

      const promptOptions = {
        type: 'checkbox',
        name: message,
        message,
        choices,
        validate: miniumOneValidate,
      };

      expect(prompt.getQuestions()).toEqual([promptOptions]);
      expect(actual).toBe(expected);
    });
  });
});
