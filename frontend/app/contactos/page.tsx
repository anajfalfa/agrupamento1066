// frontend/app/page.tsx
"use client"; // necessário para Framer Motion
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
        <h1 className="text-xl font-bold text-blue-600">Agrupamento 1066 Ribamar</h1>
        <nav className="flex gap-6">
          <a
            href="#caminheiros"
            className="text-gray-700 dark:text-zinc-200 hover:text-blue-600 transition"
          >
            Caminheiros
          </a>
          <a
            href="#dirigentes"
            className="text-gray-700 dark:text-zinc-200 hover:text-blue-600 transition"
          >
            Dirigentes
          </a>
          <a
            href="#atividades"
            className="text-gray-700 dark:text-zinc-200 hover:text-blue-600 transition"
          >
            Atividades
          </a>
        </nav>
      </header>

      {/* Banner */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center text-center py-32 px-6 bg-blue-50 dark:bg-gray-800"
      >
        <h2 className="text-4xl font-bold text-blue-700 mb-4">
          IV Secção - Caminheiros
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl">
          Com coragem e união, juntos na missão! Descobre as nossas atividades e o espírito do Agrupamento 1066 Ribamar.
        </p>
      </motion.section>

      {/* Seções */}
      <main className="flex flex-col gap-20 py-16 px-6 max-w-5xl mx-auto">
        {/* Caminheiros */}
        <motion.section
          id="caminheiros"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md"
        >
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Caminheiros</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Aqui a IV Secção aprende a viver em Tribo e Clã, conhecendo os símbolos, a mística e o patrono São Paulo.
          </p>
        </motion.section>

        {/* Dirigentes */}
        <motion.section
          id="dirigentes"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md"
        >
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Dirigentes</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Os dirigentes guiam, apoiam e organizam todas as atividades, garantindo a aprendizagem e diversão de todos.
          </p>
        </motion.section>

        {/* Atividades */}
        <motion.section
          id="atividades"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md"
        >
          <h3 className="text-2xl font-semibold text-blue-600 mb-4">Atividades</h3>
          <p className="text-gray-700 dark:text-gray-300">
            Descobre acampamentos, jogos, caminhadas e eventos especiais organizados pelo Agrupamento 1066 Ribamar.
          </p>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        © 2026 Agrupamento 1066 Ribamar. Todos os direitos reservados.
      </footer>
    </div>
  );
}

