"use client";

import { MindmapViewer } from "./mindmap-viewer";
import { MindmapData } from "@/lib/types/components";

interface InteractiveMindmapProps {
  data: MindmapData;
  className?: string;
}

export function InteractiveMindmap({ data, className }: InteractiveMindmapProps) {
  const handleNodeClick = (nodeId: string) => {
    console.log(`Clicked node: ${nodeId}`);
  };

  return (
    <MindmapViewer
      data={data}
      interactive={true}
      onNodeClick={handleNodeClick}
      className={className}
    />
  );
}