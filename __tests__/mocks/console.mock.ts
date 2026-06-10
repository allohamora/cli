import type { MockInstance } from 'vitest';

type LogHandler = typeof console.log;

export class ConsoleMock {
  private spy?: MockInstance;

  private logHandler: LogHandler = vi.fn();

  public setup() {
    this.reset();
    this.clear();

    this.spy = vi.spyOn(global.console, 'log').mockImplementation((...args) => this.logHandler(...args));
  }

  public clear() {
    this.spy?.mockRestore();
    this.spy = undefined;
  }

  public reset() {
    this.logHandler = vi.fn();
  }

  public setLogHandler(handler: LogHandler) {
    this.logHandler = handler;
  }
}
