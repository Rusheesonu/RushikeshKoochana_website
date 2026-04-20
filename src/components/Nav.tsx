import { motion, useScroll, useTransform } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#pipeline", label: "pipeline" },
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
  { href: "#contact", label: "contact" },
];

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-ink-950/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#top"
          className="group flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-ink-900 dark:text-ink-100"
        >
          <span className="grid h-7 w-7 place-items-center rounded-md bg-ink-900 text-flow-cyan dark:bg-flow-cyan/15">
            <span className="text-[11px]">RK</span>
          </span>
          <span className="hidden sm:inline">rushikesh.koochana</span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-1.5 font-mono text-[12px] text-ink-600 transition hover:bg-ink-100 hover:text-ink-900 dark:text-ink-400 dark:hover:bg-ink-900 dark:hover:text-ink-50"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <ThemeToggle />
      </div>
      <motion.div
        style={{ width: lineWidth }}
        className="h-px bg-gradient-to-r from-flow-cyan via-flow-indigo to-flow-violet"
      />
    </header>
  );
}
