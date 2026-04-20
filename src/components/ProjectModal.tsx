import { AnimatePresence, motion } from "framer-motion";
import { Code2, ExternalLink, FileText, Github, ScrollText, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Project } from "../data/resume";

type Props = { project: Project | null; onClose: () => void };
type TabId = "details" | "logs" | "code";

function taskName(p: Project) {
  return p.id.replace(/-/g, "_");
}

function buildLogs(p: Project): string[] {
  const base = new Date();
  const ts = (s: number) =>
    new Date(base.getTime() - s * 1000).toISOString().replace("T", " ").slice(0, 19);
  const name = taskName(p);
  const lines: string[] = [];
  lines.push(`[${ts(65)}] [INFO] task_instance[${p.id}] - dependencies satisfied, queueing`);
  lines.push(`[${ts(62)}] [INFO] executor: LocalExecutor · slots=4`);
  lines.push(`[${ts(58)}] [INFO] starting task ${name}`);
  lines.push(`[${ts(55)}] [INFO] loading operators from ${p.stack.slice(0, 2).join(", ")}`);
  p.stack.forEach((s, i) => lines.push(`[${ts(48 - i * 2)}] [INFO] imported ${s}`));
  lines.push(`[${ts(30)}] [INFO] running pipeline · stage=1/3 extract`);
  lines.push(`[${ts(22)}] [INFO] running pipeline · stage=2/3 transform`);
  lines.push(`[${ts(12)}] [INFO] running pipeline · stage=3/3 load`);
  lines.push(`[${ts(6)}] [OK]   integration tests passed (${Math.floor(12 + Math.random() * 40)} cases)`);
  lines.push(`[${ts(3)}] [OK]   task_instance.state = ${p.status}`);
  lines.push(`[${ts(1)}] [INFO] marked success · duration: ${(22 + Math.random() * 30).toFixed(1)}s`);
  return lines;
}

function buildCode(p: Project): string {
  const name = taskName(p);
  const stackList = p.stack.map((s) => `"${s.toLowerCase()}"`).join(", ");
  return `from airflow.decorators import task
from airflow.models.dag import DAG
from datetime import datetime

# ${p.tagline}
with DAG(
    dag_id="${p.id}",
    start_date=datetime(2024, 1, 1),
    schedule="@daily",
    catchup=False,
    tags=[${stackList}],
) as dag:

    @task(retries=3, retry_delay=60)
    def ${name}():
        stack = [${stackList}]
        return run_pipeline(name="${p.name}", stack=stack)

    ${name}()`;
}

const tabs: { id: TabId; label: string; icon: typeof FileText }[] = [
  { id: "details", label: "details", icon: FileText },
  { id: "logs", label: "logs", icon: ScrollText },
  { id: "code", label: "code", icon: Code2 },
];

const statusStyle: Record<string, string> = {
  SUCCESS: "text-flow-green border-flow-green/40 bg-flow-green/10",
  RUNNING: "text-flow-cyan border-flow-cyan/40 bg-flow-cyan/10",
  DEPLOYED: "text-flow-violet border-flow-violet/40 bg-flow-violet/10",
};

