import React from "react";
import { Disc, ArrowUp, Terminal } from "lucide-react";
import { DISCORD_URL } from "@/data/games";

export default function SignalFooter() {
  const marquee = "SYSTEM STATUS: ONLINE   //   REGRUHA DIGITAL ARCHIVE   //   UPLINK SECURE   //   ";
  return (
    <footer id="footer" className="relative border-t border-[#1E1E1E] mt-10">
      <div className="overflow-hidden border-b border-[#1E1E1E] py-4 bg-gold text-white">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k} className="font-mono text-sm font-bold tracking-[0.2em] text-[#050505]">
              {marquee.repeat(4)}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 border border-gold flex items-center justify-center">
                <Terminal className="w-4 h-4 text-gold" />
              </div>
              <span className="font-display font-black text-xl text-white">REGRUHA</span>
            </div>
            <p className="text-zinc-data text-sm leading-relaxed max-w-xs">
              Цифровой архив релизов с огромной коллекцией качественного контента.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[10px] tracking-[0.3em] text-gold mb-4">НАВИГАЦИЯ</h4>
            <ul className="space-y-2">
              {[
                { l: "Главная", h: "#top" },
                { l: "Архив", h: "#archive" },
                { l: "Клиент qBittorrent", h: "#client" },
              ].map((i) => (
                <li key={i.l}>
                  <a href={i.h} className="text-zinc-data hover:text-gold text-sm transition-colors">{i.l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] tracking-[0.3em] text-gold mb-4">КАНАЛ СВЯЗИ</h4>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-[#1E1E1E] hover:border-gold text-white hover:text-gold px-5 py-3 font-mono text-xs tracking-widest transition-colors"
            >
              <Disc className="w-4 h-4" /> DISCORD СООБЩЕСТВО
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-14 pt-8 border-t border-[#1E1E1E]">
          <p className="font-mono text-[11px] tracking-widest text-zinc-data">
            © {new Date().getFullYear()} REGRUHA — ALL SIGNALS RESERVED
          </p>
          <a
            href="#top"
            className="group flex items-center gap-2 border border-gold text-gold px-5 py-3 font-mono text-xs tracking-widest hover:bg-gold hover:text-white transition-colors"
          >
            UPLOAD SIGNAL
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </footer>
  );
}