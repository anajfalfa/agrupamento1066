"use client";

import { motion } from "framer-motion";
import { FaNewspaper, FaCalendarAlt, FaArrowRight } from "react-icons/fa";

export default function Noticias() {
  const news = [
    {
      id: 1,
      title: "Abertura do Ano Escutista 2024/2025",
      date: "28 Setembro 2024",
      excerpt: "Foi com enorme alegria que iniciámos mais um ano escutista, cheio de desafios e novas aventuras.",
      category: "Agrupamento"
    },
    {
      id: 2,
      title: "Participação no EGO 2024",
      date: "15 Novembro 2024",
      excerpt: "Os nossos guias participaram no Encontro de Guias do Oeste, onde partilharam experiências e aprendizagens.",
      category: "Regional"
    },
    {
      id: 3,
      title: "Magusto de Agrupamento",
      date: "11 Novembro 2024",
      excerpt: "Um momento de partilha e convívio entre todas as secções, celebrando as tradições de São Martinho.",
      category: "Atividades"
    }
  ];

  const journals = [
    {
      id: 1,
      edition: "Edição Outono 2024",
      date: "Outubro 2024",
      cover: "/images/jornal-outono-2024.jpg", // Placeholder
      description: "Destaque para a Abertura do Ano e as Passagens de Secção."
    },
    // Add more quarters here
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-brand-green mb-6">Notícias</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Fica a par de tudo o que acontece no nosso Agrupamento.
          </p>
        </motion.div>

        {/* Jornal Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
            <FaNewspaper className="text-brand-green text-3xl" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Jornal do Agrupamento</h2>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl overflow-hidden border-t-4 border-brand-green">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
              <div className="col-span-1 lg:col-span-1 bg-gray-100 dark:bg-zinc-700 rounded-xl min-h-[300px] flex items-center justify-center relative group cursor-pointer hover:shadow-lg transition-all">
                {/* Fallback for cover image if not exists */}
                <div className="text-center p-6">
                  <FaNewspaper className="text-6xl text-gray-400 mb-4 mx-auto" />
                  <span className="font-bold text-gray-500 block">Capa do Jornal</span>
                </div>

                <div className="absolute inset-0 bg-brand-green/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                  <button className="text-white font-bold border-2 border-white px-6 py-2 rounded-full hover:bg-white hover:text-brand-green transition-colors">
                    Ler Online
                  </button>
                </div>
              </div>

              <div className="col-span-1 lg:col-span-2 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">O Nosso Jornal Trimestral</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                  Três em três meses, lançamos o nosso jornal com os resumos das atividades,
                  entrevistas exclusivas, e as novidades de cada secção. Uma forma de manter
                  toda a comunidade unida e informada.
                </p>

                <div className="space-y-4">
                  {journals.map(journal => (
                    <div key={journal.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-lg border border-gray-100 dark:border-zinc-700">
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white">{journal.edition}</h4>
                        <p className="text-sm text-gray-500">{journal.description}</p>
                      </div>
                      <button className="text-brand-green hover:underline text-sm font-bold whitespace-nowrap">
                        Ver Edição
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <p className="text-sm text-gray-500 italic">
                    Próxima edição prevista: Janeiro 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Latest News Grid */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-l-4 border-brand-gold pl-4">
            Últimas Novidades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-zinc-700 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-xs font-bold uppercase tracking-wide">
                    {item.category}
                  </span>
                  <span className="text-gray-400 text-sm flex items-center gap-1">
                    <FaCalendarAlt size={12} /> {item.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                  {item.excerpt}
                </p>

                <a href="#" className="inline-flex items-center gap-2 text-brand-green font-bold hover:gap-3 transition-all mt-auto">
                  Ler Mais <FaArrowRight size={12} />
                </a>
              </motion.article>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
