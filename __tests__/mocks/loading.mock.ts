import * as ora from 'ora';
import type { MockInstance } from 'vitest';

vi.mock('ora');

export class Loading {
  private spy?: MockInstance;

  private labels: string[] = [];
  private starts = 0;
  private finishes = 0;
  private texts: string[] = [];

  public setup() {
    this.reset();
    this.clear();

    this.spy = vi.spyOn(ora, 'default').mockImplementation((label) => {
      this.labels.push(String(label));

      const self = this;

      const spinner = {
        start: vi.fn(() => {
          self.starts += 1;

          return spinner;
        }),
        stop: vi.fn(() => {
          self.finishes += 1;

          return spinner;
        }),
        set text(value: string) {
          self.texts.push(value);
        },
      };

      return spinner as unknown as ReturnType<typeof ora.default>;
    });
  }

  public clear() {
    this.spy?.mockRestore();
    this.spy = undefined;
  }

  public reset() {
    this.labels = [];
    this.starts = 0;
    this.finishes = 0;
    this.texts = [];
  }

  public getLabels() {
    return this.labels;
  }

  public getStarts() {
    return this.starts;
  }

  public getFinishes() {
    return this.finishes;
  }

  public getTexts() {
    return this.texts;
  }
}
