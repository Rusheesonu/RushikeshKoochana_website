import { motion, useInView } from "framer-motion";
import { CheckCircle2, Clock, MapPin } from "lucide-react";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { experience } from "../data/resume";
import type { Experience as Exp, Metric } from "../data/resume";
import { useCountUp } from "../hooks/useCountUp";

function MetricCell({ metric, inView }: { metric: Metric; inView: boolean }) {
  const value = useCountUp(metric.value, inView);
  return (
    <div>
      <div className="font-mono text-lg font-semibold tracking-tight text-ink-900 dark:text-ink-50 tabular-nums">
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-ink-500">{metric.label}</div>
    </div>
  );
}

function ExperienceCard({ exp, index }: { exp: Exp; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative pl-10 md:pl-14"
    >
      <div className="absolute left-0 top-1.5 flex h-8 w-8 items-center justify-center md:h-10 md:w-10">
        <span
          className={`absolute inset-0 rounded-full ${
            exp.current ? "bg-flow-green/25 animate-pulse-soft" : "bg-ink-200 dark:bg-ink-800"
          }`}
        />
        <span
          className={`relative h-3 w-3 rounded-full ${
            exp.current ? "bg-flow-green" : "bg-ink-400 dark:bg-ink-600"
          }`}
        />
      </div>

      <div className="rounded-xl border border-ink-200 bg-white/70 p-5 backdrop-blur dark:border-ink-800 dark:bg-ink-900/40">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ink-200 pb-4 dark:border-ink-800">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-50">{exp.role}</h3>
              <span className="font-mono text-sm text-ink-500">·</span>
              <span className="font-mono text-sm font-medium text-flow-indigo dark:text-flow-cyan">
                {exp.company}
              </span>
            </div>
            <div className="mt-1.5 flex flex-wrap items-center gap-3 text-[12px] text-ink-500">
              <span className="inline-flex items-center gap-1">
                <Clock size={12} /> {exp.period}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin size={12} /> {exp.location}
              </span>
            </div>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[10px] uppercase tracking-wider ${
              exp.current
                ? "border-flow-green/40 bg-flow-green/10 text-flow-green"
                : "border-ink-300 bg-ink-50 text-ink-500 dark:border-ink-700 dark:bg-ink-900 dark:text-ink-400"
            }`}
          >
            <CheckCircle2 size={11} /> {exp.current ? "running" : "success"}
          </span>
        </div>

        <p className="mt-4 text-[14px] text-ink-700 dark:text-ink-300">{exp.summary}</p>

        <ul className="mt-4 space-y-2">
          {exp.achievements.map((a) => (
            <li
              key={a}
              className="flex gap-3 text-[14px] leading-relaxed text-ink-700 dark:text-ink-300"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-flow-cyan" />
              <span>{a}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-ink-200 pt-4 sm:grid-cols-4 dark:border-ink-800">
          {exp.metrics.map((m) => (
            <MetricCell key={m.label} metric={m} inView={inView} />
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5 border-t border-ink-200 pt-4 dark:border-ink-800">
          {exp.stack.map((t) => (
            <span
              key={t}
              className="rounded border border-ink-200 bg-ink-50 px-1.5 py-0.5 font-mono text-[10px] text-ink-600 dark:border-ink-800 dark:bg-ink-900 dark:text-ink-400"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Experience() {
  return (
    <section className="py-24">
      <SectionHeading id="experience" kicker="dag.runs" title="execution history.">
        Five years. Four teams. Millions of records a day.
      </SectionHeading>

      <div className="relative">
        <div className="absolute left-[15px] top-2 bottom-0 w-px bg-gradient-to-b from-flow-cyan via-flow-indigo to-transparent md:left-[19px]" />

        <div className="space-y-10">
          {experience.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
