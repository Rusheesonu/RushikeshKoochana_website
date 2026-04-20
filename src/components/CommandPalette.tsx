import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Github,
  Home,
  Layers,
  Linkedin,
  Mail,
  Moon,
  Sparkles,
  Sun,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { profile } from "../data/resume";
import { useTheme } from "../hooks/useTheme";

type Props = { open: boolean; onClose: () => void };

type Cmd = {
  id: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
  run: () => void;
};

export default function CommandPalette({ open, onClose }: Props) {
  const { theme, toggle } = useTheme();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const goTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    onClose();
  };

  const commands: Cmd[] = useMemo(
    () => [
      { id: "goto-top", label: "go to hero", hint: "#top", icon: Home, run: () => goTo("top") },
      { id: "goto-pipeline", label: "go to pipeline", hint: "#pipeline", icon: Layers, run: () => goTo("pipeline") },
      { id: "goto-about", label: "go to about", hint: "#about", icon: ArrowRight, run: () => goTo("about") },
      { id: "goto-skills", label: "go to skills", hint: "#skills", icon: ArrowRight, run: () => goTo("skills") },
      { id: "goto-experience", label: "go to experience", hint: "#experience", icon: ArrowRight, run: () => goTo("experience") },
      { id: "goto-projects", label: "go to projects", hint: "#projects", icon: ArrowRight, run: () => goTo("projects") },
      { id: "goto-contact", label: "go to contact", hint: "#contact", icon: ArrowRight, run: () => goTo("contact") },
      {
        id: "theme",
        label: theme === "dark" ? "switch to light mode" : "switch to dark mode",
        icon: theme === "dark" ? Sun : Moon,
        run: () => {
          toggle();
          onClose();
        },
      },
      {
        id: "email",
        label: "send me an email",
        hint: profile.email,
        icon: Mail,
        run: () => {
          window.location.href = `mailto:${profile.email}`;
          onClose();
        },
      },
      {
        id: "github",
        label: "open github",
        icon: Github,
        run: () => {
          window.open(profile.github, "_blank");
          onClose();
        },
      },
      {
        id: "linkedin",
        label: "open linkedin",
        icon: Linkedin,
        run: () => {
          window.open(profile.linkedin, "_blank");
          onClose();
        },
      },
      {
        id: "sparkle",
        label: "say hi in a dm",
        hint: "i like interesting problems",
        icon: Sparkles,
        run: () => {
          window.location.href = `mailto:${profile.email}?subject=hello`;
          onClose();
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || (c.hint ?? "").toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    setCursor(0);
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => Math.min(c + 1, Math.max(filtered.length - 1, 0)));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => Math.max(c - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[cursor]?.run();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, cursor, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[16vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl overflow-hidden rounded-xl border border-ink-200 bg-white/95 shadow-2xl backdrop-blur-md dark:border-ink-800 dark:bg-ink-900/95"
          >
            <div className="flex items-center gap-2.5 border-b border-ink-200 px-3.5 py-3 dark:border-ink-800">
              <Terminal size={14} className="text-flow-cyan" />
              <span className="font-mono text-[11px] text-ink-400">&gt;&gt;</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="type a command or search…"
                className="flex-1 bg-transparent font-mono text-sm text-ink-900 outline-none placeholder:text-ink-400 dark:text-ink-50"
              />
              <kbd className="rounded border border-ink-200 bg-ink-50 px-1.5 py-0.5 font-mono text-[10px] text-ink-500 dark:border-ink-700 dark:bg-ink-900">
                esc
              </kbd>
            </div>

            <ul className="max-h-[50vh] overflow-y-auto p-1.5">
              {filtered.length === 0 && (
                <li className="px-3 py-4 text-center font-mono text-[12px] text-ink-500">
                  no matching commands
                </li>
              )}
              {filtered.map((c, i) => {
                const Icon = c.icon;
                const isActive = i === cursor;
                return (
                  <li
                    key={c.id}
                    onMouseEnter={() => setCursor(i)}
                    onClick={() => c.run()}
                    className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 font-mono text-[12.5px] transition ${
                      isActive
                        ? "bg-flow-cyan/10 text-ink-900 dark:bg-flow-cyan/15 dark:text-ink-50"
                        : "text-ink-600 dark:text-ink-300"
                    }`}
                  >
                    <span className={`flex h-4 w-4 items-center justify-center ${isActive ? "text-flow-cyan" : "text-ink-400"}`}>
                      <Icon size={13} />
                    </span>
                    <span className="flex-1 truncate">{c.label}</span>
                    {c.hint && (
                      <span className="hidden truncate text-[11px] text-ink-400 sm:inline">{c.hint}</span>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between gap-2 border-t border-ink-200 px-3 py-2 font-mono text-[10px] text-ink-500 dark:border-ink-800">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="rounded border border-ink-200 bg-ink-50 px-1 py-0.5 dark:border-ink-700 dark:bg-ink-900">
                    ↑↓
                  </kbd>{" "}
                  navigate
                </span>
                <span>
                  <kbd className="rounded border border-ink-200 bg-ink-50 px-1 py-0.5 dark:border-ink-700 dark:bg-ink-900">
                    ↵
                  </kbd>{" "}
                  run
                </span>
              </div>
              <span>⌘K anywhere</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
