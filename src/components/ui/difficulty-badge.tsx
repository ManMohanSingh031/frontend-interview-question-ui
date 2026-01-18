"use client";

import { DifficultyLevel } from "@/lib/types/components";

interface DifficultyBadgeProps {
  level: DifficultyLevel;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showLabel?: boolean;
}

export function DifficultyBadge({
  level,
  className = "",
  size = 'md',
  showIcon = true,
  showLabel = true
}: DifficultyBadgeProps) {
  const getDifficultyConfig = (difficulty: DifficultyLevel) => {
    const configs = {
      beginner: {
        label: 'Beginner',
        color: 'bg-green-500 border-green-400 text-white',
        icon: '●',
        description: 'Entry level concepts'
      },
      intermediate: {
        label: 'Intermediate',
        color: 'bg-yellow-500 border-yellow-400 text-black',
        icon: '◐',
        description: 'Mid-level understanding required'
      },
      advanced: {
        label: 'Advanced',
        color: 'bg-orange-500 border-orange-400 text-white',
        icon: '◑',
        description: 'Senior level expertise needed'
      },
      expert: {
        label: 'Expert',
        color: 'bg-red-500 border-red-400 text-white',
        icon: '●',
        description: 'Deep specialist knowledge'
      },
      easy: {
        label: 'Easy',
        color: 'bg-green-500 border-green-400 text-white',
        icon: '●',
        description: 'Entry level concepts'
      },
      medium: {
        label: 'Medium',
        color: 'bg-yellow-500 border-yellow-400 text-black',
        icon: '◐',
        description: 'Mid-level understanding required'
      },
      hard: {
        label: 'Hard',
        color: 'bg-orange-500 border-orange-400 text-white',
        icon: '◑',
        description: 'Senior level expertise needed'
      }
    };

    return configs[difficulty] || configs.intermediate;
  };

  const getSizeClasses = (s: string) => {
    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-1.5 text-base'
    };
    return sizes[s as keyof typeof sizes];
  };

  const config = getDifficultyConfig(level);
  const sizeClasses = getSizeClasses(size);

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full border
        ${config.color}
        ${sizeClasses}
        ${className}
      `}
      title={config.description}
    >
      {showIcon && (
        <span className="mr-1.5" aria-hidden="true">
          {config.icon}
        </span>
      )}
      {showLabel && config.label}
    </span>
  );
}

// Utility component for difficulty scale visualization
interface DifficultyScaleProps {
  currentLevel: DifficultyLevel;
  levels?: DifficultyLevel[];
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onLevelClick?: (level: DifficultyLevel) => void;
}

export function DifficultyScale({
  currentLevel,
  levels = ['beginner', 'intermediate', 'advanced', 'expert'],
  className = "",
  size = 'sm',
  interactive = false,
  onLevelClick
}: DifficultyScaleProps) {
  const getCurrentIndex = () => {
    return levels.indexOf(currentLevel);
  };

  const currentIndex = getCurrentIndex();

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {levels.map((level, index) => {
        const isActive = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <button
            key={level}
            onClick={() => interactive && onLevelClick?.(level)}
            disabled={!interactive}
            className={`
              w-3 h-3 rounded-full border transition-all duration-200
              ${isActive
                ? getDifficultyConfig(level).color
                : 'bg-gray-700 border-gray-600'
              }
              ${isCurrent ? 'ring-2 ring-white ring-opacity-50' : ''}
              ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'}
              ${size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-4 h-4' : 'w-3 h-3'}
            `}
            title={getDifficultyConfig(level).label}
          />
        );
      })}
    </div>
  );
}

// Helper function - moved outside component to avoid recreation
function getDifficultyConfig(difficulty: DifficultyLevel) {
  const configs = {
    beginner: {
      label: 'Beginner',
      color: 'bg-green-500 border-green-400 text-white',
      icon: '●',
      description: 'Entry level concepts'
    },
    intermediate: {
      label: 'Intermediate',
      color: 'bg-yellow-500 border-yellow-400 text-black',
      icon: '◐',
      description: 'Mid-level understanding required'
    },
    advanced: {
      label: 'Advanced',
      color: 'bg-orange-500 border-orange-400 text-white',
      icon: '◑',
      description: 'Senior level expertise needed'
    },
    expert: {
      label: 'Expert',
      color: 'bg-red-500 border-red-400 text-white',
      icon: '●',
      description: 'Deep specialist knowledge'
    },
    easy: {
      label: 'Easy',
      color: 'bg-green-500 border-green-400 text-white',
      icon: '●',
      description: 'Basic concepts'
    },
    medium: {
      label: 'Medium',
      color: 'bg-yellow-500 border-yellow-400 text-black',
      icon: '◐',
      description: 'Moderate complexity'
    },
    hard: {
      label: 'Hard',
      color: 'bg-red-500 border-red-400 text-white',
      icon: '◑',
      description: 'High complexity'
    }
  };

  return configs[difficulty] || configs.intermediate;
}