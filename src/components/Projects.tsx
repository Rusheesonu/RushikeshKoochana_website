import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { useState } from "react";
import SectionHeading from "./SectionHeading";
import { projects } from "../data/resume";
import type { Project } from "../data/resume";
import ProjectModal from "./ProjectModal";

const statusStyle: Record<string, string> = {
  SUCCESS: "border-flow-green/40 bg-flow-green/10 text-flow-green",
  RUNNING: "border-flow-cyan/40 bg-flow-cyan/10 text-flow-cyan",
  DEPLOYED: "border-flow-violet/40 bg-flow-violet/10 text-flow-violet",
};

export default function Projects() {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <section className="py-24">
      <SectionHeading id="projects" kicker="task.instances" title="selected projects.">
        Side quests and production work that shaped how I build. Click any card for the full task
        instance — details, logs, and the DAG definition.
      </SectionHeading>

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.button
            key={p.id}
            onClick={() => setOpenProject(p)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            whileHover={{ y: -3 }}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-ink-200 bg-white/70 p-5 text-left transition hover:border-ink-300 hover:shadow-md dark:border-ink-800 dark:bg-ink-900/40 dark:hover:border-ink-700"
          >
            <div className="flex items-center justify-between">
              <span
                className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[10px] uppercase tracking-wider ${statusStyle[p.status]}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" /> {p.status}
              </span>
              <span className="font-mono text-[10px] text-ink-400">task_id: {p.id}</span>
            </div>

            <div className="mt-4 flex items-start justify-between gap-3">
              <h3 className="text-xl font-semibold tracking-tight text-ink-900 dark:text-ink-50">
                {p.name}
              </h3>
              <ArrowUpRight
                size={18}
                className="shrink-0 text-ink-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-900 dark:group-hover:text-ink-50"
              />
            </div>
            <p className="mt-1 text-[13px] font-medium text-flow-indigo dark:text-flow-cyan">
              {p.tagline}
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-600 dark:text-ink-400">
              {p.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-ink-200 pt-4 dark:border-ink-800">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded border border-ink-200 bg-ink-50 px-1.5 py-0.5 font-mono text-[10px] text-ink-600 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-400"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between font-mono text-[11px] text-ink-500">
              <span className="inline-flex items-center gap-1.5">
                {p.repo && <Github size={12} />}
                {p.repo ? p.repo.replace("https://", "") : "private repo"}
              </span>
              <span className="text-flow-cyan opacity-0 transition group-hover:opacity-100">
                open task_instance →
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}
