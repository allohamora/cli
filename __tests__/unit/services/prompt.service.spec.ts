import { prompt } from '#__tests__/setup-test-context.ts';
import { chooseMany, chooseOne, requireAtLeastOneChoice } from '#src/services/prompt.service.ts';

describe('prompt.service', () => {
  const message = '__test__';
  const choices = ['a', 'b', 'c'] as const;

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
});
