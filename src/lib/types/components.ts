export interface MindmapNode {
  id: string;
  title: string;
  description?: string;
  type: 'central' | 'branch' | 'leaf';
  position: {
    x: number;
    y: number;
  };
  connections: string[];
  color?: string;
}

export interface MindmapData {
  title: string;
  nodes: MindmapNode[];
}

export interface TreeNode {
  id: string;
  question: string;
  intent?: string;
  expectedSignal?: string;
  type: 'root' | 'branch' | 'leaf';
  children?: TreeNode[];
  metadata?: {
    difficulty?: 'easy' | 'medium' | 'hard';
    timing?: string;
    followUpTrigger?: string;
  };
}

export interface TreeData {
  title: string;
  description?: string;
  root: TreeNode;
}

export interface DemoConfig {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  component: React.ComponentType;
}

export interface CompanyPlaybook {
  id: string;
  company: string;
  logo?: string;
  overview: {
    stack: string[];
    culture: string[];
    focus: string;
  };
  roles: {
    level: string;
    title: string;
    experience: string;
    focus: string[];
  }[];
  rounds: {
    name: string;
    duration: string;
    format: string;
    description: string;
  }[];
  topics: {
    category: string;
    items: string[];
  }[];
  lastUpdated: string;
}

export type TopicCategory = 'react' | 'javascript' | 'browser' | 'system-design' | 'performance' | 'testing';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert' | 'easy' | 'medium' | 'hard';