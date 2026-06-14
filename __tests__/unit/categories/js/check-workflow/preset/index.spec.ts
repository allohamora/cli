import { getCheckWorkflowPreset } from '#src/categories/js/check-workflow/preset/index.ts';
import { parse } from 'yaml';
import { describe, expect, it } from 'vitest';

const expectedContent = [
  'name: check',
  '',
  'on:',
  '  push:',
  '    branches:',
  '      - "**"',
  '',
  'jobs:',
  '  check:',
  '    runs-on: ubuntu-latest',
  '    env:',
  '      CI: true',
  '    steps:',
  '      - name: Checkout code',
  '        uses: actions/checkout@v6',
  '',
  '      - name: Install node',
  '        uses: actions/setup-node@v6',
  '        with:',
  '          cache: "npm"',
  '',
  '      - name: Install dependencies',
  '        run: npm ci',
];

describe('check-workflow/preset', () => {
  it('returns the base check workflow content', () => {
    expect(getCheckWorkflowPreset().content).toEqual(expectedContent);
  });

  it('returns valid github workflow yaml', () => {
    const parsed = parse(getCheckWorkflowPreset().content.join('\n'));
    const typeofOn = typeof parsed.on;

    expect(typeof parsed.name).toBe('string');
    expect(typeofOn === 'object' || typeofOn === 'string').toBeTruthy();
    expect(typeof parsed.jobs).toBe('object');
  });
});
