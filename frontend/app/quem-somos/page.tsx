"use client";

import { motion } from "framer-motion";

const TeamSection = ({ title, roles }: { title: string, roles: string[] }) => (
  <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-md">
    <h3 className="text-xl font-bold text-brand-green mb-4">{title}</h3>
    <ul className="space-y-2">
      {roles.map((role, idx) => (
        <li key={idx} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
          <span className="w-2 h-2 bg-brand-gold rounded-full" />
          <span>{role}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function QuemSomos() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-brand-green mb-6">Quem Somos</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            O Agrupamento 1066 Ribamar é uma comunidade dedicada ao escutismo, guiada por uma equipa de dirigentes comprometida com a educação e formação dos jovens.
          </p>
          <div className="relative w-full max-w-4xl mx-auto h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl mb-12">
            <img
              src="/IMG_5148.JPG" // IMG_5148.JPG
              alt="Equipa do Agrupamento 1066"
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>

        {/* Direção de Agrupamento */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-brand-green-dark mb-8 text-center">Direção de Agrupamento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-lg border-t-4 border-brand-green">
              <h3 className="font-bold text-lg mb-1">Assistente de Agrupamento</h3>
              <p className="text-gray-500 text-sm">Padre Joaquim Batalha / Padre Diogo Tomás</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-lg border-t-4 border-brand-green">
              <h3 className="font-bold text-lg mb-1">Chefe de Agrupamento</h3>
              <p className="text-gray-500 text-sm">Maria João Gomes</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-lg border-t-4 border-brand-green">
              <h3 className="font-bold text-lg mb-1">Chefe de Agrupamento Adjunto</h3>
              <p className="text-gray-500 text-sm">Jorge Silva</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-lg border-t-4 border-brand-green">
              <h3 className="font-bold text-lg mb-1">Secretária de Agrupamento</h3>
              <p className="text-gray-500 text-sm">Ana Rosário</p>
            </div>
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-lg border-t-4 border-brand-green">
              <h3 className="font-bold text-lg mb-1">Tesoureira de Agrupamento</h3>
              <p className="text-gray-500 text-sm">Marisa Nunes</p>
            </div>
          </div>
        </motion.section>

        {/* Equipas de Animação */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-brand-green-dark mb-8 text-center">Equipas de Animação</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TeamSection
              title="Alcateia (Lobitos)"
              roles={["Chefe de Alcateia: Alice Rosário", "Aspirante a Dirigente: Suse Almeida", "Aspirante a Dirigente: Emanuel Almeida", "Noviço a Dirigente: Camila Pereira", "Noviço a Dirigente: Ana Júlia Alfaiate"]}
            />
            <TeamSection
              title="Expedição (Exploradores)"
              roles={["Chefe de Expedição: Maria João Gomes", "Chefe Adj. Expedição: Mariana Silva", "Noviço a Dirigente: Tiago Gomes", "Noviço a Dirigente: Bruno Alfaiate", "Aspirante a Dirigente: Ana Maria Pereira"]}
            />
            <TeamSection
              title="Comunidade (Pioneiros)"
              roles={["Chefe de Comunidade: Marisa Nunes", "Chefe Adj. Comunidade: Jorge Silva",]}
            />
            <TeamSection
              title="Clã (Caminheiros)"
              roles={["Chefe de Clã: Ana Rosário", "Aspirante a Dirigente: Josefa Alfaiate"]}
            />
          </div>
        </motion.section>
      </div>
    </div>
  );
}
