const log = jest.spyOn(global.console, 'log').mockImplementation(jest.fn());

import * as consoleColors from 'src/utils/console';
import * as mainUtils from 'src/utils/main';
import { main } from 'src';
import { createCategoryState } from 'src/utils/state';
import { Category } from 'src/types/category';

jest.mock('src/utils/console');
const consoleColorsMocked = jest.mocked(consoleColors);

jest.mock('src/utils/main');
const mainUtilsMocked = jest.mocked(mainUtils);

beforeEach(() => {
  jest.clearAllMocks();
});

beforeAll(() => {
  log.mockReset();
});

describe('main', () => {
  test('should print welcome and bye message with white color', async () => {
    await main();

    expect(consoleColorsMocked.white).toBeCalledWith(`Welcome to Allohamora's cli`);
    expect(consoleColorsMocked.white).toBeCalledWith('Installation completed');
  });

  test('should run selected scripts', async () => {
    const options = { option: jest.fn() };
    const optionKeys = ['option'];
    const category = { options, state: createCategoryState('__state__', ['__test__']) } as Category;

    mainUtilsMocked.getCategory.mockResolvedValueOnce(category);
    mainUtilsMocked.getOptions.mockResolvedValueOnce(options);
    mainUtilsMocked.chooseOptions.mockResolvedValueOnce(optionKeys);
    mainUtilsMocked.installOptions.mockResolvedValueOnce(undefined);

    await main();

    expect(mainUtils.getCategory).toBeCalled();
    expect(mainUtils.getOptions).toBeCalledWith(category);
    expect(mainUtils.chooseOptions).toBeCalledWith(options);
    expect(mainUtils.installOptions).toBeCalledWith(options, optionKeys);
  });
});
