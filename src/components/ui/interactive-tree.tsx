"use client";

import { TreeViewer } from "./tree-viewer";
import { TreeData, TreeNode } from "@/lib/types/components";

interface InteractiveTreeProps {
  data: TreeData;
  expandAll?: boolean;
  className?: string;
}

export function InteractiveTree({ data, expandAll = false, className }: InteractiveTreeProps) {
  const handleNodeClick = (node: TreeNode) => {
    console.log("Node clicked:", node);
  };

  return (
    <TreeViewer
      data={data}
      expandAll={expandAll}
      onNodeClick={handleNodeClick}
      className={className}
    />
  );
}