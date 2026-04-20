import { profile } from "../data/resume";

export default function Footer() {
  return (
    <footer className="border-t border-ink-200 py-10 dark:border-ink-800">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 font-mono text-[11px] text-ink-500 sm:flex-row sm:px-8">
        <span>
          © {new Date().getFullYear()} {profile.name} · built with react + framer motion
        </span>
        <span>
          <span className="text-flow-green">●</span> site_status: 200 ok
        </span>
      </div>
    </footer>
  );
}
