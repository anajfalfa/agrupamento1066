// app/page.tsx
/*
"use client"; // necessário para usar Framer Motion
import { motion } from "framer-motion";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black font-sans">
      <main className="flex flex-col items-center gap-6 bg-white dark:bg-gray-900 p-16 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-blue-600">
          Agrupamento 1066 Ribamar
        </h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-zinc-300">
          IV Secção - Caminheiros
        </p>
      </main>
    </div>



    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white dark:bg-gray-900 shadow-md">
        <h1 className="text-xl font-bold text-blue-600">Agrupamento 1066 Ribamar</h1>
        <nav className="flex gap-6">
          <a href="#caminheiros" className="text-gray-700 dark:text-zinc-200 hover:text-blue-600">
            Caminheiros
          </a>
          <a href="#dirigentes" className="text-gray-700 dark:text-zinc-200 hover:text-blue-600">
            Dirigentes
          </a>
          <a href="#atividades" className="text-gray-700 dark:text-zinc-200 hover:text-blue-600">
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
*/

/*
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
*/

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
 {/* Footer */}
      <footer className="text-center py-6 text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        © 2026 Agrupamento 1066 Ribamar. Todos os direitos reservados.
      </footer>
    </div>

    <h2 className="text-4xl font-bold text-blue-700 mb-4">
          IV Secção - Caminheiros
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl">
          Com coragem e união, juntos na missão! Descobre as nossas atividades e o espírito do Agrupamento 1066 Ribamar.
        </p>