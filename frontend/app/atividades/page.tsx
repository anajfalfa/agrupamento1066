"use client";

import { motion } from "framer-motion";
import { FaCalendarAlt, FaFilePdf, FaClock } from "react-icons/fa";

export default function Atividades() {
  // Calendar from Guia de Pais 25-26 - Helper to group by month
  const activities = [
    { id: 1, date: "4 Outubro", title: "Abertura de ano / Passagens", description: "Início do ano escutista", month: "Outubro 2025" },
    { id: 2, date: "12 Outubro", title: "Eucaristia e Procissão Padroeira", description: "", month: "Outubro 2025" },
    { id: 3, date: "18 Outubro", title: "Fim de semana da família", description: "", month: "Outubro 2025" },
    { id: 4, date: "25 Outubro", title: "Reunião Semanal", description: "", month: "Outubro 2025" },
    { id: 5, date: "1 Novembro", title: "Fim de semana da família", description: "", month: "Novembro 2025" },
    { id: 6, date: "8 Novembro", title: "Reunião Semanal + Eucaristia", description: "", month: "Novembro 2025" },
    { id: 7, date: "15 Novembro", title: "Reunião Semanal / EGO", description: "Encontro de Guias do Oeste (14-16)", month: "Novembro 2025" },
    { id: 8, date: "21 Novembro", title: "Reunião de Pais e EE", description: "", month: "Novembro 2025" },
    { id: 9, date: "22 Novembro", title: "Reunião Semanal", description: "", month: "Novembro 2025" },
    { id: 10, date: "29 Novembro", title: "Noite de Fados", description: "", month: "Novembro 2025" },
    { id: 11, date: "30 Novembro", title: "Banco Alimentar", description: "", month: "Novembro 2025" },
    { id: 12, date: "5-8 Dezembro", title: "Mercado de Natal", description: "", month: "Dezembro 2025" },
    { id: 13, date: "6 Dezembro", title: "Reunião Semanal", description: "", month: "Dezembro 2025" },
    { id: 14, date: "13 Dezembro", title: "Reunião Semanal", description: "", month: "Dezembro 2025" },
    { id: 15, date: "15 Dezembro", title: "Partilha Luz da Paz de Belém", description: "Regional", month: "Dezembro 2025" },
    { id: 16, date: "20-21 Dezembro", title: "Atividade de Natal", description: "", month: "Dezembro 2025" },
    { id: 17, date: "27 Dezembro", title: "Fim de semana da família", description: "", month: "Dezembro 2025" },
    { id: 18, date: "3 Janeiro", title: "Fim de semana da família", description: "", month: "Janeiro 2026" },
    { id: 19, date: "10 Janeiro", title: "Reunião Semanal + Eucaristia", description: "", month: "Janeiro 2026" },
    { id: 20, date: "17 Janeiro", title: "Reunião Semanal", description: "", month: "Janeiro 2026" },
    { id: 21, date: "24 Janeiro", title: "Reunião Semanal", description: "", month: "Janeiro 2026" },
    { id: 22, date: "31 Janeiro", title: "Reunião Semanal + Bolos", description: "", month: "Janeiro 2026" },
    { id: 23, date: "1 Fevereiro", title: "Festival das Sopas", description: "", month: "Fevereiro 2026" },
    { id: 24, date: "7 Fevereiro", title: "Reunião Semanal + Eucaristia", description: "", month: "Fevereiro 2026" },
    { id: 25, date: "14 Fevereiro", title: "Reunião Semanal", description: "", month: "Fevereiro 2026" },
    { id: 26, date: "15 e 17 Fevereiro", title: "Carnaval Ribamar", description: "", month: "Fevereiro 2026" },
    { id: 27, date: "21 Fevereiro", title: "Reunião Semanal", description: "", month: "Fevereiro 2026" },
    { id: 28, date: "22 Fevereiro", title: "Dia de BP", description: "", month: "Fevereiro 2026" },
    { id: 29, date: "28 Fevereiro", title: "Fim de semana da família", description: "", month: "Fevereiro 2026" },
    { id: 30, date: "7 Março", title: "Reunião Semanal + Eucaristia", description: "", month: "Março 2026" },
    { id: 31, date: "14 Março", title: "Reunião Semanal", description: "", month: "Março 2026" },
    { id: 32, date: "21 Março", title: "Reunião Semanal / 1º Enc. ACANUC", description: "Preparação ACANUC", month: "Março 2026" },
    { id: 33, date: "28-29 Março", title: "Atividade Páscoa", description: "", month: "Março 2026" },
    { id: 34, date: "3 Abril", title: "Representação Paixão de Cristo", description: "", month: "Abril 2026" },
    { id: 35, date: "11 Abril", title: "Reunião Semanal", description: "", month: "Abril 2026" },
    { id: 36, date: "18 Abril", title: "São Jorge", description: "", month: "Abril 2026" },
    { id: 37, date: "25 Abril", title: "Fim de semana da família", description: "", month: "Abril 2026" },
    { id: 38, date: "30 Abril - 3 Maio", title: "Expo-Lourinhã", description: "", month: "Maio 2026" },
    { id: 39, date: "9 Maio", title: "Fim de semana da família", description: "", month: "Maio 2026" },
    { id: 40, date: "16 Maio", title: "Reunião Semanal + Eucaristia", description: "", month: "Maio 2026" },
    { id: 41, date: "17 Maio", title: "Trail Rota dos Piratas", description: "", month: "Maio 2026" },
    { id: 42, date: "23 Maio", title: "Reunião Semanal", description: "", month: "Maio 2026" },
    { id: 43, date: "30 Maio", title: "Reunião Semanal", description: "", month: "Maio 2026" },
    { id: 44, date: "4 Junho", title: "Corpo de Deus", description: "", month: "Junho 2026" },
    { id: 45, date: "6 Junho", title: "Reunião + Eucaristia / 2º Enc. ACANUC", description: "", month: "Junho 2026" },
    { id: 46, date: "13 Junho", title: "Fim de semana da família", description: "", month: "Junho 2026" },
    { id: 47, date: "20 Junho", title: "Reunião Semanal", description: "", month: "Junho 2026" },
    { id: 48, date: "27 Junho", title: "Reunião Semanal", description: "", month: "Junho 2026" },
    { id: 49, date: "4 Julho", title: "Reunião Semanal", description: "", month: "Julho 2026" },
    { id: 50, date: "10 Julho", title: "Aniversário", description: "", month: "Julho 2026" },
    { id: 51, date: "11-12 Julho", title: "Celebração 31º Aniversário", description: "", month: "Julho 2026" },
    { id: 52, date: "26-31 Julho", title: "ACANUC", description: "Acampamento de Núcleo", month: "Julho 2026" },
    { id: 53, date: "26-27 Setembro", title: "Peregrinação Nacional a Fátima", description: "", month: "Setembro 2026" }
  ];

  // Group activities by month
  const groupedActivities = activities.reduce((groups, activity) => {
    const month = activity.month;
    if (!groups[month]) {
      groups[month] = [];
    }
    groups[month].push(activity);
    return groups;
  }, {} as Record<string, typeof activities>);

  const months = Object.keys(groupedActivities);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-brand-green mb-6">Atividades</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Acompanha a vida do nosso agrupamento, os nossos planos e horários.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Horário Habitual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg border-t-4 border-brand-green col-span-3"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-brand-green/10 rounded-full text-brand-green">
                <FaClock size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Horário Habitual</h2>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  As nossas atividades regulares decorrem semanalmente:
                </p>
                <div className="text-xl font-bold text-brand-green">
                  Sábados<br />
                  15:00 - 17:30
                </div>
              </div>
              <div className="mt-4 md:mt-0 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700/50 max-w-md">
                <p className="text-sm text-yellow-700 dark:text-yellow-400 flex items-start gap-2">
                  <span>⚠️</span>
                  <span>Salvo indicação em contrário ou atividades de campo.</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Calendar List Grouped by Month */}
        <div className="space-y-12">
          <div className="flex items-center gap-3 mb-8">
            <FaCalendarAlt className="text-brand-green text-2xl" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Calendário de Atividades 2025/2026</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {months.map((month, mIdx) => (
              <motion.div
                key={month}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (mIdx % 2) * 0.1 }}
                className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-zinc-700"
              >
                <div className="bg-brand-green text-white p-4 font-bold text-xl uppercase tracking-wider sticky top-0 z-10">
                  {month}
                </div>
                <div className="divide-y divide-gray-100 dark:divide-zinc-700">
                  {groupedActivities[month].map((activity, idx) => (
                    <div
                      key={activity.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 p-4 md:p-6 hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors"
                    >
                      <div className="col-span-1 md:col-span-4 flex items-center">
                        <div className="flex items-center gap-2 text-brand-gold font-bold text-sm">
                          <span className="md:hidden"><FaCalendarAlt /></span>
                          {activity.date}
                        </div>
                      </div>
                      <div className="col-span-1 md:col-span-8">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{activity.title}</h3>
                        {activity.description && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {activity.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