export default function ProjectModal({ project, onClose }: Props) {
  const [tab, setTab] = useState<TabId>("details");

  useEffect(() => {
    setTab("details");
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [project, onClose]);

  const logs = useMemo(() => (project ? buildLogs(project) : []), [project]);
  const code = useMemo(() => (project ? buildCode(project) : ""), [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-xl border border-ink-200 bg-white shadow-2xl dark:border-ink-800 dark:bg-ink-900"
          >
            <div className="flex items-start justify-between gap-4 border-b border-ink-200 px-5 py-4 dark:border-ink-800">
              <div className="min-w-0">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-flow-cyan" />
                  task_instance · {project.id}
                </div>
                <h3 className="mt-1.5 truncate text-xl font-semibold tracking-tight text-ink-900 dark:text-ink-50">
                  {project.name}
                </h3>
                <p className="mt-0.5 text-[13px] text-flow-indigo dark:text-flow-cyan">
                  {project.tagline}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[10px] uppercase tracking-wider ${statusStyle[project.status]}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {project.status}
                </span>
                <button
                  onClick={onClose}
                  className="rounded-md p-1.5 text-ink-400 transition hover:bg-ink-100 hover:text-ink-900 dark:hover:bg-ink-800 dark:hover:text-ink-50"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="flex border-b border-ink-200 dark:border-ink-800">
              {tabs.map((t) => {
                const Icon = t.icon;
                const active = t.id === tab;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`relative flex items-center gap-1.5 px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider transition ${
                      active
                        ? "text-flow-cyan"
                        : "text-ink-500 hover:text-ink-700 dark:hover:text-ink-300"
                    }`}
                  >
                    <Icon size={12} /> {t.label}
                    {active && (
                      <motion.span
                        layoutId="project-tab-underline"
                        className="absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-flow-cyan"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {tab === "details" && (
                <div className="space-y-4 p-5">
                  <p className="text-[14px] leading-relaxed text-ink-700 dark:text-ink-300">
                    {project.description}
                  </p>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-3 rounded-lg border border-ink-200 bg-ink-50 p-4 font-mono text-[11px] dark:border-ink-800 dark:bg-ink-950 sm:grid-cols-4">
                    <div>
                      <dt className="text-ink-500">state</dt>
                      <dd className="mt-0.5 text-flow-green">{project.status}</dd>
                    </div>
                    <div>
                      <dt className="text-ink-500">retries</dt>
                      <dd className="mt-0.5 text-ink-800 dark:text-ink-200">0 / 3</dd>
                    </div>
                    <div>
                      <dt className="text-ink-500">duration</dt>
                      <dd className="mt-0.5 text-ink-800 dark:text-ink-200">42.3s</dd>
                    </div>
                    <div>
                      <dt className="text-ink-500">operator</dt>
                      <dd className="mt-0.5 text-ink-800 dark:text-ink-200">PythonOperator</dd>
                    </div>
                  </dl>
                  <div>
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-wider text-ink-500">
                      stack
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((s) => (
                        <span
                          key={s}
                          className="rounded border border-ink-200 bg-ink-50 px-1.5 py-0.5 font-mono text-[11px] text-ink-600 dark:border-ink-800 dark:bg-ink-950 dark:text-ink-400"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  {(project.repo || project.link) && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 px-3 py-1.5 font-mono text-[11px] text-ink-700 transition hover:border-ink-400 hover:text-ink-900 dark:border-ink-800 dark:text-ink-300 dark:hover:border-ink-600 dark:hover:text-ink-50"
                        >
                          <Github size={12} /> view repo
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-md border border-ink-200 px-3 py-1.5 font-mono text-[11px] text-ink-700 transition hover:border-ink-400 hover:text-ink-900 dark:border-ink-800 dark:text-ink-300 dark:hover:border-ink-600 dark:hover:text-ink-50"
                        >
                          <ExternalLink size={12} /> live demo
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}

              {tab === "logs" && (
                <div className="bg-ink-950 p-4">
                  <pre className="whitespace-pre-wrap font-mono text-[11.5px] leading-relaxed">
                    {logs.map((l, i) => (
                      <div
                        key={i}
                        className={
                          l.includes("[OK]")
                            ? "text-flow-green"
                            : l.includes("[ERROR]")
                            ? "text-flow-rose"
                            : "text-ink-300"
                        }
                      >
                        {l}
                      </div>
                    ))}
                  </pre>
                </div>
              )}

              {tab === "code" && (
                <pre className="overflow-x-auto bg-ink-950 p-4 font-mono text-[12px] leading-relaxed text-ink-200">
                  {code.split("\n").map((line, i) => (
                    <div key={i}>
                      <span className="mr-4 select-none text-ink-600">{String(i + 1).padStart(2, "0")}</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </pre>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-ink-200 px-4 py-2 font-mono text-[10px] text-ink-500 dark:border-ink-800">
              <span>dag: career.main · task {project.id}</span>
              <span>
                press{" "}
                <kbd className="rounded border border-ink-200 bg-ink-50 px-1 py-0.5 dark:border-ink-700 dark:bg-ink-900">
                  esc
                </kbd>{" "}
                to close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
