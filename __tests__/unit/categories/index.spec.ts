import categories from '#src/categories/index.ts';
import { describe, expect, it } from 'vitest';

describe('index', () => {
  describe('categories', () => {
    it('exports js state', () => {
      expect(categories).toBeDefined();
      expect(typeof categories).toBe('object');

      expect(categories.js).toBeDefined();
      expect(typeof categories.js).toBe('object');
    });
  });
});
