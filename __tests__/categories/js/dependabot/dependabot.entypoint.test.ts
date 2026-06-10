import { fileSystem } from '#__tests__/setup-test-context.ts';
import { defaultConfig } from '#src/categories/js/dependabot/config/default.config.ts';
import { dependabot } from '#src/categories/js/dependabot/dependabot.entrypoint.ts';

describe('dependabot', () => {
  test('writes the default dependabot config under .github', async () => {
    await dependabot();

    expect(fileSystem.getDirs()).toEqual(['.github']);
    expect(fileSystem.readFile('.github/dependabot.yml')).toBe(`${defaultConfig.content}\n`);
  });
});
