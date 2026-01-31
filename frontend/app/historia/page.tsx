"use client";

import { motion } from "framer-motion";

export default function Historia() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-brand-green mb-6">A Nossa História</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Um percurso marcado pela dedicação, serviço e comunidade.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-12"
        >
          {/* Timeline Item 1 */}
          <div className="relative border-l-4 border-brand-green ml-4 pl-8 pb-8">
            <span className="absolute -left-3 top-0 bg-brand-gold w-6 h-6 rounded-full border-4 border-white dark:border-zinc-900"></span>
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-brand-green">Fundação e Primeiros Passos</h3>
              <span className="text-sm text-gray-500 font-semibold mb-2 block">O Início</span>
              <p className="text-gray-700 dark:text-gray-300">
                (Espaço reservado para a história da fundação do Agrupamento).
              </p>
            </div>
          </div>

          {/* Timeline Item 2 - Sedes */}
          <div className="relative border-l-4 border-brand-green ml-4 pl-8 pb-8">
            <span className="absolute -left-3 top-0 bg-brand-gold w-6 h-6 rounded-full border-4 border-white dark:border-zinc-900"></span>
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold text-brand-green">As Nossas Sedes</h3>
              <span className="text-sm text-gray-500 font-semibold mb-2 block">Um Lar para o Agrupamento</span>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Ao longo dos anos, o Agrupamento teve diferentes casas que acolheram as nossas atividades e crescimento.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Sede Antiga:</strong> (Localização/Descrição antiga)</li>
                <li><strong>Sede Atual:</strong> Rua dos Escuteiros, Nº2 Ribamar, Lourinhã. Um espaço renovado para acolher todas as secções.</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

