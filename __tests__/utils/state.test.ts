import { createConfigState, createTypeState } from 'src/utils/state';

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
  let [getType, setType] = state;

  const configValues = { default: 'default', '1': '1' };
  const createNewConfigState = () => createConfigState(state, configValues);
  let [getConfig] = createNewConfigState();

  afterEach(() => {
    state = createNewTypeState();
    [getType, setType] = state;
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
