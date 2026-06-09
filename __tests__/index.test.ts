const log = vi.spyOn(global.console, 'log').mockImplementation(vi.fn());

import * as consoleColors from 'src/utils/console';
import * as mainUtils from 'src/utils/main';
import { main } from 'src';
import { createCategoryState } from 'src/utils/state';
import { Category } from 'src/types/category';

vi.mock('src/utils/console');
const consoleColorsMocked = vi.mocked(consoleColors);

vi.mock('src/utils/main');
const mainUtilsMocked = vi.mocked(mainUtils);

beforeEach(() => {
  vi.clearAllMocks();
});

beforeAll(() => {
  log.mockReset();
});

describe('main', () => {
  test('should print welcome and bye message with white color', async () => {
    await main();

    expect(consoleColorsMocked.white).toHaveBeenCalledWith(`Welcome to Allohamora's cli`);
    expect(consoleColorsMocked.white).toHaveBeenCalledWith('Installation completed');
  });

  test('should run selected scripts', async () => {
    const options = { option: vi.fn() };
    const optionKeys = ['option'];
    const category = { options, state: createCategoryState('__state__', ['__test__']) } as Category;

    mainUtilsMocked.getCategory.mockResolvedValueOnce(category);
    mainUtilsMocked.getOptions.mockResolvedValueOnce(options);
    mainUtilsMocked.chooseOptions.mockResolvedValueOnce(optionKeys);
    mainUtilsMocked.installOptions.mockResolvedValueOnce(undefined);

    await main();

    expect(mainUtils.getCategory).toHaveBeenCalled();
    expect(mainUtils.getOptions).toHaveBeenCalledWith(category);
    expect(mainUtils.chooseOptions).toHaveBeenCalledWith(options);
    expect(mainUtils.installOptions).toHaveBeenCalledWith(options, optionKeys);
  });
});
