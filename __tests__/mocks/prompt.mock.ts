import inquirer from 'inquirer';
import type { MockInstance } from 'vitest';

vi.mock('inquirer');

export type PromptAnswer = {
  message: string;
  value: unknown;
};

export class Prompt {
  private spy?: MockInstance;
  private answers: PromptAnswer[] = [];
  private questions: unknown[] = [];

  public setup() {
    this.reset();
    this.clear();

    this.spy = vi.spyOn(inquirer, 'prompt').mockImplementation((question) => {
      this.questions.push(question);

      const prompt = question as { message?: string; name?: string };
      const message = prompt.name ?? prompt.message ?? '';
      const index = this.answers.findIndex((answer) => answer.message === message);
      const [answer] = index === -1 ? [] : this.answers.splice(index, 1);

      return {
        [message]: answer?.value,
      } as unknown as ReturnType<typeof inquirer.prompt>;
    });
  }

  public clear() {
    this.spy?.mockRestore();
    this.spy = undefined;
  }

  public reset() {
    this.answers = [];
    this.questions = [];
  }

  public answer(message: string, value: unknown) {
    this.answers.push({ message, value });
  }

  public selectCategory(category: string) {
    this.answer('choose a category', category);
  }

  public selectConfig(config: string) {
    this.answer('choose a config', config);
  }

  public selectEntrypoints(...entrypoints: string[]) {
    this.answer('choose a options', entrypoints);
  }

  public getAnswers() {
    return this.answers;
  }

  public getQuestions() {
    return this.questions;
  }
}
