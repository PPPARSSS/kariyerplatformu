import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Code,
  Database,
  Palette,
  Shield,
  Brain,
  Lock,
  CheckCircle2,
  Zap,
  Monitor,
  Server,
  PenTool,
  ShieldCheck,
  MessageSquare,
  Users,
  GitBranch,
  Layers,
  Box,
  FileCode,
  TestTube,
  Figma,
  Lightbulb,
  Heart,
} from "lucide-react";

interface TreeNode {
  id: string;
  name: string;
  icon: React.ElementType;
  status: "completed" | "in-progress" | "locked";
  x: number;
  y: number;
  progress?: string;
}

interface TreeBranch {
  id: string;
  name: string;
  color: string;
  glowColor: string;
  score: number;
  nodes: TreeNode[];
  connections: [string, string][];
}

const branches: TreeBranch[] = [
  {
    id: "frontend",
    name: "FRONTEND",
    color: "hsl(140, 70%, 40%)",
    glowColor: "hsl(140, 70%, 50%)",
    score: 18,
    nodes: [
      { id: "f-root", name: "HTML & CSS", icon: Code, status: "completed", x: 220, y: 580 },
      { id: "f-1", name: "Responsive", icon: Monitor, status: "completed", x: 180, y: 490 },
      { id: "f-2", name: "JavaScript", icon: FileCode, status: "completed", x: 240, y: 410 },
      { id: "f-3", name: "Tailwind CSS", icon: Layers, status: "completed", x: 140, y: 380 },
      { id: "f-4", name: "SASS", icon: PenTool, status: "completed", x: 300, y: 350 },
      { id: "f-5", name: "ES6+", icon: Zap, status: "completed", x: 200, y: 300 },
      { id: "f-6", name: "React", icon: Box, status: "completed", x: 260, y: 220 },
      { id: "f-7", name: "TypeScript", icon: FileCode, status: "completed", x: 160, y: 210 },
      { id: "f-8", name: "Hooks", icon: GitBranch, status: "completed", x: 300, y: 140 },
      { id: "f-9", name: "Patterns", icon: Layers, status: "in-progress", x: 200, y: 120 },
      { id: "f-10", name: "Testing", icon: TestTube, status: "in-progress", x: 120, y: 140, progress: "0/5" },
      { id: "f-11", name: "Next.js", icon: Monitor, status: "locked", x: 80, y: 80 },
      { id: "f-12", name: "Animations", icon: Zap, status: "locked", x: 340, y: 80 },
    ],
    connections: [
      ["f-root", "f-1"], ["f-root", "f-2"], ["f-1", "f-3"], ["f-1", "f-4"],
      ["f-2", "f-5"], ["f-5", "f-6"], ["f-5", "f-7"], ["f-6", "f-8"],
      ["f-6", "f-9"], ["f-7", "f-10"], ["f-10", "f-11"], ["f-8", "f-12"],
    ],
  },
  {
    id: "backend",
    name: "BACKEND",
    color: "hsl(42, 97%, 54%)",
    glowColor: "hsl(42, 97%, 60%)",
    score: 24,
    nodes: [
      { id: "b-root", name: "Node.js", icon: Server, status: "completed", x: 500, y: 580 },
      { id: "b-1", name: "Express", icon: Server, status: "completed", x: 480, y: 470 },
      { id: "b-2", name: "Databases", icon: Database, status: "completed", x: 520, y: 380 },
      { id: "b-3", name: "SQL", icon: Database, status: "completed", x: 460, y: 290 },
      { id: "b-4", name: "MongoDB", icon: Database, status: "in-progress", x: 540, y: 290, progress: "2/5" },
      { id: "b-5", name: "NestJS", icon: Box, status: "locked", x: 440, y: 200 },
      { id: "b-6", name: "GraphQL", icon: GitBranch, status: "locked", x: 560, y: 200 },
      { id: "b-7", name: "APIs", icon: Zap, status: "locked", x: 500, y: 130 },
      { id: "b-8", name: "Docker", icon: Box, status: "locked", x: 440, y: 80 },
      { id: "b-9", name: "CI/CD", icon: GitBranch, status: "locked", x: 560, y: 80, progress: "0/5" },
    ],
    connections: [
      ["b-root", "b-1"], ["b-1", "b-2"], ["b-2", "b-3"], ["b-2", "b-4"],
      ["b-3", "b-5"], ["b-4", "b-6"], ["b-5", "b-7"], ["b-6", "b-7"],
      ["b-7", "b-8"], ["b-7", "b-9"],
    ],
  },
  {
    id: "skills",
    name: "SOFT SKILLS",
    color: "hsl(354, 72%, 43%)",
    glowColor: "hsl(354, 72%, 55%)",
    score: 37,
    nodes: [
      { id: "s-root", name: "Liderlik", icon: Users, status: "completed", x: 780, y: 580 },
      { id: "s-1", name: "İletişim", icon: MessageSquare, status: "completed", x: 740, y: 480 },
      { id: "s-2", name: "Takım", icon: Users, status: "completed", x: 820, y: 460 },
      { id: "s-3", name: "Problem Çözme", icon: Lightbulb, status: "completed", x: 700, y: 380 },
      { id: "s-4", name: "Empati", icon: Heart, status: "completed", x: 800, y: 360 },
      { id: "s-5", name: "Sunum", icon: Monitor, status: "in-progress", x: 860, y: 310, progress: "1/5" },
      { id: "s-6", name: "Mentorluk", icon: Users, status: "in-progress", x: 740, y: 270 },
      { id: "s-7", name: "Çatışma Yön.", icon: Shield, status: "locked", x: 820, y: 210 },
      { id: "s-8", name: "Delegasyon", icon: GitBranch, status: "locked", x: 700, y: 180, progress: "0/5" },
      { id: "s-9", name: "Koçluk", icon: Lightbulb, status: "locked", x: 880, y: 170 },
      { id: "s-10", name: "Stratejik Düşünme", icon: Brain, status: "locked", x: 780, y: 100 },
      { id: "s-11", name: "Vizyon", icon: Zap, status: "locked", x: 860, y: 60 },
    ],
    connections: [
      ["s-root", "s-1"], ["s-root", "s-2"], ["s-1", "s-3"], ["s-2", "s-4"],
      ["s-2", "s-5"], ["s-3", "s-6"], ["s-4", "s-6"], ["s-5", "s-7"],
      ["s-6", "s-8"], ["s-6", "s-7"], ["s-7", "s-9"], ["s-7", "s-10"],
      ["s-10", "s-11"],
    ],
  },
];

