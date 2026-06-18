import { fileSystem } from '#__tests__/setup-test-context.ts';
import { addGitkeep, addToGitignore } from '#src/services/git.service.ts';
import { describe, expect, it } from 'vitest';

describe('git.service', () => {
  describe('addToGitignore', () => {
    it('creates .gitignore with comment and rules when .gitignore does not exist', async () => {
      await addToGitignore({ comment: '# Temp files', rules: ['.temp/**/*', '!.temp/.gitkeep'] });

      expect(fileSystem.readFile('.gitignore')).toBe(['# Temp files', '.temp/**/*', '!.temp/.gitkeep', ''].join('\n'));
    });

    it('appends rules to existing .gitignore', async () => {
      fileSystem.seed({ files: { '.gitignore': 'node_modules\n' } });

      await addToGitignore({ comment: '# Temp files', rules: ['.temp/**/*', '!.temp/.gitkeep'] });

      expect(fileSystem.readFile('.gitignore')).toBe(
        ['node_modules', '', '# Temp files', '.temp/**/*', '!.temp/.gitkeep', ''].join('\n'),
      );
    });

    it('removes existing rules and regroups them at the end', async () => {
      fileSystem.seed({ files: { '.gitignore': ['node_modules', '.temp/**/*', 'dist', ''].join('\n') } });

      await addToGitignore({ comment: '# Temp files', rules: ['.temp/**/*', '!.temp/.gitkeep'] });

      expect(fileSystem.readFile('.gitignore')).toBe(
        ['node_modules', 'dist', '', '# Temp files', '.temp/**/*', '!.temp/.gitkeep', ''].join('\n'),
      );
    });

    it('does not modify .gitignore when full block already exists', async () => {
      const existingContent = ['# Temp files', '.temp/**/*', '!.temp/.gitkeep', ''].join('\n');
      fileSystem.seed({ files: { '.gitignore': existingContent } });

      await addToGitignore({ comment: '# Temp files', rules: ['.temp/**/*', '!.temp/.gitkeep'] });

      expect(fileSystem.readFile('.gitignore')).toBe(existingContent);
    });

    it('removes partial entries and regroups them at the end', async () => {
      const existingContent = ['.temp/**/*', '!.temp/.gitkeep', ''].join('\n');
      fileSystem.seed({ files: { '.gitignore': existingContent } });

      await addToGitignore({ comment: '# Temp files', rules: ['.temp/**/*', '!.temp/.gitkeep'] });

      expect(fileSystem.readFile('.gitignore')).toBe(['# Temp files', '.temp/**/*', '!.temp/.gitkeep', ''].join('\n'));
    });
  });

  describe('addGitkeep', () => {
    it('creates the directory', async () => {
      await addGitkeep('.temp');

      expect(fileSystem.getDirs()).toContain('.temp');
    });

    it('writes .gitkeep file inside the directory', async () => {
      await addGitkeep('.temp');

      expect(fileSystem.readFile('.temp/.gitkeep')).toBe('\n');
    });

    it('does not recreate directory if it already exists', async () => {
      fileSystem.seed({ dirs: ['.temp'] });

      await addGitkeep('.temp');

      expect(fileSystem.getDirs()).toContain('.temp');
      expect(fileSystem.readFile('.temp/.gitkeep')).toBe('\n');
    });
  });
});
