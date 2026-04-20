import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { skills } from "../data/resume";

export default function Skills() {
  return (
    <section className="py-24">
      <SectionHeading id="skills" kicker="schema.sql" title="tech stack, shaped like a schema.">
        The tools I reach for. Categorized like a table definition.
      </SectionHeading>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-xl border border-ink-200 bg-white/70 backdrop-blur dark:border-ink-800 dark:bg-ink-900/40"
      >
        <div className="flex items-center justify-between border-b border-ink-200 px-4 py-2.5 font-mono text-[11px] text-ink-500 dark:border-ink-800">
          <span>CREATE TABLE skills (column TEXT, values TEXT[]);</span>
          <span className="hidden sm:inline">6 rows · indexed</span>
        </div>

        <div className="divide-y divide-ink-200 dark:divide-ink-800">
          {skills.map((row, i) => (
            <motion.div
              key={row.category}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="grid gap-3 px-4 py-4 md:grid-cols-[220px_1fr] md:gap-6 md:px-6"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-ink-400">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-mono text-[13px] font-medium text-flow-indigo dark:text-flow-cyan">
                  {row.category}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {row.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-ink-200 bg-ink-50 px-2.5 py-1 font-mono text-[11px] text-ink-700 transition hover:border-ink-400 hover:bg-white dark:border-ink-800 dark:bg-ink-900 dark:text-ink-200 dark:hover:border-ink-600 dark:hover:bg-ink-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
