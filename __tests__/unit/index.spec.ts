import { consoleMock, fileSystem, loading, prompt, terminal } from '#__tests__/setup-test-context.ts';
import { main } from '#src/index.ts';

describe('index', () => {
  describe('main', () => {
    it('prints welcome and bye message in bold', async () => {
      const log = vi.fn();
      consoleMock.setLogHandler(log);
      prompt.selectCategory('js');
      prompt.selectConfig('node:ts');
      prompt.selectEntrypoints();

      await main();

      expect(log).toHaveBeenCalledWith(`\x1b[22m\x1b[1mWelcome to Allohamora's cli\x1b[0m`);
      expect(log).toHaveBeenCalledWith(`\x1b[22m\x1b[1mInstallation completed\x1b[0m`);
    });

    it('runs selected scripts', async () => {
      prompt.selectCategory('js');
      prompt.selectConfig('node:ts');
      prompt.selectEntrypoints('husky');

      await main();

      expect(fileSystem.readJson('package.json')).toEqual({ scripts: { prepare: 'husky' } });
      expect(terminal.getCommands()).toEqual([
        ['npm', ['i', '-D', 'husky']],
        ['npm', ['run', 'prepare']],
      ]);
      expect(loading.getTexts()).toEqual(['husky is installing\n']);
    });
  });
});
