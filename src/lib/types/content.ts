// Mindmap content structure
export interface MindmapContent {
  id: string;
  title: string;
  summary: string;
  nodes: MindmapNode[];
  traps: InterviewTrap[];
  followups: FollowupQuestion[];
  usecases: UseCase[];
  code: string;
  topic: TopicCategory;
}

export interface MindmapNode {
  id: string;
  title: string;
  description: string;
  type: 'central' | 'branch' | 'leaf';
  position: { x: number; y: number };
  connections: string[];
  color?: string;
}

export interface InterviewTrap {
  misconception: string;
  correction: string;
  explanation?: string;
}

export interface FollowupQuestion {
  question: string;
  intent: string;
  signal: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface UseCase {
  title: string;
  description: string;
  example?: string;
  complexity: 'low' | 'medium' | 'high';
}

// Question tree content structure
export interface TreeContent {
  id: string;
  title: string;
  summary?: string;
  root: string;
  branches: TreeBranch[];
  topic: TopicCategory;
}

export interface TreeBranch {
  id: string;
  q: string;
  intent: string;
  signal: string;
  parent?: string;
  children?: string[];
  metadata?: {
    difficulty?: 'easy' | 'medium' | 'hard';
    timing?: string;
    trigger?: string;
    depth?: number;
  };
}

// Company playbook content structure
export interface PlaybookContent {
  id: string;
  company: string;
  logo?: string;
  summary: string;
  levels: RoleLevel[];
  rounds: InterviewRound[];
  patterns: TopicPattern[];
  prep: PrepSection[];
  lastUpdated: string;
}

export interface RoleLevel {
  id: string;
  title: string;
  level: string;
  experience: string;
  salary?: string;
  focus: string[];
  expectations: string[];
}

export interface InterviewRound {
  name: string;
  duration: string;
  format: 'coding' | 'system-design' | 'behavioral' | 'technical-discussion';
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  preparation: string[];
}

export interface TopicPattern {
  category: TopicCategory;
  frequency: 'low' | 'medium' | 'high';
  questions: string[];
  examples: string[];
  signals: string[];
}

export interface PrepSection {
  phase: 'week-before' | 'day-before' | 'day-of';
  title: string;
  tasks: PrepTask[];
}

export interface PrepTask {
  task: string;
  priority: 'low' | 'medium' | 'high';
  timeRequired: string;
  resources?: string[];
}

// Demo content structure
export interface DemoContent {
  id: string;
  title: string;
  description: string;
  category: TopicCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  concept: string;
  implementation: string;
  explanation: string;
  variations?: DemoVariation[];
  relatedTopics: string[];
}

export interface DemoVariation {
  name: string;
  description: string;
  code: string;
  complexity: 'lower' | 'similar' | 'higher';
}

// Shared types
export type TopicCategory =
  | 'react'
  | 'javascript'
  | 'browser'
  | 'system-design'
  | 'performance'
  | 'testing'
  | 'css'
  | 'typescript'
  | 'node'
  | 'security';

export type ContentType = 'mindmap' | 'tree' | 'demo' | 'playbook';

// Content metadata
export interface ContentMetadata {
  id: string;
  type: ContentType;
  title: string;
  topic: TopicCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedTime: string;
  prerequisites?: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
  author?: string;
}