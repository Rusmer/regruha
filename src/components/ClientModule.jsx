import React from "react";
import { motion } from "framer-motion";
import { Download, Info, HardDriveDownload } from "lucide-react";

export default function ClientModule() {
  return (
    <section id="client" className="max-w-[1400px] mx-auto px-5 sm:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="obsidian-glass relative overflow-hidden"
      >
        <div className="absolute inset-0 matrix-grid opacity-50 pointer-events-none" />
        <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 border border-gold flex items-center justify-center">
              <HardDriveDownload className="w-9 h-9 text-gold" />
            </div>
          </div>
          <div className="flex-grow">
            <span className="font-mono text-[10px] tracking-[0.3em] text-gold">// РЕКОМЕНДУЕМЫЙ МОДУЛЬ</span>
            <h3 className="font-display font-black text-2xl md:text-3xl text-white mt-2">
              qBittorrent
            </h3>
            <p className="text-zinc-data mt-3 max-w-lg leading-relaxed">
              Быстрый, лёгкий и бесплатный торрент-клиент с открытым исходным кодом.
              Установите перед загрузкой артефактов из архива.
            </p>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0 w-full md:w-auto">
            <a
              href="https://www.qbittorrent.org/download"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-gold text-white px-6 py-3 font-mono text-xs font-bold tracking-widest hover:opacity-80 transition-opacity"
            >
              <Download className="w-4 h-4" /> СКАЧАТЬ
            </a>
            <a
              href="https://www.qbittorrent.org/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 border border-[#1E1E1E] hover:border-gold text-white hover:text-gold px-6 py-3 font-mono text-xs tracking-widest transition-colors"
            >
              <Info className="w-4 h-4" /> ПОДРОБНЕЕ
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}