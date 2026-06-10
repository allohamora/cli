import { consoleMock, fileSystem, loading, prompt, terminal } from '#__tests__/setup-test-context.ts';
import { main } from '#src/index.ts';
import { white } from '#src/utils/console.ts';

describe('index', () => {
  describe('main', () => {
    it('prints welcome and bye message with white color', async () => {
      const log = vi.fn();
      consoleMock.setLogHandler(log);
      prompt.selectCategory('js');
      prompt.selectConfig('node:ts');
      prompt.selectEntrypoints();

      await main();

      expect(log).toHaveBeenCalledWith(white(`Welcome to Allohamora's cli`));
      expect(log).toHaveBeenCalledWith(white('Installation completed'));
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
