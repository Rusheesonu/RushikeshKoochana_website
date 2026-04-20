import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Node = {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  accent: string;
};

const nodes: Node[] = [
  { id: "src", label: "sources", sub: "500+ sites", x: 40, y: 60, accent: "#22d3ee" },
  { id: "scrape", label: "playwright_extract", sub: "stealth · proxy", x: 180, y: 40, accent: "#818cf8" },
  { id: "queue", label: "kafka.enqueue", sub: "buffer", x: 180, y: 150, accent: "#a78bfa" },
  { id: "transform", label: "airflow.transform", sub: "10TB / mo", x: 330, y: 100, accent: "#2dd4bf" },
  { id: "llm", label: "gpt4.resolve", sub: "97% accuracy", x: 480, y: 40, accent: "#fbbf24" },
  { id: "store", label: "mongo.upsert", sub: "indexed", x: 480, y: 150, accent: "#4ade80" },
  { id: "api", label: "rest.serve", sub: "<200ms p95", x: 620, y: 100, accent: "#fb7185" },
];

type Edge = { from: string; to: string };
const edges: Edge[] = [
  { from: "src", to: "scrape" },
  { from: "src", to: "queue" },
  { from: "scrape", to: "transform" },
  { from: "queue", to: "transform" },
  { from: "transform", to: "llm" },
  { from: "transform", to: "store" },
  { from: "llm", to: "api" },
  { from: "store", to: "api" },
];

const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

function edgePath(from: Node, to: Node) {
  const x1 = from.x + 110;
  const y1 = from.y + 22;
  const x2 = to.x;
  const y2 = to.y + 22;
  const mx = (x1 + x2) / 2;
  return `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
}

function useHeartbeat() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((s) => {
        if (s >= 5) return 0;
        return s + 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, []);
  return seconds;
}

export default function MiniDag() {
  const heartbeat = useHeartbeat();
  return (
    <div className="relative aspect-[4/3] w-full">
      <div className="absolute inset-0 rounded-2xl border border-ink-200 bg-white/60 backdrop-blur-sm dark:border-ink-800 dark:bg-ink-900/40">
        <div className="flex items-center justify-between border-b border-ink-200 px-4 py-2.5 dark:border-ink-800">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-flow-rose/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-flow-amber/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-flow-green/80" />
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-ink-500">
            dag: career.main · <span className="text-flow-green">running</span>
          </div>
          <div className="font-mono text-[10px] text-ink-500 tabular-nums">
            heartbeat {heartbeat}s ago
          </div>
        </div>

        <svg
          viewBox="0 0 760 220"
          className="h-[calc(100%-40px)] w-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.35" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {edges.map((e, i) => {
            const from = nodeMap[e.from];
            const to = nodeMap[e.to];
            const d = edgePath(from, to);
            return (
              <g key={`${e.from}-${e.to}`}>
                <path d={d} fill="none" stroke="url(#edgeGrad)" strokeWidth="1.4" />
                <motion.circle
                  r="2.6"
                  fill={to.accent}
                  filter="url(#glow)"
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.3,
                  }}
                  style={{
                    offsetPath: `path("${d}")`,
                  }}
                />
              </g>
            );
          })}

          {nodes.map((n, i) => (
            <motion.g
              key={n.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
            >
              <rect
                x={n.x}
                y={n.y}
                width={110}
                height={44}
                rx={7}
                className="fill-white dark:fill-ink-900"
                stroke={n.accent}
                strokeOpacity="0.6"
                strokeWidth="1"
              />
              <rect
                x={n.x}
                y={n.y}
                width={3.5}
                height={44}
                rx={1.75}
                fill={n.accent}
              />
              <text
                x={n.x + 10}
                y={n.y + 18}
                className="fill-ink-900 dark:fill-ink-50"
                style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9, fontWeight: 600 }}
              >
                {n.label}
              </text>
              <text
                x={n.x + 10}
                y={n.y + 33}
                className="fill-ink-500"
                style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 8 }}
              >
                {n.sub}
              </text>
            </motion.g>
          ))}
        </svg>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-ink-200 px-4 py-2 font-mono text-[10px] text-ink-500 dark:border-ink-800">
          <span>
            <span className="text-flow-green">●</span> 7 tasks · 0 failed
          </span>
          <span>next_run: scheduled</span>
          <span>p95: 187ms</span>
        </div>
      </div>
    </div>
  );
}
