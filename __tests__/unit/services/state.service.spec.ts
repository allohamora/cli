import {
  createCategoryState,
  createConfigState,
  createTypeState,
  jsCategoryState,
} from '#src/services/state.service.ts';

describe('state.service', () => {
  describe('jsCategoryState', () => {
    it('is initialized', () => {
      expect(jsCategoryState).toBeDefined();
      expect(jsCategoryState.name).toBe('js');
      expect(jsCategoryState.configTypes).toEqual(['default', 'node:ts', 'react:ts']);
    });
  });

  describe('createTypeState', () => {
    const types = ['1', '2'] as const;
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

      setType(newType);

      expect(getType()).toBe(newType);
    });
  });

  describe('createConfigState', () => {
    const types = ['default', '1', '2', '3'] as const;
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
      setType('1');

      const actual = getConfig();
      const expected = configValues['1'];

      expect(actual).toBe(expected);
    });

    it('returns default config if selected not found', () => {
      setType('2');

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
      const configValues = { default: 'default', '1': '1' };

      const [, setConfigKey] = state.configState;

      const [getConfig] = state.useConfigState(configValues);
      expect(getConfig()).toBe(configValues.default);

      setConfigKey('1');
      expect(getConfig()).toBe(configValues['1']);
    });
  });
});
