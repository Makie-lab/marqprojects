"use client";

import { useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Handle,
  Position,
  NodeProps,
} from "reactflow";
import "reactflow/dist/style.css";
import { techNodes, techEdges, TechNodeData } from "@/data/techStack";

const categoryColors: Record<string, { bg: string; border: string }> = {
  frontend: { bg: "from-blue-500/20 to-blue-600/20", border: "border-blue-500/30" },
  backend: { bg: "from-green-500/20 to-green-600/20", border: "border-green-500/30" },
  devops: { bg: "from-orange-500/20 to-orange-600/20", border: "border-orange-500/30" },
  database: { bg: "from-purple-500/20 to-purple-600/20", border: "border-purple-500/30" },
  tools: { bg: "from-pink-500/20 to-pink-600/20", border: "border-pink-500/30" },
};

function TechNode({ data }: NodeProps<TechNodeData>) {
  const colors = categoryColors[data.category] || categoryColors.tools;

  return (
    <div
      className={`px-4 py-3 rounded-glass bg-gradient-to-br ${colors.bg} border ${colors.border} backdrop-blur-sm min-w-[120px] text-center group relative`}
    >
      <Handle type="target" position={Position.Top} className="!bg-white/30 !w-2 !h-2" />
      <span className="text-sm font-medium">{data.label}</span>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-black/80 text-white px-2 py-1 rounded whitespace-nowrap z-10">
        Proficiency: {data.proficiency}%
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-white/30 !w-2 !h-2" />
    </div>
  );
}

const nodeTypes = { techNode: TechNode };

export default function TechStackFlow() {
  const [nodes, , onNodesChange] = useNodesState(techNodes);
  const [edges, , onEdgesChange] = useEdgesState(techEdges);

  const onInit = useCallback(() => {
    // React Flow initialized
  }, []);

  return (
    <div className="w-full h-[600px] sm:h-[700px] lg:h-[900px] rounded-glass-lg overflow-hidden border border-black/10 dark:border-white/10">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onInit={onInit}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
      >
        <Controls className="!bg-white/10 !border-white/10 !rounded-glass" />
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} className="!bg-transparent" />
      </ReactFlow>
    </div>
  );
}
