import { expect, it } from 'vitest';

export const expectGithubWorkflow = (
  workflow: Record<string, unknown>,
  message = 'is valid github workflow config',
) => {
  it(message, () => {
    const typeofOn = typeof workflow.on;

    expect(typeof workflow.name).toBe('string');
    expect(typeofOn === 'object' || typeofOn === 'string').toBeTruthy();
    expect(typeof workflow.jobs).toBe('object');
  });
};
