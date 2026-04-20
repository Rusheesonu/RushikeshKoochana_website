import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../data/resume";
import MiniDag from "./MiniDag";
import { useScramble } from "../hooks/useScramble";

export default function Hero() {
  const firstName = profile.name.split(" ")[0];
  const lastName = profile.name.split(" ")[1];
  const scrambledFirst = useScramble(firstName, 700, 200);
  const scrambledLast = useScramble(lastName, 900, 500);

  return (
    <section id="top" className="relative pt-16 pb-24 sm:pt-24 sm:pb-32">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white/60 px-3 py-1 font-mono text-[11px] text-ink-600 backdrop-blur dark:border-ink-800 dark:bg-ink-900/40 dark:text-ink-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flow-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-flow-green" />
            </span>
            available · open to staff data / platform roles
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-[2.8rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="inline-block tabular-nums">{scrambledFirst}</span>
            <br />
            <span className="inline-block bg-gradient-to-r from-flow-cyan via-flow-teal to-flow-indigo bg-clip-text tabular-nums text-transparent">
              {scrambledLast}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600 dark:text-ink-300"
          >
            {profile.tagline}{" "}
            <span className="text-ink-900 dark:text-ink-100">
              Python · Airflow · AWS · distributed systems.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg bg-ink-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-ink-800 dark:bg-flow-cyan dark:text-ink-950 dark:hover:bg-flow-cyan/90"
            >
              <Mail size={14} /> get in touch
            </a>
            <a
              href="#experience"
              className="inline-flex items-center gap-2 rounded-lg border border-ink-200 px-4 py-2.5 text-sm font-medium text-ink-800 transition hover:border-ink-400 hover:bg-ink-50 dark:border-ink-800 dark:text-ink-200 dark:hover:border-ink-700 dark:hover:bg-ink-900"
            >
              <ArrowDown size={14} /> see the pipeline
            </a>
            <a
              href={profile.github}
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 text-ink-700 transition hover:border-ink-400 hover:text-ink-900 dark:border-ink-800 dark:text-ink-300 dark:hover:border-ink-700 dark:hover:text-ink-50"
            >
              <Github size={16} />
            </a>
            <a
              href={profile.linkedin}
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 text-ink-700 transition hover:border-ink-400 hover:text-ink-900 dark:border-ink-800 dark:text-ink-300 dark:hover:border-ink-700 dark:hover:text-ink-50"
            >
              <Linkedin size={16} />
            </a>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <MiniDag />
        </motion.div>
      </div>
    </section>
  );
}
