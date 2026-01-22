"use client";

import { MindmapData } from "@/lib/types/components";

interface MindmapViewerProps {
  data: MindmapData;
  className?: string;
  interactive?: boolean;
  onNodeClick?: (nodeId: string) => void;
}

export function MindmapViewer({
  data,
  className = "",
  interactive = false,
  onNodeClick
}: MindmapViewerProps) {
  const centralNode = data.nodes.find(node => node.type === 'central');
  const branchNodes = data.nodes.filter(node => node.type === 'branch');
  const leafNodes = data.nodes.filter(node => node.type === 'leaf');

  const getNodeColor = (node: any) => {
    if (node.color) return node.color;
    switch (node.type) {
      case 'central': return 'bg-accent-500';
      case 'branch': return 'bg-primary-500';
      case 'leaf': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  const renderConnections = () => {
    return data.nodes.map(node =>
      (node.connections || []).map(targetId => {
        const target = data.nodes.find(n => n.id === targetId);
        if (!target) return null;

        const x1 = node.position.x;
        const y1 = node.position.y;
        const x2 = target.position.x;
        const y2 = target.position.y;

        return (
          <line
            key={`${node.id}-${targetId}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#374151"
            strokeWidth="2"
            className="transition-colors hover:stroke-accent-400"
          />
        );
      })
    ).flat();
  };

  return (
    <div className={`bg-dark-900 border border-gray-800 rounded-xl p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-white mb-6">{data.title}</h3>

      <div className="relative overflow-hidden">
        <svg
          viewBox="0 0 800 600"
          className="w-full h-96"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Connections */}
          <g className="connections">
            {renderConnections()}
          </g>

          {/* Nodes */}
          <g className="nodes">
            {data.nodes.map(node => (
              <g key={node.id}>
                {/* Node Circle */}
                <circle
                  cx={node.position.x}
                  cy={node.position.y}
                  r={node.type === 'central' ? 30 : node.type === 'branch' ? 20 : 15}
                  className={`${getNodeColor(node)} ${
                    interactive ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
                  }`}
                  onClick={() => interactive && onNodeClick?.(node.id)}
                />

                {/* Node Label */}
                <text
                  x={node.position.x}
                  y={node.position.y + 45}
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-200 max-w-20"
                  onClick={() => interactive && onNodeClick?.(node.id)}
                >
                  {node.title}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>

      {/* Node Details */}
      {centralNode && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          {data.nodes.filter(node => node.description).map(node => (
            <div
              key={node.id}
              className="bg-dark-800 border border-gray-700 rounded-lg p-3"
            >
              <h4 className="font-semibold text-gray-200 mb-2">{node.title}</h4>
              <p className="text-gray-400 text-xs leading-relaxed">{node.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}