import pkg from '../../package.json' with { type: 'json' };
import { consoleMock, fileSystem, loading, prompt, terminal } from '#__tests__/setup-test-context.ts';
import { main } from '#src/index.ts';
import { CliError } from '#src/services/cli.service.ts';
import { describe, expect, it, vi } from 'vitest';

describe('index', () => {
  describe('main', () => {
    describe('interactive mode', () => {
      it('prints the welcome and completion messages in bold', async () => {
        const log = vi.fn();
        consoleMock.setLogHandler(log);
        prompt.selectCategory('js');
        prompt.selectPreset('node:ts');
        prompt.selectOptions();

        await main();

        expect(log).toHaveBeenCalledWith(`\x1b[22m\x1b[1mWelcome to Allohamora's cli\x1b[0m`);
        expect(log).toHaveBeenCalledWith(`\x1b[22m\x1b[1mInstallation completed\x1b[0m`);
      });

      it('runs selected scripts', async () => {
        prompt.selectCategory('js');
        prompt.selectPreset('node:ts');
        prompt.selectOptions('husky');

        await main();

        expect(fileSystem.readJson('package.json')).toEqual({ scripts: { prepare: 'husky' } });
        expect(terminal.getCommands()).toEqual([
          ['npm', ['i', '-D', 'husky']],
          ['npm', ['run', 'prepare']],
        ]);
        expect(loading.getTexts()).toEqual(['installing husky\n']);
      });
    });

    describe('non-interactive mode', () => {
      it('skips all prompts and installs provided options', async () => {
        await main(['js', 'node:ts', 'husky']);

        expect(prompt.getQuestions()).toHaveLength(0);
        expect(loading.getTexts()).toEqual(['installing husky\n']);
      });

      it('installs multiple options in order', async () => {
        await main(['js', 'node:ts', 'husky', 'prettier']);

        expect(loading.getTexts()).toEqual(['installing husky\n', 'installing prettier\n']);
      });

      it('does not print welcome or completion messages', async () => {
        const log = vi.fn();
        consoleMock.setLogHandler(log);

        await main(['js', 'node:ts', 'husky']);

        expect(log).not.toHaveBeenCalled();
      });

      it('prints help and returns', async () => {
        const log = vi.fn();
        consoleMock.setLogHandler(log);

        await main(['--help']);

        expect(log).toHaveBeenCalledTimes(1);
        expect(log.mock.calls[0]?.[0]).toContain('npx @allohamora/cli <category> <preset> <...options>');
      });

      it('prints version and returns', async () => {
        const log = vi.fn();
        consoleMock.setLogHandler(log);

        await main(['--version']);

        expect(log).toHaveBeenCalledWith(pkg.version);
        expect(log).toHaveBeenCalledTimes(1);
      });

      it('throws CliError for invalid args', async () => {
        await expect(main(['unknown'])).rejects.toThrow(CliError);
      });
    });
  });
});
