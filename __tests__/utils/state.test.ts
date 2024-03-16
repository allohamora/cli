import { createCategoryState, createConfigState, createTypeState } from 'src/utils/state';

describe('createTypeState', () => {
  const types = ['1', '2'];
  const createNewTypeState = () => createTypeState(types);

  let [getType, setType] = createNewTypeState();

  beforeEach(() => {
    [getType, setType] = createNewTypeState();
  });

  test('should return type', () => {
    expect(getType()).toBeDefined();
  });

  test('should init state with first type', () => {
    expect(getType()).toBe(types[0]);
  });

  test('should set type', () => {
    const newType = types[1];

    setType(newType);

    expect(getType()).toBe(newType);
  });
});

describe('createConfigState', () => {
  const types = ['1', '2', '3'];
  const createNewTypeState = () => createTypeState(types);
  let state = createNewTypeState();
  let [, setType] = state;

  const configValues = { default: 'default', '1': '1' };
  const createNewConfigState = () => createConfigState(state, configValues);
  let [getConfig] = createNewConfigState();

  afterEach(() => {
    state = createNewTypeState();
    [, setType] = state;
    [getConfig] = createNewConfigState();
  });

  test('should return selected config value', () => {
    setType(types[0]);

    const actual = getConfig();
    const expected = configValues['1'];

    expect(actual).toBe(expected);
  });

  test('should return default config if selected not found', () => {
    setType(types[1]);

    const actual = getConfig();
    const expected = configValues.default;

    expect(actual).toBe(expected);
  });
});

describe('createCategoryState', () => {
  const name = '__test__';
  const values = ['1', '2', '3'] as const;
  const createNewCategoryState = () => createCategoryState(name, values);

  let state = createNewCategoryState();

  afterEach(() => {
    state = createNewCategoryState();
  });

  test('should create and return configState', () => {
    expect(state.configState).toBeDefined();
  });

  test('should return category name', () => {
    const actual = state.name;
    const expected = name;

    expect(actual).toBe(expected);
  });

  test('should add default option to configOptions', () => {
    const actual = state.configTypes;
    const expected = ['default', ...values];

    expect(actual).toEqual(expected);
  });

  test('should return useConfigValue', () => {
    expect(state.useConfigState).toBeDefined();
  });

  test('should return useConfigValue what creates a local state', () => {
    const values = { default: 'default', '1': '1' };

    const [, setConfigKey] = state.configState;

    const [getConfig] = state.useConfigState(values);
    expect(getConfig()).toBe(values.default);

    setConfigKey('1');
    expect(getConfig()).toBe(values['1']);
  });
});
