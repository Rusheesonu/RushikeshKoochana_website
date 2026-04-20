import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const lines = [
  { d: 40, text: "$ airflow scheduler --init --dag career.main" },
  { d: 240, text: "[INFO] parsing dag · career.main" },
  { d: 430, text: "[INFO] initializing worker pool (n=4)" },
  { d: 620, text: "[INFO] loading operators · playwright · airflow · mongo · s3" },
  { d: 820, text: "[OK]   dag validated · 4 tasks · 0 errors" },
  { d: 1010, text: "[OK]   site compiled · ready to serve" },
];

const TOTAL = 1500;

export default function BootSplash() {
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("booted") !== "1";
  });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const timers = lines.map((l, i) => window.setTimeout(() => setStep(i + 1), l.d));
    const done = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("booted", "1");
    }, TOTAL);
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(done);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-ink-950"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="w-full max-w-md px-6">
            <div className="mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-ink-500">
              <div className="flex items-center gap-2 text-flow-cyan">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flow-green opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-flow-green" />
                </span>
                airflow · boot
              </div>
              <span>v5.2.0</span>
            </div>

            <div className="min-h-[132px] space-y-1.5 font-mono text-[11.5px] leading-relaxed">
              {lines.slice(0, step).map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={
                    l.text.startsWith("[OK]")
                      ? "text-flow-green"
                      : l.text.startsWith("[INFO]")
                      ? "text-ink-300"
                      : "text-flow-cyan"
                  }
                >
                  {l.text}
                </motion.div>
              ))}
              {step < lines.length && (
                <motion.span
                  className="inline-block h-3 w-[7px] bg-flow-cyan"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                />
              )}
            </div>

            <div className="mt-5 h-[2px] w-full overflow-hidden rounded-full bg-ink-800">
              <motion.div
                className="h-full bg-gradient-to-r from-flow-cyan via-flow-indigo to-flow-violet"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: TOTAL / 1000, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
