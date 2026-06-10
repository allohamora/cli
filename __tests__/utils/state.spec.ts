import { createCategoryState, createConfigState, createTypeState } from '#src/utils/state.ts';

describe('state', () => {
  describe('createTypeState', () => {
    const types = ['1', '2'];
    const createNewTypeState = () => createTypeState(types);

    let [getType, setType] = createNewTypeState();

    beforeEach(() => {
      [getType, setType] = createNewTypeState();
    });

    it('returns type', () => {
      expect(getType()).toBeDefined();
    });

    it('initializes state with first type', () => {
      expect(getType()).toBe(types[0]);
    });

    it('sets type', () => {
      const newType = types[1];
      if (!newType) throw new Error('newType is not found');

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

    it('returns selected config value', () => {
      setType(types[0]!);

      const actual = getConfig();
      const expected = configValues['1'];

      expect(actual).toBe(expected);
    });

    it('returns default config if selected not found', () => {
      setType(types[1]!);

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

    it('creates and returns configState', () => {
      expect(state.configState).toBeDefined();
    });

    it('returns category name', () => {
      const actual = state.name;
      const expected = name;

      expect(actual).toBe(expected);
    });

    it('adds default option to configOptions', () => {
      const actual = state.configTypes;
      const expected = ['default', ...values];

      expect(actual).toEqual(expected);
    });

    it('returns useConfigValue', () => {
      expect(state.useConfigState).toBeDefined();
    });

    it('returns useConfigValue that creates a local state', () => {
      const values = { default: 'default', '1': '1' };

      const [, setConfigKey] = state.configState;

      const [getConfig] = state.useConfigState(values);
      expect(getConfig()).toBe(values.default);

      setConfigKey('1');
      expect(getConfig()).toBe(values['1']);
    });
  });
});
