"use client";

import { CompanyPlaybook } from "@/lib/types/components";
import { TopicChip } from "./topic-chip";

interface CompanyPlaybookCardProps {
  playbook: CompanyPlaybook;
  className?: string;
  variant?: 'default' | 'compact' | 'detailed';
  onSelect?: (playbook: CompanyPlaybook) => void;
}

export function CompanyPlaybookCard({
  playbook,
  className = "",
  variant = 'default',
  onSelect
}: CompanyPlaybookCardProps) {
  if (variant === 'compact') {
    return (
      <div
        className={`bg-dark-800 border border-gray-700 rounded-xl p-4 hover:border-primary-500 transition-all duration-300 cursor-pointer group ${className}`}
        onClick={() => onSelect?.(playbook)}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {playbook.logo ? (
              <img
                src={playbook.logo}
                alt={`${playbook.company} logo`}
                className="w-8 h-8 rounded-lg"
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-400 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {playbook.company.charAt(0)}
                </span>
              </div>
            )}
            <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors">
              {playbook.company}
            </h3>
          </div>
          <span className="text-xs text-gray-500">
            {playbook.roles.length} role{playbook.roles.length !== 1 ? 's' : ''}
          </span>
        </div>

        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {playbook.overview.focus}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {playbook.overview.stack.slice(0, 3).map(tech => (
              <span
                key={tech}
                className="text-xs bg-dark-700 text-gray-300 px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
            {playbook.overview.stack.length > 3 && (
              <span className="text-xs text-gray-500">
                +{playbook.overview.stack.length - 3}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500">
            Updated {new Date(playbook.lastUpdated).toLocaleDateString()}
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`bg-dark-900 border border-gray-800 rounded-xl p-6 ${className}`}>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            {playbook.logo ? (
              <img
                src={playbook.logo}
                alt={`${playbook.company} logo`}
                className="w-12 h-12 rounded-lg"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-400 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">
                  {playbook.company.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <h2 className="text-xl font-bold text-white mb-1">{playbook.company}</h2>
              <p className="text-gray-400 text-sm">{playbook.overview.focus}</p>
            </div>
          </div>
          <span className="text-xs text-gray-500 bg-dark-800 px-2 py-1 rounded">
            Updated {new Date(playbook.lastUpdated).toLocaleDateString()}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-gray-200 mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {playbook.overview.stack.map(tech => (
                <TopicChip
                  key={tech}
                  label={tech}
                  category="react"
                  size="sm"
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-200 mb-3">Culture</h3>
            <ul className="space-y-1">
              {playbook.overview.culture.slice(0, 4).map(trait => (
                <li key={trait} className="text-gray-400 text-sm flex items-center">
                  <span className="w-1.5 h-1.5 bg-accent-400 rounded-full mr-2"></span>
                  {trait}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-200 mb-3">
              Interview Rounds ({playbook.rounds.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {playbook.rounds.map(round => (
                <div key={round.name} className="bg-dark-800 border border-gray-700 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-200 text-sm">{round.name}</span>
                    <span className="text-xs text-gray-500">{round.duration}</span>
                  </div>
                  <p className="text-xs text-gray-400">{round.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-200 mb-3">Role Levels</h3>
            <div className="space-y-2">
              {playbook.roles.map(role => (
                <div key={role.level} className="flex items-center justify-between p-3 bg-dark-800 border border-gray-700 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-200">{role.title}</span>
                    <span className="text-gray-500 text-sm ml-2">({role.level})</span>
                  </div>
                  <span className="text-xs text-gray-500">{role.experience}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {onSelect && (
          <div className="mt-6 pt-6 border-t border-gray-800">
            <button
              onClick={() => onSelect(playbook)}
              className="w-full py-3 bg-gradient-to-r from-primary-600 to-accent-500 hover:from-primary-700 hover:to-accent-600 text-white font-medium rounded-lg transition-all duration-300"
            >
              View Full Playbook
            </button>
          </div>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={`bg-dark-800 border border-gray-700 rounded-xl p-6 hover:border-primary-500 transition-all duration-300 group cursor-pointer ${className}`}
      onClick={() => onSelect?.(playbook)}
    >
      <div className="flex items-start gap-4 mb-4">
        {playbook.logo ? (
          <img
            src={playbook.logo}
            alt={`${playbook.company} logo`}
            className="w-10 h-10 rounded-lg"
          />
        ) : (
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">
              {playbook.company.charAt(0)}
            </span>
          </div>
        )}

        <div className="flex-1">
          <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors mb-2">
            {playbook.company}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
            {playbook.overview.focus}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <span className="text-xs font-medium text-gray-400 mb-2 block">Tech Stack</span>
          <div className="flex flex-wrap gap-1">
            {playbook.overview.stack.slice(0, 4).map(tech => (
              <span
                key={tech}
                className="text-xs bg-dark-700 text-gray-300 px-2 py-1 rounded"
              >
                {tech}
              </span>
            ))}
            {playbook.overview.stack.length > 4 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{playbook.overview.stack.length - 4} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-700">
          <span className="text-xs text-gray-500">
            {playbook.roles.length} role levels • {playbook.rounds.length} rounds
          </span>
          <span className="text-xs text-gray-500">
            Updated {new Date(playbook.lastUpdated).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}