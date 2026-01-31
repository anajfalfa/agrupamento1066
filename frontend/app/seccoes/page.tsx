"use client";

import { motion } from "framer-motion";
import SectionCalculator from "@/components/SectionCalculator";

const SectionCard = ({ title, ages, color, description, patron, symbols, url, infoUrl, delay }: { title: string, ages: string, color: string, description: string, patron: string, symbols: string, url: string, infoUrl: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg overflow-hidden border-t-4"
    style={{ borderColor: color }}
  >
    <div className="p-8">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
        <span className="px-3 py-1 bg-gray-100 dark:bg-zinc-700 rounded-full text-sm font-semibold text-gray-600 dark:text-gray-300">
          {ages}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-300 mb-6 font-medium">
        {description}
      </p>

      <div className="space-y-3 mb-6">
        <div className="flex items-start gap-2">
          <span className="font-bold text-gray-900 dark:text-white min-w-[70px]">Patrono:</span>
          <span className="text-gray-600 dark:text-gray-300">{patron}</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-bold text-gray-900 dark:text-white min-w-[70px]">Símbolos:</span>
          <span className="text-gray-600 dark:text-gray-300">{symbols}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-auto">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold uppercase tracking-wider hover:underline flex items-center gap-1"
          style={{ color }}
        >
          Microsite &rarr;
        </a>
        <a
          href={infoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold uppercase tracking-wider hover:underline flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          Pedagogia +
        </a>
      </div>
    </div>
  </motion.div>
);

export default function Seccoes() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-brand-green mb-6">As Nossas Secções</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            O escutismo divide-se em quatro secções, cada uma adaptada a uma faixa etária específica, com a sua própria mística e simbologia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SectionCard
            title="Lobitos (Alcateia)"
            ages="6 aos 10 anos"
            color="#ffe066" // Using yellow-light/brand yellow equivalent
            description="Organizados em bandos que constituem a alcateia. O seu local de reunião é o covil."
            patron="São Francisco de Assis"
            symbols="Selva, Grande Uivo, Totem, Sol"
            url="https://lobitos.escutismo.pt"
            infoUrl="https://escutismo.pt/lobitos-6-aos-10-anos/"
            delay={0.1}
          />
          <SectionCard
            title="Exploradores (Expedição)"
            ages="10 aos 14 anos"
            color="#006738" // Brand green
            description="Organizados em patrulhas que constituem a expedição. O seu local de reunião é a base."
            patron="São Tiago"
            symbols="Flor-de-lis, Vara pessoal, Chapéu, Cantil, Estrela"
            url="https://exploradores.escutismo.pt"
            infoUrl="https://escutismo.pt/exploradores-10-aos-14-anos/"
            delay={0.2}
          />
          <SectionCard
            title="Pioneiros (Comunidade)"
            ages="14 aos 18 anos"
            color="#00599c" // Brand blue
            description="Organizados em equipas que constituem a comunidade. O seu local de reunião é o abrigo."
            patron="São Pedro"
            symbols="Rosa dos ventos, Gota de Água, Machada, Icthus"
            url="https://pioneiros.escutismo.pt"
            infoUrl="https://escutismo.pt/pioneiros-14-aos-18-anos/"
            delay={0.3}
          />
          <SectionCard
            title="Caminheiros (Clã)"
            ages="18 aos 22 anos"
            color="#e4022d" // Brand red
            description="Organizados em tribos que constituem o clã. O seu local de reunião é o albergue."
            patron="São Paulo"
            symbols="Vara bifurcada, Mochila, Tenda, Pão, Evangelho, Fogo"
            url="https://caminheiros.escutismo.pt"
            infoUrl="https://escutismo.pt/caminheiros-18-aos-22-anos/"
            delay={0.4}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-brand-green mb-8 text-center">
            Informações do Agrupamento · 2025/26
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Números */}
            <div>
              <h3 className="text-xl font-bold mb-4">Subunidades</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-medium">
                <li>Alcateia: <strong>115</strong></li>
                <li>Expedição: <strong>123</strong></li>
                <li>Comunidade: <strong>109</strong></li>
                <li>Clã: <strong>90</strong></li>
              </ul>
            </div>

            {/* Patronos das Unidades */}
            <div>
              <h3 className="text-xl font-bold mb-4">Patronos das Unidades</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300 font-medium">
                <li>I Unidade — São Estevão</li>
                <li>II Unidade — São Francisco de Assis</li>
                <li>III Unidade — São Pedro</li>
                <li>IV Unidade — Santo António</li>
              </ul>
            </div>

            {/* Subunidades */}
            <div>
              <h3 className="text-xl font-bold mb-4">Bandos / Patrulhas / Equipas / Tribos</h3>

              <div className="space-y-4 text-gray-600 dark:text-gray-300 font-medium">
                <div>
                  <strong>Alcateia:</strong> Branco, Cinzento, Preto
                </div>
                <div>
                  <strong>Expedição:</strong> Tigre, Cobra, Lobo, Falcão
                </div>
                <div>
                  <strong>Comunidade:</strong> Equipa João Garcia, Equipa Amelia Earhart
                </div>
                <div>
                  <strong>Clã:</strong> Tribo Malala
                </div>
              </div>
            </div>
          </div>
        </motion.div>


        <div className="mt-20">
          <SectionCalculator />
        </div>
      </div>
    </div>
  );
}

