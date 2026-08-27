import { getDevcontainerJson, getFeatures } from '#src/categories/js/personal-devcontainer/preset/default.preset.ts';
import { describe, expect, it } from 'vitest';

describe('personal-devcontainer/preset/default.preset', () => {
  describe('getDevcontainerJson', () => {
    it('returns the devcontainer.json content for the given project name', () => {
      expect(getDevcontainerJson({ name: 'my-app' })).toEqual({
        name: 'my-app',
        remoteUser: 'vscode',
        containerUser: 'vscode',
        workspaceMount: 'source=${localWorkspaceFolder},target=/workspaces/my-app,type=bind,consistency=cached',
        workspaceFolder: '/workspaces/my-app',
        image: 'mcr.microsoft.com/devcontainers/base:ubuntu-24.04',
        features: {
          './features/personal-github-cli': {},
          './features/my-app-node': {},
          './features/personal-claude-code': {},
          './features/personal-codex': {},
        },
        runArgs: ['--name', 'my-app-devcontainer', '--sysctl', 'net.ipv6.conf.all.disable_ipv6=1'],
      });
    });

    it('adds the docker-in-docker feature and privileged mode when a docker-compose file exists', () => {
      expect(getDevcontainerJson({ name: 'my-app', hasDockerCompose: true })).toEqual({
        name: 'my-app',
        remoteUser: 'vscode',
        containerUser: 'vscode',
        workspaceMount: 'source=${localWorkspaceFolder},target=/workspaces/my-app,type=bind,consistency=cached',
        workspaceFolder: '/workspaces/my-app',
        image: 'mcr.microsoft.com/devcontainers/base:ubuntu-24.04',
        features: {
          './features/personal-docker-in-docker': {},
          './features/personal-github-cli': {},
          './features/my-app-node': {},
          './features/personal-claude-code': {},
          './features/personal-codex': {},
        },
        runArgs: ['--name', 'my-app-devcontainer', '--sysctl', 'net.ipv6.conf.all.disable_ipv6=1'],
        privileged: true,
      });
    });
  });

  describe('getFeatures', () => {
    it('returns the node feature for the given project name', () => {
      const [nodeFeature] = getFeatures({ name: 'my-app' });

      expect(nodeFeature?.name).toBe('my-app-node');
      expect(nodeFeature?.featureJson).toEqual({
        id: 'my-app-node',
        version: '1.0.0',
        name: 'My App Node',
        description: 'Installs Node.js and persists node_modules',
        dependsOn: {
          'ghcr.io/devcontainers/features/node:2': {
            version: '24.14.1',
          },
        },
        mounts: [
          {
            type: 'volume',
            source: 'devcontainer-my-app-node-modules',
            target: '/workspaces/my-app/node_modules',
          },
        ],
        customizations: {
          vscode: {
            extensions: ['editorconfig.editorconfig', 'streetsidesoftware.code-spell-checker'],
          },
        },
      });
      expect(nodeFeature?.installScript).toBe(
        [
          '#!/bin/sh',
          'set -eu',
          '',
          'WORKSPACES_DIR="/workspaces"',
          'PROJECT_DIR="$WORKSPACES_DIR/my-app"',
          'NVM_PROFILE_SCRIPT="/etc/profile.d/nvm.sh"',
          'NVM_DIR_EXPORT=\'export NVM_DIR="/usr/local/share/nvm"\'',
          'NVM_SOURCE_LINE=\'[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"\'',
          '',
          '# Set up the node_modules volume targets',
          'mkdir -p "$PROJECT_DIR/node_modules"',
          'chown -R "$_REMOTE_USER:$(id -gn "$_REMOTE_USER")" "$WORKSPACES_DIR"',
          '',
          '# The node feature only wires nvm into bashrc/zshrc, which non-interactive login',
          "# shells (e.g. `su - user -c '...'`, used by other features' native installers)",
          '# never source. Add it to profile.d so those shells can still find node/npm.',
          'touch "$NVM_PROFILE_SCRIPT"',
          '',
          '# Add the NVM_DIR export',
          'if ! grep -Fqx "$NVM_DIR_EXPORT" "$NVM_PROFILE_SCRIPT"; then',
          '    printf "%s\\n" "$NVM_DIR_EXPORT" >> "$NVM_PROFILE_SCRIPT"',
          'fi',
          '',
          '# Add the nvm.sh sourcing line',
          'if ! grep -Fqx "$NVM_SOURCE_LINE" "$NVM_PROFILE_SCRIPT"; then',
          '    printf "%s\\n" "$NVM_SOURCE_LINE" >> "$NVM_PROFILE_SCRIPT"',
          'fi',
          '',
          "# Make it world-readable so every user's login shell can source it, root-writable only",
          'chmod 0644 "$NVM_PROFILE_SCRIPT"',
        ].join('\n'),
      );
    });

    it('adds a node_modules volume mount and mkdir path for each workspace package', () => {
      const [nodeFeature] = getFeatures({
        name: 'ridge-bridge',
        workspacePackages: [
          { name: 'api', dirPath: 'apps/api' },
          { name: 'client', dirPath: 'apps/client' },
        ],
      });

      expect(nodeFeature?.featureJson.mounts).toEqual([
        {
          type: 'volume',
          source: 'devcontainer-ridge-bridge-node-modules',
          target: '/workspaces/ridge-bridge/node_modules',
        },
        {
          type: 'volume',
          source: 'devcontainer-ridge-bridge-node-modules-api',
          target: '/workspaces/ridge-bridge/apps/api/node_modules',
        },
        {
          type: 'volume',
          source: 'devcontainer-ridge-bridge-node-modules-client',
          target: '/workspaces/ridge-bridge/apps/client/node_modules',
        },
      ]);

      expect(nodeFeature?.installScript).toBe(
        [
          '#!/bin/sh',
          'set -eu',
          '',
          'WORKSPACES_DIR="/workspaces"',
          'PROJECT_DIR="$WORKSPACES_DIR/ridge-bridge"',
          'NVM_PROFILE_SCRIPT="/etc/profile.d/nvm.sh"',
          'NVM_DIR_EXPORT=\'export NVM_DIR="/usr/local/share/nvm"\'',
          'NVM_SOURCE_LINE=\'[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"\'',
          '',
          '# Set up the node_modules volume targets',
          'mkdir -p "$PROJECT_DIR/node_modules" "$PROJECT_DIR/apps/api/node_modules" "$PROJECT_DIR/apps/client/node_modules"',
          'chown -R "$_REMOTE_USER:$(id -gn "$_REMOTE_USER")" "$WORKSPACES_DIR"',
          '',
          '# The node feature only wires nvm into bashrc/zshrc, which non-interactive login',
          "# shells (e.g. `su - user -c '...'`, used by other features' native installers)",
          '# never source. Add it to profile.d so those shells can still find node/npm.',
          'touch "$NVM_PROFILE_SCRIPT"',
          '',
          '# Add the NVM_DIR export',
          'if ! grep -Fqx "$NVM_DIR_EXPORT" "$NVM_PROFILE_SCRIPT"; then',
          '    printf "%s\\n" "$NVM_DIR_EXPORT" >> "$NVM_PROFILE_SCRIPT"',
          'fi',
          '',
          '# Add the nvm.sh sourcing line',
          'if ! grep -Fqx "$NVM_SOURCE_LINE" "$NVM_PROFILE_SCRIPT"; then',
          '    printf "%s\\n" "$NVM_SOURCE_LINE" >> "$NVM_PROFILE_SCRIPT"',
          'fi',
          '',
          "# Make it world-readable so every user's login shell can source it, root-writable only",
          'chmod 0644 "$NVM_PROFILE_SCRIPT"',
        ].join('\n'),
      );
    });

    it('returns the personal-github-cli, personal-claude-code, and personal-codex features unchanged by name', () => {
      const [, githubCliFeature, claudeCodeFeature, codexFeature] = getFeatures({ name: 'my-app' });

      expect(githubCliFeature?.name).toBe('personal-github-cli');
      expect(githubCliFeature?.featureJson).toEqual({
        id: 'personal-github-cli',
        version: '1.0.0',
        name: 'Personal GitHub CLI',
        description: 'Installs GitHub CLI with persistent configuration',
        dependsOn: {
          'ghcr.io/devcontainers/features/github-cli:1': {},
        },
        mounts: [
          {
            type: 'volume',
            source: 'devcontainer-personal-github-cli-config',
            target: '/home/vscode/.config/gh',
          },
        ],
      });
      expect(githubCliFeature?.installScript).toBe(
        [
          '#!/bin/sh',
          'set -eu',
          '',
          'GITHUB_CONFIG_DIR="${_REMOTE_USER_HOME}/.config/gh"',
          '',
          '# Set up the GitHub CLI configuration volume target',
          'mkdir -p "$GITHUB_CONFIG_DIR"',
          'chown -R "$_REMOTE_USER:$(id -gn "$_REMOTE_USER")" "$GITHUB_CONFIG_DIR"',
        ].join('\n'),
      );

      expect(claudeCodeFeature?.name).toBe('personal-claude-code');
      expect(claudeCodeFeature?.featureJson).toEqual({
        id: 'personal-claude-code',
        version: '1.0.0',
        name: 'Personal Claude Code',
        description: 'Installs Claude Code with the official native installer for the personal development environment',
        mounts: [
          {
            type: 'volume',
            source: 'devcontainer-personal-claude-code-config',
            target: '/home/vscode/.claude',
          },
        ],
        customizations: {
          vscode: {
            extensions: ['anthropic.claude-code'],
          },
        },
      });
      expect(claudeCodeFeature?.installScript).toBe(
        [
          '#!/bin/sh',
          'set -eu',
          '',
          'CLAUDE_DIR="${_REMOTE_USER_HOME}/.claude"',
          'CLAUDE_CONFIG="${_REMOTE_USER_HOME}/.claude.json"',
          'SHELL_CONFIG="${_REMOTE_USER_HOME}/.bashrc"',
          'REMOTE_GROUP="$(id -gn "$_REMOTE_USER")"',
          'CLAUDE_PATH_EXPORT=\'export PATH="$HOME/.local/bin:$PATH"\'',
          'CLAUDE_YOLO_ALIAS="alias claude-yolo=\'claude --dangerously-skip-permissions\'"',
          '',
          '# Set up the Claude configuration volume target and persistent .claude.json symlink',
          'mkdir -p "$CLAUDE_DIR"',
          'ln -snf "$CLAUDE_DIR/__do_not_use_user_claude.json" "$CLAUDE_CONFIG"',
          'touch "$SHELL_CONFIG"',
          '',
          '# Add the native installer location',
          'if ! grep -Fqx "$CLAUDE_PATH_EXPORT" "$SHELL_CONFIG"; then',
          '    printf "\\n%s\\n" "$CLAUDE_PATH_EXPORT" >> "$SHELL_CONFIG"',
          'fi',
          '',
          '# Add the claude-yolo alias',
          'if ! grep -Fqx "$CLAUDE_YOLO_ALIAS" "$SHELL_CONFIG"; then',
          '    printf "\\n%s\\n" "$CLAUDE_YOLO_ALIAS" >> "$SHELL_CONFIG"',
          'fi',
          '',
          '# Set ownership for the remote user',
          'chown -R "$_REMOTE_USER:$REMOTE_GROUP" "$CLAUDE_DIR"',
          'chown -h "$_REMOTE_USER:$REMOTE_GROUP" "$CLAUDE_CONFIG"',
          'chown "$_REMOTE_USER:$REMOTE_GROUP" "$SHELL_CONFIG"',
          '',
          "# Install Claude Code as the remote user because the native installer writes to the user's home",
          'su - "$_REMOTE_USER" -c "$CLAUDE_PATH_EXPORT; curl -fsSL https://claude.ai/install.sh | bash"',
          '',
          '# Verify the native installation',
          '"${_REMOTE_USER_HOME}/.local/bin/claude" --version',
        ].join('\n'),
      );

      expect(codexFeature?.name).toBe('personal-codex');
      expect(codexFeature?.featureJson).toEqual({
        id: 'personal-codex',
        version: '1.0.0',
        name: 'Personal Codex',
        description: 'Installs Codex with the official native installer for the personal development environment',
        mounts: [
          {
            type: 'volume',
            source: 'devcontainer-personal-codex-config',
            target: '/home/vscode/.codex',
          },
        ],
        customizations: {
          vscode: {
            extensions: ['openai.chatgpt'],
          },
        },
      });
      expect(codexFeature?.installScript).toBe(
        [
          '#!/bin/sh',
          'set -eu',
          '',
          'CODEX_DIR="${_REMOTE_USER_HOME}/.codex"',
          'SHELL_CONFIG="${_REMOTE_USER_HOME}/.bashrc"',
          'REMOTE_GROUP="$(id -gn "$_REMOTE_USER")"',
          'CODEX_PATH_EXPORT=\'export PATH="$HOME/.local/bin:$PATH"\'',
          'CODEX_YOLO_ALIAS="alias codex-yolo=\'codex --dangerously-bypass-approvals-and-sandbox\'"',
          '',
          '# Set up the Codex configuration volume target',
          'mkdir -p "$CODEX_DIR"',
          'touch "$SHELL_CONFIG"',
          '',
          '# Add the native installer location',
          'if ! grep -Fqx "$CODEX_PATH_EXPORT" "$SHELL_CONFIG"; then',
          '    printf "\\n%s\\n" "$CODEX_PATH_EXPORT" >> "$SHELL_CONFIG"',
          'fi',
          '',
          '# Add the codex-yolo alias',
          'if ! grep -Fqx "$CODEX_YOLO_ALIAS" "$SHELL_CONFIG"; then',
          '    printf "\\n%s\\n" "$CODEX_YOLO_ALIAS" >> "$SHELL_CONFIG"',
          'fi',
          '',
          '# Set ownership for the remote user',
          'chown -R "$_REMOTE_USER:$REMOTE_GROUP" "$CODEX_DIR"',
          'chown "$_REMOTE_USER:$REMOTE_GROUP" "$SHELL_CONFIG"',
          '',
          "# Install Codex as the remote user because the native installer writes to the user's home",
          'su - "$_REMOTE_USER" -c "$CODEX_PATH_EXPORT; curl -fsSL https://chatgpt.com/codex/install.sh | sh"',
          '',
          '# Verify the native installation',
          '"${_REMOTE_USER_HOME}/.local/bin/codex" --version',
        ].join('\n'),
      );
    });

    it('does not return the docker-in-docker feature when there is no docker-compose file', () => {
      expect(getFeatures({ name: 'my-app' })).toHaveLength(4);
    });

    it('returns the docker-in-docker feature first when there is a docker-compose file', () => {
      const features = getFeatures({ name: 'my-app', hasDockerCompose: true });
      const dockerFeature = features[0];

      expect(features).toHaveLength(5);
      expect(dockerFeature?.name).toBe('personal-docker-in-docker');
      expect(dockerFeature?.featureJson).toEqual({
        id: 'personal-docker-in-docker',
        version: '1.0.0',
        name: 'Personal Docker-in-Docker',
        description: 'Installs Docker-in-Docker with persistent Docker data',
        dependsOn: {
          'ghcr.io/devcontainers/features/docker-in-docker:4': {},
        },
        mounts: [
          {
            type: 'volume',
            source: 'devcontainer-personal-docker-in-docker-data',
            target: '/var/lib/docker',
          },
          {
            type: 'volume',
            source: 'devcontainer-personal-docker-in-docker-containerd',
            target: '/var/lib/containerd',
          },
        ],
        customizations: {
          vscode: {
            extensions: ['docker.docker', 'ms-azuretools.vscode-containers', 'ms-azuretools.vscode-docker'],
          },
        },
      });
      expect(dockerFeature?.installScript).toBe(
        [
          '#!/bin/sh',
          'set -eu',
          '',
          '# Docker installation is provided by the official Docker-in-Docker Feature dependency.',
        ].join('\n'),
      );
    });
  });
});