function getNodePosition(branch: TreeBranch, nodeId: string) {
  const node = branch.nodes.find((n) => n.id === nodeId);
  return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
}

function ConnectionLine({
  branch,
  from,
  to,
}: {
  branch: TreeBranch;
  from: string;
  to: string;
}) {
  const fromPos = getNodePosition(branch, from);
  const toPos = getNodePosition(branch, to);
  const fromNode = branch.nodes.find((n) => n.id === from);
  const toNode = branch.nodes.find((n) => n.id === to);

  const isActive =
    fromNode?.status === "completed" || fromNode?.status === "in-progress";
  const isFullyActive =
    fromNode?.status === "completed" &&
    (toNode?.status === "completed" || toNode?.status === "in-progress");

  const midY = (fromPos.y + toPos.y) / 2;

  const path = `M ${fromPos.x} ${fromPos.y} C ${fromPos.x} ${midY}, ${toPos.x} ${midY}, ${toPos.x} ${toPos.y}`;

  return (
    <>
      {isFullyActive && (
        <path
          d={path}
          fill="none"
          stroke={branch.glowColor}
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.3"
          filter="url(#glow)"
        />
      )}
      <path
        d={path}
        fill="none"
        stroke={isFullyActive ? branch.color : "hsl(0, 0%, 30%)"}
        strokeWidth={isFullyActive ? 4 : 2}
        strokeLinecap="round"
        opacity={isActive ? 1 : 0.3}
      />
    </>
  );
}

