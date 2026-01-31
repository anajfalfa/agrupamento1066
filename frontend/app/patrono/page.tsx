"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function PatronoPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans pb-20">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative py-24 px-6 bg-gradient-to-b from-brand-gold to-brand-gold-dark text-white text-center overflow-hidden"
            >
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Os Nossos Patronos</h1>
                    <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
                        Figuras que nos inspiram e guiam na nossa caminhada escutista e espiritual.
                    </p>
                </div>
            </motion.section>

            <main className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">

                {/* Padroeira do Agrupamento */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden mb-16"
                >
                    <div className="grid md:grid-cols-2">
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <span className="text-brand-gold font-bold uppercase tracking-widest text-sm mb-2">Padroeira da Paróquia de Ribamar</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Nossa Senhora de Montserrat</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                                Embora não seja o patrono oficial do CNE, Nossa Senhora de Montserrat é a figura central da nossa comunidade local e paroquial.
                                Ela representa o acolhimento maternal e a proteção que guia todos os escuteiros do Agrupamento 1066.
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>🕊️ Paz</span>
                                <span>⛪ Fé</span>
                                <span>🛡️ Proteção</span>
                            </div>
                        </div>
                        <div className="relative h-64 md:h-auto bg-gray-100 dark:bg-zinc-800">
                            <Image
                                src="/padroeira.png"
                                alt="Nossa Senhora de Montserrat"
                                fill
                                className="object-cover p-8"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Patronos do CNE */}
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold text-brand-green mb-8">Patronos do CNE</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border-t-4 border-red-600"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold text-xl">SG</div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">São Jorge</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                            O Patrono Mundial do Escutismo. Exemplo de coragem, cavalaria e lealdade.
                            A sua lenda lembra-nos que devemos estar sempre prontos para enfrentar as dificuldades e vencer o mal com o bem.
                        </p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-lg border-t-4 border-brand-green"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-green-100 text-brand-green rounded-full flex items-center justify-center font-bold text-xl">NA</div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">São Nuno de Santa Maria</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                            (Nuno Álvares Pereira) Patrono do Corpo Nacional de Escutas. Heroico Condestável de Portugal que trocou a espada pela oração,
                            sendo exemplo de serviço à Pátria e a Deus.
                        </p>
                    </motion.div>
                </div>

            </main>
        </div>
    );
}
