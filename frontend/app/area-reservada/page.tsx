"use client";

import { motion } from "framer-motion";
import { FaUserShield, FaSignInAlt, FaUserPlus, FaLock } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AreaReservada() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-20 px-4 flex items-center justify-center">
      <div className="text-center max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <FaUserShield className="text-7xl text-brand-green mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-brand-green mb-4">
            Área Reservada
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Acede à tua área pessoal para gerir encomendas, registar noites de campo,
            consultar material e muito mais.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/login">
              <div className="bg-white dark:bg-zinc-800 p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-brand-green group cursor-pointer h-full">
                <FaSignInAlt className="text-6xl text-brand-green mx-auto mb-6 group-hover:scale-110 transition-transform" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Iniciar Sessão
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Já tens conta? Faz login para aceder à tua área pessoal.
                </p>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/signin">
              <div className="bg-white dark:bg-zinc-800 p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-brand-gold group cursor-pointer h-full">
                <FaUserPlus className="text-6xl text-brand-gold mx-auto mb-6 group-hover:scale-110 transition-transform" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Criar Conta
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Novo no sistema? Regista-te para começar a usar a área reservada.
                </p>
              </div>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <FaLock className="text-blue-600 dark:text-blue-400 text-2xl mt-1 flex-shrink-0" />
            <div className="text-left">
              <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">
                Área Segura e Privada
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Esta área é exclusiva para membros do Agrupamento 1066 Ribamar.
                Os teus dados estão protegidos e apenas tu tens acesso à tua informação pessoal.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

