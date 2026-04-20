import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Pipeline from "./components/Pipeline";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BootSplash from "./components/BootSplash";
import StatusBar from "./components/StatusBar";
import CommandPalette from "./components/CommandPalette";
import Background from "./components/Background";

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip pb-10">
      <Background />
      <BootSplash />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <Nav />
      <main className="mx-auto max-w-6xl px-5 sm:px-8">
        <Hero />
        <Pipeline />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <StatusBar onOpenPalette={() => setPaletteOpen(true)} />
    </div>
  );
}
