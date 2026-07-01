import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar, Tag, ThumbsUp, Languages, Cpu, Download,
  HardDriveDownload, Heart, Share2, Bookmark, ChevronDown, CheckCircle2, CircleSlash,
} from "lucide-react";

function StatusBadge({ status }) {
  const ok = status === "Проверено";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] tracking-widest border ${
        ok ? "border-gold text-gold" : "border-[#3a2a2a] text-red-400"
      }`}
    >
      {ok ? <CheckCircle2 className="w-3 h-3" /> : <CircleSlash className="w-3 h-3" />}
      {status.toUpperCase()}
    </span>
  );
}

export default function GameCard({ game, featured = false, index = 0 }) {
  const [open, setOpen] = useState(featured);

  const meta = [
    { icon: Calendar, label: "Добавлено", value: game.added },
    { icon: Tag, label: "Категория", value: game.category },
    { icon: ThumbsUp, label: "Рейтинг", value: game.rating },
    { icon: Languages, label: "Язык", value: game.lang },
  ];

  return (
    <motion.article
      data-node
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.08 }}
      className="group obsidian-glass relative overflow-hidden hover:border-gold transition-colors duration-300"
    >
      {featured && (
        <div className="absolute top-0 right-0 bg-gold text-[#050505] font-mono text-[10px] font-bold tracking-widest px-3 py-1 z-20">
          ОЖИДАЕМЫЙ РЕЛИЗ
        </div>
      )}
      <div className="relative overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            featured ? "h-64 md:h-80" : "h-48"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        <div className="absolute bottom-3 left-4 flex gap-2">
          <span className="font-mono text-[10px] tracking-widest border border-gold text-gold px-3 py-1 bg-[#050505]/70">
            {game.tag.toUpperCase()}
          </span>
          <span className="font-mono text-[10px] tracking-widest border border-[#1E1E1E] text-zinc-data px-3 py-1 bg-[#050505]/70">
            {game.size}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className={`font-display font-black text-white leading-tight ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
            {game.title}
          </h3>
          <StatusBadge status={game.status} />
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5">
          {meta.map((m) => (
            <div key={m.label} className="flex items-start gap-2">
              <m.icon className="w-3.5 h-3.5 text-gold mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <div className="font-mono text-[9px] tracking-widest text-zinc-data">{m.label.toUpperCase()}</div>
                <div className="text-sm text-white truncate">{m.value}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-zinc-data text-sm leading-relaxed mb-5">{game.desc}</p>

        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-gold mb-4"
        >
          <Cpu className="w-3.5 h-3.5" />
          СИСТЕМНЫЕ ТРЕБОВАНИЯ
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 border border-[#1E1E1E] p-4 bg-[#050505]/50">
            <div>
              <h4 className="font-mono text-[10px] tracking-widest text-zinc-data mb-2">МИНИМАЛЬНЫЕ</h4>
              <ul className="space-y-1 text-xs text-zinc-data">
                {game.req.min.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[10px] tracking-widest text-gold mb-2">РЕКОМЕНДУЕМЫЕ</h4>
              <ul className="space-y-1 text-xs text-zinc-data">
                {game.req.rec.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={game.torrent}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-gold text-white px-5 py-2.5 font-mono text-xs font-bold tracking-widest hover:opacity-80 transition-opacity"
          >
            <Download className="w-4 h-4" /> ТОРРЕНТ
          </a>
          <a
            href={game.direct}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 border border-[#1E1E1E] hover:border-gold text-white hover:text-gold px-5 py-2.5 font-mono text-xs tracking-widest transition-colors"
          >
            <HardDriveDownload className="w-4 h-4" /> ПРЯМАЯ ССЫЛКА
          </a>
          <div className="flex items-center gap-2 ml-auto">
            {[Heart, Share2, Bookmark].map((Icon, i) => (
              <button
                key={i}
                className="w-9 h-9 border border-[#1E1E1E] hover:border-gold text-zinc-data hover:text-gold flex items-center justify-center transition-colors"
              >
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}