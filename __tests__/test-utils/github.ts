import { yamlParse } from './yaml';

export const expectGithubWorkflow = (yamlString: string, message = 'should be parsed') => {
  test(message, () => {
    const parsed = yamlParse(yamlString);

    expect(typeof parsed.name).toBe('string');
    expect(typeof parsed.on).toBe('object');
    expect(typeof parsed.jobs).toBe('object');
  });
};
