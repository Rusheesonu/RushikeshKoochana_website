import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section className="py-24">
      <SectionHeading id="about" kicker="readme.md" title="about the engineer." />
      <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="space-y-5 text-lg leading-relaxed text-ink-700 dark:text-ink-300"
        >
          <p>
            I'm a data engineer who lives in the messy middle of the stack — where websites don't want
            to be scraped, SLAs don't forgive, and upstream schemas change without warning. I've spent
            the last five years building the pipelines and infrastructure that turn that chaos into
            clean, queryable, <em>on-time</em> data.
          </p>
          <p>
            At <span className="font-medium text-ink-900 dark:text-ink-50">DEEP.AD</span> I architect
            the crawling + ETL backbone that processes 10TB monthly and serves a million API requests a
            day under 200ms. Before that I was founding engineer at{" "}
            <span className="font-medium text-ink-900 dark:text-ink-50">Aisle 3</span>, where I built
            the distributed crawler from scratch and led a small team to 99.9% data-freshness SLA.
          </p>
          <p>
            I care about the boring stuff: observability, idempotency, retries, cost per record. The
            fancy stuff too — I integrate LLMs into extraction pipelines when they actually improve
            quality, not just the pitch deck.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl border border-ink-200 bg-white/60 p-5 font-mono text-[12px] text-ink-700 backdrop-blur dark:border-ink-800 dark:bg-ink-900/40 dark:text-ink-300"
        >
          <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink-500">
            <span className="h-1.5 w-1.5 rounded-full bg-flow-green" /> engineer.yaml
          </div>
          <pre className="whitespace-pre-wrap leading-relaxed">
{`role: senior_data_engineer
years_in_data: 5+
stack:
  core:     [python, sql, airflow]
  scraping: [playwright, selenium]
  cloud:    [aws, docker, ci/cd]
  stores:   [mongodb, postgres, s3]
loves:
  - incrementality
  - idempotent tasks
  - observable systems
dislikes:
  - midnight pages
  - silent failures
status: shipping`}
          </pre>
        </motion.div>
      </div>
    </section>
  );
}
