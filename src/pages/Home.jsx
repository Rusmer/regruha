const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from "react";
import { motion } from "framer-motion";
import Reticle from "@/components/Reticle";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ClientModule from "@/components/ClientModule";
import GameCard from "@/components/GameCard";
import SignalFooter from "@/components/SignalFooter";
import { featured, games } from "@/data/games";

const HERO_IMAGE = "https://media.db.com/images/public/6a4429aec4d8855c752ea6b7/3976c07b6_generated_e2625e37.png";
const LORE_IMAGE = "https://media.db.com/images/public/6a4429aec4d8855c752ea6b7/2b3f71558_generated_6c16e042.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white relative">

      <Reticle />
      <div className="relative z-10">
        <Header />
        <Hero heroImage={HERO_IMAGE} />

        {/* Lore Vault */}
        <section className="max-w-[1400px] mx-auto px-5 sm:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-gold">// LORE VAULT — 01</span>
              <h2 className="font-display font-black text-4xl md:text-6xl text-white leading-[0.9] mt-4">
                АРХИВ,<br />СОБРАННЫЙ<br />ИЗ СИГНАЛОВ
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px mt-10 bg-[#1E1E1E] border border-[#1E1E1E]">
                {[
                  { t: "Качественные торренты", d: "Проверенные раздачи с высоким сидированием." },
                  { t: "Высокая скорость", d: "Прямые ссылки и торренты для любого канала." },
                  { t: "Безопасность", d: "Каждый артефакт проходит контроль качества." },
                ].map((f) => (
                  <div key={f.t} className="bg-[#050505] p-6">
                    <h3 className="font-display font-bold text-white text-lg mb-2">{f.t}</h3>
                    <p className="text-zinc-data text-sm leading-relaxed">{f.d}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <ClientModule />

        {/* Archive */}
        <section id="archive" className="max-w-[1400px] mx-auto px-5 sm:px-8 py-16">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-gold">// FREQUENCY HUB</span>
              <h2 className="font-display font-black text-4xl md:text-6xl text-white mt-3">АРХИВ РЕЛИЗОВ</h2>
            </div>
            <span className="font-mono text-xs tracking-widest text-zinc-data">
              {games.length + 1} ARTIFACTS INDEXED
            </span>
          </div>

          <div className="mb-8">
            <GameCard game={featured} featured />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {games.map((g, i) => (
              <GameCard key={g.id} game={g} index={i} />
            ))}
          </div>
        </section>

        <SignalFooter />
      </div>
    </div>
  );
}