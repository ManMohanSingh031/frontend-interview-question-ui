"use client";

import { useState } from "react";
import { TreeData, TreeNode } from "@/lib/types/components";
import { DifficultyBadge } from "./difficulty-badge";

interface TreeViewerProps {
  data: TreeData;
  className?: string;
  expandAll?: boolean;
  onNodeClick?: (node: TreeNode) => void;
}

export function TreeViewer({
  data,
  className = "",
  expandAll = false,
  onNodeClick
}: TreeViewerProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    expandAll ? new Set([data.root.id]) : new Set()
  );

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const renderNode = (node: TreeNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);

    return (
      <div key={node.id} className={`${level > 0 ? 'ml-6' : ''}`}>
        <div
          className={`
            p-4 rounded-lg border transition-all duration-200 cursor-pointer
            ${node.type === 'root'
              ? 'bg-accent-500 border-accent-400 text-white'
              : node.type === 'branch'
              ? 'bg-dark-800 border-gray-700 hover:border-primary-500'
              : 'bg-dark-700 border-gray-600 hover:border-gray-500'
            }
            ${level > 0 ? 'mt-4' : ''}
          `}
          onClick={() => {
            if (hasChildren) toggleNode(node.id);
            onNodeClick?.(node);
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                {hasChildren && (
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      isExpanded ? 'rotate-90' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}

                <h4
                  className={`font-medium ${
                    node.type === 'root' ? 'text-white text-lg' : 'text-gray-200'
                  }`}
                >
                  {node.question}
                </h4>

                {node.metadata?.difficulty && (
                  <DifficultyBadge level={node.metadata.difficulty} size="sm" />
                )}
              </div>

              {node.intent && (
                <div className="mb-2">
                  <span className="text-xs font-medium text-blue-400">Intent:</span>
                  <span className="text-xs text-gray-300 ml-2">{node.intent}</span>
                </div>
              )}

              {node.expectedSignal && (
                <div className="mb-2">
                  <span className="text-xs font-medium text-green-400">Signal:</span>
                  <span className="text-xs text-gray-300 ml-2">{node.expectedSignal}</span>
                </div>
              )}

              {node.metadata && (
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  {node.metadata.timing && (
                    <span>⏱ {node.metadata.timing}</span>
                  )}
                  {node.metadata.followUpTrigger && (
                    <span className="text-yellow-400">
                      Trigger: {node.metadata.followUpTrigger}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="mt-2">
            {node.children?.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`bg-dark-900 border border-gray-800 rounded-xl p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">{data.title}</h3>
          {data.description && (
            <p className="text-gray-400 text-sm">{data.description}</p>
          )}
        </div>

        <button
          onClick={() => {
            if (expandedNodes.size > 0) {
              setExpandedNodes(new Set());
            } else {
              const allIds = new Set<string>();
              const collectIds = (node: TreeNode) => {
                allIds.add(node.id);
                node.children?.forEach(collectIds);
              };
              collectIds(data.root);
              setExpandedNodes(allIds);
            }
          }}
          className="px-3 py-1 text-xs bg-dark-800 border border-gray-700 rounded-lg text-gray-300 hover:text-white transition-colors"
        >
          {expandedNodes.size > 0 ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      <div className="space-y-2">
        {renderNode(data.root)}
      </div>
    </div>
  );
}