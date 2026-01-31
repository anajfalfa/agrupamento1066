"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import AdvancedCalendar from "@/components/AdvancedCalendar";
import SectionCalculator from "@/components/SectionCalculator";
import { FaCalendarAlt, FaInfoCircle, FaLock } from "react-icons/fa";
import Link from "next/link";

export default function CalendarioPage() {
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Public Section */}
        <section className="space-y-8">
          <header className="text-center md:text-left">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">Calendário & Secções</h1>
            <p className="text-gray-500 max-w-2xl">Descobre a tua secção e consulta o plano de atividades do Agrupamento 1066 Ribamar.</p>
          </header>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <SectionCalculator />
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-gray-100 dark:border-zinc-800 shadow-sm">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaInfoCircle className="text-brand-gold" /> Informação Útil
                </h3>
                <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0" />
                    As idades referem-se ao ano civil em que o elemento completa a idade.
                  </li>
                  <li className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0" />
                    As reuniões ocorrem normalmente aos Sábados na Sede do Agrupamento.
                  </li>
                  <li className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 flex-shrink-0" />
                    Faz login para veres o calendário detalhado da tua secção.
                  </li>
                </ul>
              </div>

              {!session && (
                <div className="bg-brand-green/5 p-8 rounded-[2rem] border border-brand-green/10 text-center">
                  <FaLock size={40} className="mx-auto text-brand-green/30 mb-4" />
                  <h4 className="font-bold text-brand-green mb-2">Área Reservada</h4>
                  <p className="text-xs text-brand-green/70 mb-6">Inicia sessão para consultares atividades específicas e o histórico de aniversários.</p>
                  <Link
                    href="/login"
                    className="inline-block bg-brand-green text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-brand-green/20 hover:bg-brand-green-dark transition-all"
                  >
                    Entrar agora
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Private Section (Calendar) */}
        {session ? (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-12 border-t border-gray-100 dark:border-zinc-800"
          >
            <AdvancedCalendar />
          </motion.section>
        ) : (
          <div className="p-20 text-center bg-gray-50/50 dark:bg-zinc-900/50 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-zinc-800">
            <FaCalendarAlt size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-400">Calendário Interno</h3>
            <p className="text-gray-500 max-w-sm mx-auto mt-2">O acesso ao calendário de atividades e aniversários é restrito a membros registados do agrupamento.</p>
          </div>
        )}
      </div>
    </div>
  );
}

