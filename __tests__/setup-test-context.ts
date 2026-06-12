import { ConsoleMock } from './mocks/console.mock.ts';
import { FileSystem } from './mocks/fs.mock.ts';
import { InstallationState } from './mocks/installation-state.mock.ts';
import { Loading } from './mocks/loading.mock.ts';
import { PresetStateMock } from './mocks/preset-state.mock.ts';
import { Prompt } from './mocks/prompt.mock.ts';
import { Terminal } from './mocks/terminal.mock.ts';

export const consoleMock = new ConsoleMock();
export const presetState = new PresetStateMock();
export const installationState = new InstallationState();
export const fileSystem = new FileSystem();
export const terminal = new Terminal();
export const prompt = new Prompt();
export const loading = new Loading();

beforeEach(() => {
  consoleMock.setup();
  presetState.setup();
  installationState.setup();
  fileSystem.setup();
  terminal.setup();
  prompt.setup();
  loading.setup();
});

afterEach(() => {
  consoleMock.clear();
  presetState.clear();
  installationState.clear();
  fileSystem.clear();
  terminal.clear();
  prompt.clear();
  loading.clear();
});
