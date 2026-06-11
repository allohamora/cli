import { parse } from 'yaml';

export const expectGithubWorkflow = (yamlString: string, message = 'is parsed') => {
  it(message, () => {
    const parsed = parse(yamlString);
    const typeofOn = typeof parsed.on;

    expect(typeof parsed.name).toBe('string');
    expect(typeofOn === 'object' || typeofOn === 'string').toBeTruthy();
    expect(typeof parsed.jobs).toBe('object');
  });
};
