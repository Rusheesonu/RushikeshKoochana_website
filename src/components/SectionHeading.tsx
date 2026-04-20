import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  id: string;
  kicker: string;
  title: string;
  children?: ReactNode;
};

export default function SectionHeading({ id, kicker, title, children }: Props) {
  return (
    <div id={id} className="relative mb-10 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-flow-cyan">
          <span className="h-px w-6 bg-flow-cyan/60" /> {kicker}
        </div>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl dark:text-ink-50">
          {title}
        </h2>
        {children && (
          <p className="mt-3 max-w-2xl text-ink-600 dark:text-ink-400">{children}</p>
        )}
      </motion.div>
    </div>
  );
}
