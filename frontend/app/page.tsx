// frontend/app/page.tsx
"use client"; // necessário para Framer Motion
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">

      {/* Banner */}
      <motion.section
        initial={{ opacity: 0 }} //, y: 30
        animate={{ opacity: 1 }} //, y: 0 
        transition={{ duration: 1 }}
        className="relative flex flex-col items-center justify-center text-center py-32 px-6 bg-gradient-to-b from-brand-green to-brand-green-dark text-white"

      >

        <div className="absolute inset-0 z-0">
          <Image
            src="/IMG_4666.jpg" // Ou outra foto de campo/floresta
            alt="Fundo Escutismo"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay para escurecer a imagem e o texto ficar legível */}
          <div className="absolute inset-0 bg-brand-green/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-50 dark:to-black" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <Image
            src="/logos/1066 LOGO VERTICAL_COR.png"
            alt="Logo Agrupamento 1066 Ribamar"
            width={200}
            height={200}
            className="mb-8 drop-shadow-2xl"
          />

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Agrupamento 1066 Ribamar
          </h1>

          <p className="text-xl md:text-2xl mb-8">
            30 anos – Esperança que Transforma
          </p>

          <div className="flex gap-4">
            <a
              href="#quem-somos"
              className="bg-brand-gold text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-gold-light transition"
            >
              Quem Somos
            </a>
            <a
              href="#atividades"
              className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-brand-green transition"
            >
              Atividades
            </a>
          </div>
        </div>
      </motion.section>

      {/* Cards principais */}
      <main className="max-w-6xl mx-auto px-6 py-20 grid gap-12 md:grid-cols-3">
        <Link href="/quem-somos">
          <motion.div
            id="quem-somos"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center"
          >
            <Image
              src="/IMG_5275.jpg"
              alt="Quem Somos"
              width={100}
              height={100}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-brand-green mb-2">Quem Somos</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Descobre a história do nosso agrupamento, a direção e a equipa de chefes.
            </p>
          </motion.div>
        </Link>

        <Link href="/atividades">
          <motion.div
            id="atividades"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center"
          >
            <Image
              src="/IMG_4965.jpg"
              alt="Atividades"
              width={100}
              height={100}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-brand-green mb-2">Atividades</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Conhece as atividades, acampamentos e eventos da IV Secção Caminheiros.
            </p>
          </motion.div>
        </Link>

        <Link href="/secções">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg text-center"
          >
            <Image
              src="/IMG_4934.jpg"
              alt="Secções"
              width={100}
              height={100}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-brand-green mb-2">Secções</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Explora todas as secções do nosso agrupamento, do Lobito ao Clã Caminheiros.
            </p>
          </motion.div>
        </Link>
      </main>

      {/* Seção de contato / convite */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="bg-green-50 dark:bg-gray-800 py-20 text-center rounded-t-3xl"
      >
        <h2 className="text-3xl font-bold text-brand-green mb-4">Junta-te a nós!</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto">
          Vem conhecer o Agrupamento 1066 Ribamar e participar nas nossas atividades.
        </p>
        <a
          href="/contactos"
          className="bg-brand-green text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-green-dark transition"
        >
          Contacta-nos
        </a>
      </motion.section>
    </div>

  );
}

