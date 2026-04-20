import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Database, FileSearch, GitBranch, Server, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";

type Stage = {
  icon: typeof Database;
  title: string;
  op: string;
  detail: string;
  accent: string;
};

const stages: Stage[] = [
  {
    icon: FileSearch,
    title: "ingest",
    op: "playwright.crawl",
    detail: "500+ sites · stealth · proxy rotation",
    accent: "#22d3ee",
  },
  {
    icon: GitBranch,
    title: "orchestrate",
    op: "airflow.schedule",
    detail: "parallel · incremental · retryable",
    accent: "#818cf8",
  },
  {
    icon: Sparkles,
    title: "transform",
    op: "gpt4.resolve",
    detail: "97% accuracy · entity resolution",
    accent: "#a78bfa",
  },
  {
    icon: Database,
    title: "store",
    op: "mongo.upsert",
    detail: "validated · indexed · +300% reads",
    accent: "#2dd4bf",
  },
  {
    icon: Server,
    title: "serve",
    op: "rest.expose",
    detail: "1M req/day · <200ms p95",
    accent: "#fb7185",
  },
];

export default function Pipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24">
      <SectionHeading id="pipeline" kicker="dag.overview" title="my pipeline, end to end.">
        The same pattern powers every system I ship: ingest dirty data from the open web, orchestrate
        transforms, enrich with LLMs, store it validated, and serve it fast.
      </SectionHeading>

      <div ref={ref} className="relative">
        <div className="relative h-1 w-full overflow-hidden rounded-full bg-ink-100 dark:bg-ink-900">
          <motion.div
            style={{ width: progressWidth }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-flow-cyan via-flow-indigo to-flow-rose"
          />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-5">
          {stages.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative"
              >
                <div
                  className="relative flex h-full flex-col gap-3 rounded-xl border border-ink-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-sm dark:border-ink-800 dark:bg-ink-900/60 dark:hover:border-ink-700"
                  style={{ boxShadow: `inset 0 1px 0 ${s.accent}20` }}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-px"
                    style={{ background: `linear-gradient(to right, transparent, ${s.accent}, transparent)` }}
                  />
                  <div className="flex items-center justify-between">
                    <div
                      className="grid h-8 w-8 place-items-center rounded-md"
                      style={{ background: `${s.accent}15`, color: s.accent }}
                    >
                      <Icon size={15} />
                    </div>
                    <span
                      className="font-mono text-[10px] uppercase tracking-wider"
                      style={{ color: s.accent }}
                    >
                      stage {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink-900 dark:text-ink-50">
                      {s.title}
                    </div>
                    <div className="mt-0.5 font-mono text-[11px] text-ink-500">{s.op}</div>
                  </div>
                  <div className="mt-auto text-[12px] leading-relaxed text-ink-600 dark:text-ink-400">
                    {s.detail}
                  </div>
                  <motion.div
                    className="absolute -right-2 top-1/2 z-10 hidden h-px w-4 -translate-y-1/2 md:block"
                    style={{ background: s.accent }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.3 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
