import * as inquirer from 'inquirer';
import { manyOf, miniumOneValidate, oneOf } from 'src/utils/prompt';

jest.mock('inquirer');
const inquirerMocked = jest.mocked(inquirer);

beforeEach(() => {
  jest.clearAllMocks();
});

const message = '__test__';
const choices = ['a', 'b', 'c'];

describe('oneOf', () => {
  test('should run inquirer.prompt with type: list', async () => {
    const choice = choices[0];
    inquirerMocked.prompt.mockResolvedValueOnce({ [message]: choice });

    const actual = await oneOf(message, choices);
    const expected = choice;

    const promptOptions = {
      type: 'list',
      name: message,
      message,
      choices,
    };

    expect(inquirerMocked.prompt).toHaveBeenCalledWith(promptOptions);
    expect(actual).toBe(expected);
  });
});

describe('miniumOneValidate', () => {
  test('should return true if answers contains minium one item', () => {
    const actual = miniumOneValidate([1]);
    const expected = true;

    expect(actual).toBe(expected);
  });

  test('should return false if answers contains less than one item', () => {
    const actual = miniumOneValidate([]);
    const expected = false;

    expect(actual).toBe(expected);
  });
});

describe('manyOf', () => {
  test('should run inquirer.prompt with type: checkbox and minium one validate rule', async () => {
    const resolvedChoices = [choices[0], choices[2]];
    inquirerMocked.prompt.mockResolvedValueOnce({ [message]: resolvedChoices });

    const actual = await manyOf(message, choices);
    const expected = resolvedChoices;

    const promptOptions = {
      type: 'checkbox',
      name: message,
      message,
      choices,
      validate: miniumOneValidate,
    };

    expect(inquirerMocked.prompt).toHaveBeenCalledWith(promptOptions);
    expect(actual).toBe(expected);
  });
});
