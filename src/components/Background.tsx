import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number };

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const setSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    setSize();

    const area = width * height;
    const count = Math.max(40, Math.min(90, Math.floor(area / 22000)));
    const particles: P[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    let mouseX = -9999;
    let mouseY = -9999;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", setSize);

    const CONNECT = 130;
    let raf = 0;
    let t = 0;

    const step = () => {
      t += 0.0025;
      const isDark = document.documentElement.classList.contains("dark");
      const dotColor = isDark ? "rgba(34, 211, 238, 0.75)" : "rgba(99, 102, 241, 0.55)";
      const haloColor = isDark ? "rgba(34, 211, 238, 0.18)" : "rgba(99, 102, 241, 0.15)";
      const lineRGB = isDark ? "129, 140, 248" : "99, 102, 241";

      // fade existing pixels for trails (destination-out preserves background transparency)
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      for (const p of particles) {
        // flow field — smooth organic swirl from trig noise
        const nx = p.x * 0.0028;
        const ny = p.y * 0.0028;
        const angle =
          Math.sin(nx + t) * Math.PI + Math.cos(ny - t * 0.9) * Math.PI;
        p.vx += Math.cos(angle) * 0.022;
        p.vy += Math.sin(angle) * 0.022;

        // mouse repulsion
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const md2 = dx * dx + dy * dy;
        if (md2 < 160 * 160 && md2 > 1) {
          const md = Math.sqrt(md2);
          const force = (160 - md) / 160;
          p.vx += (dx / md) * force * 0.55;
          p.vy += (dy / md) * force * 0.55;
        }

        // damp + cap
        p.vx *= 0.94;
        p.vy *= 0.94;
        const speed2 = p.vx * p.vx + p.vy * p.vy;
        const MAX = 1.35;
        if (speed2 > MAX * MAX) {
          const s = Math.sqrt(speed2);
          p.vx = (p.vx / s) * MAX;
          p.vy = (p.vy / s) * MAX;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;

        // halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = haloColor;
        ctx.fill();

        // core
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
      }

      // connections
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CONNECT * CONNECT) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / CONNECT) * 0.35;
            ctx.strokeStyle = `rgba(${lineRGB}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      if (!reducedMotion) raf = requestAnimationFrame(step);
    };

    if (reducedMotion) {
      // render one static frame
      step();
    } else {
      raf = requestAnimationFrame(step);
    }

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reducedMotion) {
        raf = requestAnimationFrame(step);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-white dark:bg-ink-950" />

      <div className="absolute inset-0">
        <div className="aurora aurora-1 bg-flow-indigo/35 dark:bg-flow-indigo/25" />
        <div className="aurora aurora-2 bg-flow-cyan/30 dark:bg-flow-cyan/20" />
        <div className="aurora aurora-3 bg-flow-violet/30 dark:bg-flow-violet/25" />
        <div className="aurora aurora-4 bg-flow-teal/25 dark:bg-flow-teal/15" />
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-[0.85] dark:opacity-100"
      />

      <div className="absolute inset-0 grid-bg opacity-[0.35] dark:opacity-[0.25]" />

      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          opacity: 0.045,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "240px 240px",
        }}
      />

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/80 via-white/30 to-transparent dark:from-ink-950/90 dark:via-ink-950/40" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/80 via-white/30 to-transparent dark:from-ink-950/90 dark:via-ink-950/40" />
    </div>
  );
}
