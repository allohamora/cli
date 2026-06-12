import js from '#src/categories/js/index.ts';
import { jsCategory } from '#src/services/state.service.ts';
import { describe, expect, it } from 'vitest';

describe('index', () => {
  describe('js', () => {
    it('exports state', () => {
      expect(js.state).toBe(jsCategory);
    });

    it('exports options', () => {
      expect(js.options).toBeDefined();
      expect(typeof js.options).toBe('object');
    });
  });
});
