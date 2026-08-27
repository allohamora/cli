import { toTitleCase } from '#src/utils/string.utils.ts';

type GetDevcontainerJsonArgs = {
  name: string;
  hasDockerCompose?: boolean;
};

export const getDevcontainerJson = ({ name, hasDockerCompose = false }: GetDevcontainerJsonArgs) => ({
  name,
  remoteUser: 'vscode',
  containerUser: 'vscode',
  workspaceMount: `source=\${localWorkspaceFolder},target=/workspaces/${name},type=bind,consistency=cached`,
  workspaceFolder: `/workspaces/${name}`,
  image: 'mcr.microsoft.com/devcontainers/base:ubuntu-24.04',
  features: {
    ...(hasDockerCompose ? { './features/personal-docker-in-docker': {} } : {}),
    './features/personal-github-cli': {},
    [`./features/${name}-node`]: {},
    './features/personal-claude-code': {},
    './features/personal-codex': {},
  },
  runArgs: ['--name', `${name}-devcontainer`, '--sysctl', 'net.ipv6.conf.all.disable_ipv6=1'],
  ...(hasDockerCompose ? { privileged: true } : {}),
});

type WorkspacePackage = {
  name: string;
  dirPath: string;
};

type GetFeaturesArgs = {
  name: string;
  workspacePackages?: WorkspacePackage[];
  hasDockerCompose?: boolean;
};

export const getFeatures = ({ name, workspacePackages = [], hasDockerCompose = false }: GetFeaturesArgs) => [
  ...(hasDockerCompose
    ? [
        {
          name: 'personal-docker-in-docker',
          featureJson: {
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
          },
          installScript: [
            '#!/bin/sh',
            'set -eu',
            '',
            '# Docker installation is provided by the official Docker-in-Docker Feature dependency.',
          ].join('\n'),
        },
      ]
    : []),
  {
    name: `${name}-node`,
    featureJson: {
      id: `${name}-node`,
      version: '1.0.0',
      name: `${toTitleCase(name)} Node`,
      description: 'Installs Node.js and persists node_modules',
      dependsOn: {
        'ghcr.io/devcontainers/features/node:2': {
          version: '24.14.1',
        },
      },
      mounts: [
        {
          type: 'volume',
          source: `devcontainer-${name}-node-modules`,
          target: `/workspaces/${name}/node_modules`,
        },
        ...workspacePackages.map(({ name: packageName, dirPath }) => ({
          type: 'volume',
          source: `devcontainer-${name}-node-modules-${packageName}`,
          target: `/workspaces/${name}/${dirPath}/node_modules`,
        })),
      ],
      customizations: {
        vscode: {
          extensions: ['editorconfig.editorconfig', 'streetsidesoftware.code-spell-checker'],
        },
      },
    },
    installScript: [
      '#!/bin/sh',
      'set -eu',
      '',
      'WORKSPACES_DIR="/workspaces"',
      `PROJECT_DIR="$WORKSPACES_DIR/${name}"`,
      'NVM_PROFILE_SCRIPT="/etc/profile.d/nvm.sh"',
      'NVM_DIR_EXPORT=\'export NVM_DIR="/usr/local/share/nvm"\'',
      'NVM_SOURCE_LINE=\'[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"\'',
      '',
      '# Set up the node_modules volume targets',
      `mkdir -p ${['node_modules', ...workspacePackages.map(({ dirPath }) => `${dirPath}/node_modules`)].map((dir) => `"$PROJECT_DIR/${dir}"`).join(' ')}`,
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
  },
  {
    name: 'personal-github-cli',
    featureJson: {
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
    },
    installScript: [
      '#!/bin/sh',
      'set -eu',
      '',
      'GITHUB_CONFIG_DIR="${_REMOTE_USER_HOME}/.config/gh"',
      '',
      '# Set up the GitHub CLI configuration volume target',
      'mkdir -p "$GITHUB_CONFIG_DIR"',
      'chown -R "$_REMOTE_USER:$(id -gn "$_REMOTE_USER")" "$GITHUB_CONFIG_DIR"',
    ].join('\n'),
  },
  {
    name: 'personal-claude-code',
    featureJson: {
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
    },
    installScript: [
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
  },
  {
    name: 'personal-codex',
    featureJson: {
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
    },
    installScript: [
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
  },
];

export const defaultPreset = {
  getDevcontainerJson,
  getFeatures,
};
