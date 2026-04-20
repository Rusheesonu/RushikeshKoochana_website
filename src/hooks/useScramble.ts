import { useEffect, useState } from "react";

const chars = "!<>-_\\/[]{}—=+*^?#·$%";

export function useScramble(target: string, duration = 900, delay = 0): string {
  const [text, setText] = useState(() =>
    target
      .split("")
      .map((c) => (c === " " ? " " : chars[Math.floor(Math.random() * chars.length)]))
      .join("")
  );

  useEffect(() => {
    let raf: number;
    let startedAt: number | null = null;

    const tick = (now: number) => {
      if (startedAt === null) startedAt = now + delay;
      if (now < startedAt) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, (now - startedAt) / duration);
      const resolvedCount = Math.floor(target.length * t);
      let next = "";
      for (let i = 0; i < target.length; i++) {
        if (i < resolvedCount || target[i] === " ") {
          next += target[i];
        } else {
          next += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setText(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, delay]);

  return text;
}
