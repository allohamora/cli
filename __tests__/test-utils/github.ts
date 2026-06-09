import { yamlParse } from '#__tests__/test-utils/yaml.ts';

export const expectGithubWorkflow = (yamlString: string, message = 'should be parsed') => {
  test(message, () => {
    const parsed = yamlParse(yamlString);
    const typeofOn = typeof parsed.on;

    expect(typeof parsed.name).toBe('string');
    expect(typeofOn === 'object' || typeofOn === 'string').toBeTruthy();
    expect(typeof parsed.jobs).toBe('object');
  });
};
