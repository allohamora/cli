import path from 'node:path';
import { ensureRootDir, writeRootFile, writeRootSymlink } from '#src/services/root.service.ts';

export const AGENTS_DIR_NAME = '.agents';
export const AGENTS_SKILLS_DIR_NAME = 'skills';
export const AGENTS_SKILLS_PATH = path.join(AGENTS_DIR_NAME, AGENTS_SKILLS_DIR_NAME);

export const CLAUDE_DIR_NAME = '.claude';
export const CLAUDE_SKILLS_DIR_NAME = 'skills';
export const CLAUDE_SKILLS_PATH = path.join(CLAUDE_DIR_NAME, CLAUDE_SKILLS_DIR_NAME);

export const SKILL_FILE_NAME = 'SKILL.md';

const getAgentsSkillPath = (name: string) => path.join(AGENTS_SKILLS_PATH, name);

export const writeAgentsSkill = async (name: string, content: string) => {
  await ensureRootDir(AGENTS_DIR_NAME);
  await ensureRootDir(AGENTS_SKILLS_PATH);

  const skillPath = getAgentsSkillPath(name);
  await ensureRootDir(skillPath);
  await writeRootFile(path.join(skillPath, SKILL_FILE_NAME), content);
};

export const writeClaudeSkillSymlink = async (name: string) => {
  await ensureRootDir(CLAUDE_DIR_NAME);
  await ensureRootDir(CLAUDE_SKILLS_PATH);

  const claudeSkillPath = path.join(CLAUDE_SKILLS_PATH, name);
  const target = path.relative(CLAUDE_SKILLS_PATH, getAgentsSkillPath(name));
  await writeRootSymlink(claudeSkillPath, target, 'dir');
};

export const writeSkill = async (name: string, content: string) => {
  await writeAgentsSkill(name, content);
  await writeClaudeSkillSymlink(name);
};
