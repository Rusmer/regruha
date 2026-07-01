import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Disc, Activity, Clock, Gamepad2 } from "lucide-react";
import { DISCORD_URL } from "@/data/games";

const meta = [
  { icon: Activity, label: "STATUS", value: "РАБОТАЕТ" },
  { icon: Gamepad2, label: "ТОРРЕНТОВ", value: "8" },
];

export default function Hero({ heroImage }) {
  const ref = useRef(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    setT({ x: x * 22, y: y * 22 });
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden"
    >

      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-2 h-2 bg-gold rounded-full solar-pulse" />
          <span className="font-mono text-xs tracking-[0.35em] text-zinc-data">
            // Баклашке Импере - Rusmers, r0lanoff aka rsm aka lilrs aka да хуй знает кто он
          </span>
        </motion.div>

        <motion.h1
          style={{ transform: `translate(${t.x}px, ${t.y}px)` }}
          className="font-display font-black text-white leading-[0.82] tracking-tighter select-none"
        >
          <span className="block text-[18vw] md:text-[15vw] lg:text-[13rem]">REGRUHA</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-xl mt-8 text-lg md:text-xl text-zinc-data leading-relaxed"
        >
          Цифровой архив релизов нового поколения. Качественные торренты,
          высокая скорость, безопасность — собрано в одном командном центре.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="flex flex-wrap items-center gap-4 mt-10"
        >
          <a
            href="#archive"
            className="group flex items-center gap-3 bg-gold text-white px-7 py-4 font-mono text-sm font-bold tracking-widest solar-pulse hover:opacity-80 transition-opacity"
          >
            ВОЙТИ В АРХИВ
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
          <a
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 border border-[#1E1E1E] hover:border-gold px-7 py-4 font-mono text-sm tracking-widest text-white hover:text-gold transition-colors"
          >
            <Disc className="w-4 h-4" /> DISCORD
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="grid grid-cols-3 max-w-xl mt-16 border-t border-[#1E1E1E]"
        >
          {meta.map((m) => (
            <div key={m.label} className="py-5 border-r border-[#1E1E1E] last:border-r-0 px-1">
              <m.icon className="w-4 h-4 text-gold mb-2" />
              <div className="font-mono text-[10px] tracking-[0.2em] text-zinc-data">{m.label}</div>
              <div className="font-display font-bold text-white text-sm md:text-base mt-1">{m.value}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}