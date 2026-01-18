"use client";

import { TopicCategory } from "@/lib/types/components";

interface TopicChipProps {
  label: string;
  category: TopicCategory;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'solid';
  onClick?: () => void;
  active?: boolean;
}

export function TopicChip({
  label,
  category,
  className = "",
  size = 'md',
  variant = 'default',
  onClick,
  active = false
}: TopicChipProps) {
  const getCategoryColor = (cat: TopicCategory) => {
    const colors = {
      'react': {
        bg: 'bg-blue-500',
        border: 'border-blue-400',
        text: 'text-blue-400',
        activeBg: 'bg-blue-500',
        activeText: 'text-white'
      },
      'javascript': {
        bg: 'bg-yellow-500',
        border: 'border-yellow-400',
        text: 'text-yellow-400',
        activeBg: 'bg-yellow-500',
        activeText: 'text-black'
      },
      'browser': {
        bg: 'bg-purple-500',
        border: 'border-purple-400',
        text: 'text-purple-400',
        activeBg: 'bg-purple-500',
        activeText: 'text-white'
      },
      'system-design': {
        bg: 'bg-green-500',
        border: 'border-green-400',
        text: 'text-green-400',
        activeBg: 'bg-green-500',
        activeText: 'text-white'
      },
      'performance': {
        bg: 'bg-red-500',
        border: 'border-red-400',
        text: 'text-red-400',
        activeBg: 'bg-red-500',
        activeText: 'text-white'
      },
      'testing': {
        bg: 'bg-cyan-500',
        border: 'border-cyan-400',
        text: 'text-cyan-400',
        activeBg: 'bg-cyan-500',
        activeText: 'text-white'
      }
    };
    return colors[cat];
  };

  const getSizeClasses = (s: string) => {
    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1.5 text-sm',
      lg: 'px-4 py-2 text-base'
    };
    return sizes[s as keyof typeof sizes];
  };

  const categoryColors = getCategoryColor(category);
  const sizeClasses = getSizeClasses(size);

  const getVariantClasses = () => {
    if (active) {
      return `${categoryColors.activeBg} ${categoryColors.activeText} border-transparent`;
    }

    switch (variant) {
      case 'outline':
        return `bg-transparent border ${categoryColors.border} ${categoryColors.text} hover:${categoryColors.bg} hover:text-white`;
      case 'solid':
        return `${categoryColors.bg} text-white border-transparent`;
      default:
        return `bg-dark-700 ${categoryColors.text} border border-gray-600 hover:border-gray-500 hover:bg-dark-600`;
    }
  };

  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center font-medium rounded-full transition-all duration-200
        ${sizeClasses}
        ${getVariantClasses()}
        ${onClick ? 'cursor-pointer' : 'cursor-default'}
        ${className}
      `}
      disabled={!onClick}
    >
      <span className={`w-2 h-2 rounded-full mr-2 ${
        active ? 'bg-current' : categoryColors.bg
      }`}></span>
      {label}
    </button>
  );
}

// Utility component for multiple topic chips
interface TopicChipGroupProps {
  topics: Array<{ label: string; category: TopicCategory }>;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'solid';
  onTopicClick?: (topic: { label: string; category: TopicCategory }) => void;
  activeTopic?: string;
  maxDisplay?: number;
}

export function TopicChipGroup({
  topics,
  className = "",
  size = 'md',
  variant = 'default',
  onTopicClick,
  activeTopic,
  maxDisplay
}: TopicChipGroupProps) {
  const displayTopics = maxDisplay ? topics.slice(0, maxDisplay) : topics;
  const remainingCount = maxDisplay && topics.length > maxDisplay
    ? topics.length - maxDisplay
    : 0;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {displayTopics.map(topic => (
        <TopicChip
          key={`${topic.category}-${topic.label}`}
          label={topic.label}
          category={topic.category}
          size={size}
          variant={variant}
          onClick={onTopicClick ? () => onTopicClick(topic) : undefined}
          active={activeTopic === topic.label}
        />
      ))}
      {remainingCount > 0 && (
        <span className={`
          inline-flex items-center font-medium rounded-full bg-dark-700 text-gray-400 border border-gray-600
          ${getSizeClasses(size)}
        `}>
          +{remainingCount} more
        </span>
      )}
    </div>
  );
}

function getSizeClasses(size: string) {
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };
  return sizes[size as keyof typeof sizes];
}