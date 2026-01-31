"use client";

import { motion } from "framer-motion";
import Image from "next/image"; // Importação essencial que faltava

export default function Patrono() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-brand-green mb-6">A Nossa Padroeira</h1>
          <h2 className="text-2xl font-semibold text-brand-gold">Nossa Senhora de Montserrat</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose dark:prose-invert"
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Nossa Senhora de Montserrat é a <strong>Padroeira da Paróquia de Ribamar</strong>.
              Embora não seja o patrono oficial do CNE, é a figura que guia e inspira a nossa comunidade local.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              A escolha de Nossa Senhora de Montserrat reflete a identidade e a devoção
              da nossa terra, servindo como exemplo de serviço e humildade para todos
              os escuteiros do 1066.
            </p>
          </motion.div>

          {/* Contentor da Imagem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative h-[500px] w-full overflow-hidden rounded-2xl shadow-2xl border-4 border-white dark:border-zinc-800"
          >
            <Image
              src="/sra_monserrate.png"
              alt="Nossa Senhora de Montserrat"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>

        </div>
      </div>
    </div>
  );
}