function SkillNode({
  node,
  color,
  glowColor,
  onHover,
  isHovered,
}: {
  node: TreeNode;
  color: string;
  glowColor: string;
  onHover: (id: string | null) => void;
  isHovered: boolean;
}) {
  const Icon = node.icon;
  const size = node.id.endsWith("-root") ? 36 : 28;
  const isActive = node.status === "completed" || node.status === "in-progress";

  return (
    <g
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      className="cursor-pointer"
    >
      {/* Glow effect for active nodes */}
      {isActive && (
        <circle
          cx={node.x}
          cy={node.y}
          r={size + 6}
          fill="none"
          stroke={glowColor}
          strokeWidth="2"
          opacity={isHovered ? 0.8 : 0.3}
          filter="url(#glow)"
        >
          <animate
            attributeName="opacity"
            values={isHovered ? "0.8;0.4;0.8" : "0.3;0.15;0.3"}
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* Node background */}
      <circle
        cx={node.x}
        cy={node.y}
        r={size}
        fill={
          node.status === "completed"
            ? color
            : node.status === "in-progress"
            ? color
            : "hsl(0, 0%, 20%)"
        }
        opacity={node.status === "locked" ? 0.5 : 1}
        stroke={isHovered && isActive ? glowColor : "transparent"}
        strokeWidth="3"
      />

      {/* Icon */}
      <foreignObject
        x={node.x - size * 0.55}
        y={node.y - size * 0.55}
        width={size * 1.1}
        height={size * 1.1}
      >
        <div className="flex h-full w-full items-center justify-center">
          {node.status === "locked" ? (
            <Lock
              size={size * 0.5}
              className="text-white/40"
            />
          ) : (
            <Icon
              size={size * 0.55}
              className="text-white"
            />
          )}
        </div>
      </foreignObject>

      {/* Progress badge */}
      {node.progress && (
        <g>
          <rect
            x={node.x + size * 0.5}
            y={node.y - size - 4}
            width={30}
            height={18}
            rx={9}
            fill={isActive ? color : "hsl(0, 0%, 25%)"}
            stroke={isActive ? glowColor : "hsl(0, 0%, 35%)"}
            strokeWidth="1"
          />
          <text
            x={node.x + size * 0.5 + 15}
            y={node.y - size + 5}
            textAnchor="middle"
            fill="white"
            fontSize="10"
            fontWeight="bold"
          >
            {node.progress}
          </text>
        </g>
      )}

      {/* Tooltip on hover */}
      {isHovered && (
        <g>
          <rect
            x={node.x - 55}
            y={node.y + size + 6}
            width={110}
            height={28}
            rx={6}
            fill="hsl(0, 0%, 15%)"
            stroke={isActive ? color : "hsl(0, 0%, 30%)"}
            strokeWidth="1"
          />
          <text
            x={node.x}
            y={node.y + size + 24}
            textAnchor="middle"
            fill="white"
            fontSize="11"
            fontWeight="500"
          >
            {node.name}
          </text>
        </g>
      )}
    </g>
  );
}

export function VisualSkillTree() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="relative w-full overflow-x-auto rounded-2xl bg-gradient-to-b from-[hsl(0,0%,8%)] via-[hsl(0,0%,6%)] to-[hsl(0,0%,4%)] p-4">
      {/* Starfield background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
      </div>

      <svg
        viewBox="0 0 960 660"
        className="relative w-full"
        style={{ minWidth: 700 }}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connections */}
        {branches.map((branch) =>
          branch.connections.map(([from, to]) => (
            <ConnectionLine
              key={`${from}-${to}`}
              branch={branch}
              from={from}
              to={to}
            />
          ))
        )}

        {/* Nodes */}
        {branches.map((branch) =>
          branch.nodes.map((node) => (
            <SkillNode
              key={node.id}
              node={node}
              color={branch.color}
              glowColor={branch.glowColor}
              onHover={setHoveredNode}
              isHovered={hoveredNode === node.id}
            />
          ))
        )}

        {/* Branch Labels */}
        {branches.map((branch) => {
          const rootNode = branch.nodes[0];
          return (
            <g key={`label-${branch.id}`}>
              <text
                x={rootNode.x}
                y={rootNode.y + 56}
                textAnchor="middle"
                fill={branch.color}
                fontSize="14"
                fontWeight="800"
                letterSpacing="3"
              >
                {branch.name}
              </text>
              <text
                x={rootNode.x}
                y={rootNode.y + 76}
                textAnchor="middle"
                fill={branch.color}
                fontSize="24"
                fontWeight="900"
              >
                {branch.score}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[hsl(140,70%,40%)]" />
          <span className="text-white/70">Tamamlandı</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[hsl(42,97%,54%)] animate-pulse" />
          <span className="text-white/70">Devam Ediyor</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[hsl(0,0%,20%)] border border-white/20" />
          <span className="text-white/70">Kilitli</span>
        </div>
      </div>
    </div>
  );
}
