import { createCategory, createPresetState, jsCategory } from '#src/services/state.service.ts';
import { afterEach, describe, expect, it } from 'vitest';

describe('state.service', () => {
  describe('jsCategory', () => {
    it('is initialized', () => {
      expect(jsCategory).toBeDefined();
      expect(jsCategory.name).toBe('js');
      expect(jsCategory.presets).toEqual(['default', 'node:ts', 'react:ts']);
    });
  });

  describe('createPresetState', () => {
    const types = ['default', '1', '2', '3'] as const;
    const createNewPresetState = () => createPresetState(types);
    let state = createNewPresetState();

    afterEach(() => {
      state = createNewPresetState();
    });

    it('returns selected preset', () => {
      expect(state.getPreset()).toBe(types[0]);
    });

    it('sets selected preset', () => {
      state.setPreset('2');

      expect(state.getPreset()).toBe('2');
    });

    it('throws for empty presets', () => {
      expect(() => createPresetState([])).toThrow('createPresetState requires at least one preset');
    });
  });

  describe('createCategory', () => {
    const name = '__test__';
    const values = ['1', '2', '3'] as const;
    const createNewCategoryState = () => createCategory(name, values);

    let state = createNewCategoryState();

    afterEach(() => {
      state = createNewCategoryState();
    });

    it('creates and returns presetState', () => {
      expect(state.presetState).toBeDefined();
    });

    it('returns category name', () => {
      const actual = state.name;
      const expected = name;

      expect(actual).toBe(expected);
    });

    it('adds default option to presets', () => {
      const actual = state.presets;
      const expected = ['default', ...values];

      expect(actual).toEqual(expected);
    });

    it('returns usePreset', () => {
      expect(state.usePreset).toBeDefined();
    });

    it('returns usePreset that reads from preset state', () => {
      const configValues = { default: 'default', '1': '1' };
      const [getPreset] = state.usePreset(configValues);

      expect(getPreset()).toBe(configValues.default);

      state.presetState.setPreset('1');
      expect(getPreset()).toBe(configValues['1']);
    });
  });
});
