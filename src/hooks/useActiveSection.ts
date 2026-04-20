import { useEffect, useState } from "react";

const sectionIds = ["top", "pipeline", "about", "skills", "experience", "projects", "contact"];

const labelMap: Record<string, string> = {
  top: "hero",
  pipeline: "pipeline",
  about: "about",
  skills: "skills",
  experience: "experience",
  projects: "projects",
  contact: "contact",
};

export function useActiveSection(): string {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(labelMap[visible.target.id] ?? visible.target.id);
      },
      { threshold: [0.1, 0.3, 0.6], rootMargin: "-20% 0px -50% 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}
