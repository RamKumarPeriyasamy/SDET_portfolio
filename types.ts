import { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  category: 'SDET' | 'SecOps' | 'DevOps';
  problem: string;
  solution: string;
  impact: string;
  tools: string[];
  github?: string;
}

export interface SkillItem {
  name: string;
  level: number; // 1-100
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: string[];
  description: string;
}

export interface TimelineEvent {
  year: string;
  role: string;
  company?: string;
  description: string;
  icon: 'test' | 'code' | 'shield' | 'rocket' | 'workflow' | 'server' | 'monitor';
}
