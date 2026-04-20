import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useActiveSection } from "../hooks/useActiveSection";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function formatUptime(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = Math.floor(s % 60);
  return `${pad(h)}:${pad(m)}:${pad(sec)}`;
}

type Props = { onOpenPalette: () => void };

export default function StatusBar({ onOpenPalette }: Props) {
  const active = useActiveSection();
  const [uptime, setUptime] = useState(0);
  const [pct, setPct] = useState(0);
  const { scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setPct(Math.round(v * 100));
  });

  useEffect(() => {
    const start = Date.now();
    const id = window.setInterval(() => setUptime((Date.now() - start) / 1000), 500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink-200 bg-white/85 backdrop-blur-md supports-[backdrop-filter]:bg-white/70 dark:border-ink-800 dark:bg-ink-950/90 dark:supports-[backdrop-filter]:bg-ink-950/75">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-1.5 font-mono text-[10.5px] text-ink-500 sm:px-6">
        <div className="flex items-center gap-3 truncate">
          <span className="inline-flex items-center gap-1.5">
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-flow-green"
            />
            <span className="text-ink-700 dark:text-ink-300">task:</span>
            <span className="text-flow-indigo dark:text-flow-cyan">{active}</span>
          </span>
          <span className="hidden text-ink-300 dark:text-ink-700 sm:inline">│</span>
          <span className="hidden sm:inline">
            <span className="text-ink-700 dark:text-ink-300">state:</span>{" "}
            <span className="text-flow-green">RUNNING</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">uptime {formatUptime(uptime)}</span>
          <span className="hidden text-ink-300 dark:text-ink-700 sm:inline">│</span>
          <span className="tabular-nums">scroll {pct}%</span>
          <span className="text-ink-300 dark:text-ink-700">│</span>
          <button
            onClick={onOpenPalette}
            className="inline-flex items-center gap-1 rounded border border-ink-200 bg-ink-50 px-1.5 py-0.5 text-[10px] text-ink-600 transition hover:border-ink-400 hover:text-ink-900 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-300 dark:hover:border-ink-500 dark:hover:text-ink-50"
            aria-label="Open command palette"
          >
            <span>⌘</span>
            <span>K</span>
          </button>
        </div>
      </div>
    </div>
  );
}
