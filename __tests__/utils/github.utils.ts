import { expect, it } from 'vitest';

const isPlainObject = (value: unknown) => Object.prototype.toString.call(value) === '[object Object]';

const isWorkflowEvents = (value: unknown) =>
  typeof value === 'string' ||
  (Array.isArray(value) && value.every((event) => typeof event === 'string')) ||
  isPlainObject(value);

export const expectGithubWorkflow = (
  workflow: Record<string, unknown>,
  message = 'is valid github workflow config',
) => {
  it(message, () => {
    expect(typeof workflow.name).toBe('string');
    expect(isWorkflowEvents(workflow.on)).toBeTruthy();
    expect(isPlainObject(workflow.jobs)).toBeTruthy();
  });
};
