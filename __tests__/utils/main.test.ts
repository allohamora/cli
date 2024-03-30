import * as ora from 'ora';
import * as prompt from 'src/utils/prompt';
import * as context from 'src/states/context';
import categories from 'src/categories';
import { chooseOptions, getCategory, getOptions, installOptions } from 'src/utils/main';
import { Category } from 'src/types/category';
import { camelize, kebablize } from 'src/utils/string';
import { clearMock } from '__tests__/test-utils/clear-mock';

const oraMocked = ora as unknown as {
  oraMocked: jest.Mock;
  oraStart: jest.Mock;
  oraStop: jest.Mock;
  oraTextSet: jest.Mock;
};

jest.mock('ora', () => {
  const oraMocked = jest.fn();
  const oraStart = jest.fn();
  const oraStop = jest.fn();
  const oraTextSet = jest.fn();

  return {
    __esModule: true,
    default: oraMocked.mockReturnValue({
      start: oraStart.mockReturnValue({
        stop: oraStop,
        set text(value: string) {
          oraTextSet(value);
        },
      }),
    }),

    oraMocked,
    oraStop,
    oraStart,
    oraTextSet,
  };
});

jest.mock('src/categories', () => {
  const js = {
    ...jest.requireActual('src/categories').default.js,
    options: {
      jest: jest.fn(),
      lintStaged: jest.fn(),
    },
  } as Category;

  return { js };
});

const js = categories.js as Category;
const categoryKeys = Object.keys(categories);
const jsOptionKeys = Object.keys(js.options);

jest.mock('src/utils/prompt');
const promptMocked = jest.mocked(prompt);

jest.mock('src/states/context');
const contextMocked = jest.mocked(context);

describe('getCategory', () => {
  test('should return selected category', async () => {
    promptMocked.oneOf.mockResolvedValueOnce('js');

    const actual = await getCategory();
    const expected = js;

    expect(actual).toBe(expected);
    expect(promptMocked.oneOf).toHaveBeenCalledWith('choose a category', categoryKeys);
  });
});

describe('getOptions', () => {
  test('should return selected options', async () => {
    const [, selectedOption] = js.state.configTypes;

    promptMocked.oneOf.mockResolvedValueOnce(selectedOption);

    const actual = await getOptions(js);
    const expected = js.options;

    expect(actual).toBe(expected);
    expect(js.state.configState[0]()).toBe(selectedOption);
    expect(promptMocked.oneOf).toHaveBeenCalledWith('choose a config', js.state.configTypes);
  });
});

describe('chooseOptions', () => {
  test('should print kebablized options and return selected', async () => {
    const kebablized = jsOptionKeys.map(kebablize);
    const selected = [kebablized[0]];
    const expected = selected.map(camelize);

    promptMocked.manyOf.mockResolvedValueOnce(selected);

    const actual = await chooseOptions(js.options);

    expect(actual).toEqual(expected);
    expect(promptMocked.manyOf).toHaveBeenCalledWith('choose a options', kebablized);
  });
});

describe('installOptions', () => {
  beforeEach(() => {
    clearMock(oraMocked);
  });

  test('should start spinner on start and stop on stop and print kebablize name', async () => {
    const optionHello = jest.fn();
    await installOptions({ optionHello }, ['optionHello']);

    expect(optionHello).toHaveBeenCalled();
    expect(oraMocked.oraMocked).toHaveBeenCalledWith('starting install');
    expect(oraMocked.oraStart).toHaveBeenCalled();
    expect(oraMocked.oraTextSet).toHaveBeenCalledWith('option-hello is installing\n');
    expect(oraMocked.oraStop).toHaveBeenCalled();
  });

  test('should set installing options', async () => {
    const option = jest.fn();
    const options = { option };
    const keys = ['option'];

    await installOptions(options, keys);

    expect(contextMocked.setInstalling).toHaveBeenCalledWith(keys);
  });

  test('should run selected scripts', async () => {
    const option1 = jest.fn();
    const option2 = jest.fn();
    const options = { option1, option2 };
    const keys = ['option1', 'option2'];

    await installOptions(options, keys);

    expect(option1).toHaveBeenCalled();
    expect(option2).toHaveBeenCalled();
  });
});
