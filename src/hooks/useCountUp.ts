import { useEffect, useState } from "react";

export function useCountUp(target: string, start: boolean, duration = 1300): string {
  const [value, setValue] = useState<string>(() => {
    const match = target.match(/^([+-]?\d+\.?\d*)(.*)$/);
    if (!match) return target;
    const isFloat = match[1].includes(".");
    return (isFloat ? "0.0" : "0") + match[2];
  });

  useEffect(() => {
    if (!start) return;
    const match = target.match(/^([+-]?\d+\.?\d*)(.*)$/);
    if (!match) {
      setValue(target);
      return;
    }
    const final = parseFloat(match[1]);
    const suffix = match[2];
    const isFloat = match[1].includes(".");
    const startTime = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = final * eased;
      const formatted = isFloat ? current.toFixed(1) : Math.round(current).toString();
      setValue(formatted + suffix);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return value;
}
