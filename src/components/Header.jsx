import React, { useState, useEffect } from "react";
import { Disc, Menu, X, Terminal } from "lucide-react";
import { DISCORD_URL } from "@/data/games";

const links = [
  { label: "ГЛАВНАЯ", href: "#top" },
  { label: "АРХИВ", href: "#archive" },
  { label: "КЛИЕНТ", href: "#client" },
  { label: "СИГНАЛ", href: "#footer" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "obsidian-glass" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#top" className="flex items-center gap-3 group">
            <div className="w-9 h-9 border border-gold flex items-center justify-center">
              <Terminal className="w-4 h-4 text-gold" />
            </div>
            <div className="leading-none">
              <span className="font-display font-black text-lg tracking-tight text-white">REGRUHA</span>
              <span className="block font-mono text-[9px] tracking-[0.3em] text-gold mt-0.5">DIGITAL ARCHIVE</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-mono text-xs tracking-[0.2em] text-zinc-data hover:text-gold transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 border border-[#1E1E1E] hover:border-gold px-4 py-2 font-mono text-xs tracking-widest text-white hover:text-gold transition-colors"
            >
              <Disc className="w-4 h-4" />
              DISCORD
            </a>
            <button
              className="md:hidden text-gold p-2"
              onClick={() => setOpen((o) => !o)}
              aria-label="Меню"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden obsidian-glass border-t border-[#1E1E1E]">
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm tracking-[0.2em] text-zinc-data hover:text-gold"
              >
                {l.label}
              </a>
            ))}
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-gold font-mono text-sm tracking-widest"
            >
              <Disc className="w-4 h-4" /> DISCORD
            </a>
          </div>
        </div>
      )}
    </header>
  );
}