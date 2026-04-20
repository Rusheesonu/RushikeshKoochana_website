import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { profile } from "../data/resume";

export default function Contact() {
  return (
    <section className="py-24">
      <SectionHeading id="contact" kicker="socket.open" title="let's build something." >
        I'm open to staff-level data engineering, platform, or architecture roles. Also happy to talk
        about interesting problems in scraping, ETL, or LLM-in-the-loop systems.
      </SectionHeading>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-xl border border-ink-200 bg-ink-950/95 font-mono text-sm text-ink-100 shadow-xl dark:border-ink-800"
      >
        <div className="flex items-center justify-between border-b border-ink-800 px-4 py-2.5 text-[11px] text-ink-400">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-flow-rose/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-flow-amber/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-flow-green/80" />
          </div>
          <span>— rushi@home — zsh — 82x24 —</span>
          <span>●</span>
        </div>

        <div className="space-y-3 p-6">
          <div>
            <span className="text-flow-green">rushi@home</span>
            <span className="text-ink-500">:</span>
            <span className="text-flow-cyan">~/website</span>
            <span className="text-ink-500">$ </span>
            <span>whoami</span>
          </div>
          <div className="text-ink-300 pl-4">{profile.name} — {profile.role}</div>

          <div>
            <span className="text-flow-green">rushi@home</span>
            <span className="text-ink-500">:</span>
            <span className="text-flow-cyan">~/website</span>
            <span className="text-ink-500">$ </span>
            <span>cat contact.json</span>
          </div>
          <pre className="pl-4 text-ink-300 leading-relaxed">
{`{
  "email":    "${profile.email}",
  "linkedin": "${profile.linkedin.replace("https://", "")}",
  "status":   "available"
}`}
          </pre>

          <div className="flex flex-wrap gap-2 pt-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-flow-cyan px-4 py-2 text-ink-950 transition hover:bg-flow-cyan/90"
            >
              <Mail size={14} /> {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-ink-700 px-4 py-2 text-ink-200 transition hover:border-ink-500 hover:text-ink-50"
            >
              <Linkedin size={14} /> linkedin
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-ink-700 px-4 py-2 text-ink-200 transition hover:border-ink-500 hover:text-ink-50"
            >
              <Github size={14} /> github
            </a>
          </div>

          <div className="flex items-center gap-2 pt-3">
            <span className="text-flow-green">rushi@home</span>
            <span className="text-ink-500">:</span>
            <span className="text-flow-cyan">~/website</span>
            <span className="text-ink-500">$</span>
            <motion.span
              className="inline-block h-4 w-2 bg-flow-cyan"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
