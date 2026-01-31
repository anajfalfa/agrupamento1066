"use client";

import { motion } from "framer-motion";
import { FaBookOpen, FaCalendarAlt, FaExternalLinkAlt, FaClock } from "react-icons/fa";

export default function JournalPromotion() {
    // This would ideally fetch the latest journal from the database
    // For now, we show the promotion as requested.

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-brand-green to-brand-green-dark rounded-3xl p-8 text-white relative overflow-hidden shadow-xl"
        >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -m-8 opacity-10">
                <FaBookOpen size={200} />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-4xl shadow-inner">
                    <FaBookOpen />
                </div>

                <div className="flex-1 space-y-4 text-center md:text-left">
                    <div>
                        <span className="bg-brand-gold text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                            Publicação Trimestral
                        </span>
                        <h2 className="text-3xl font-black mt-2">Jornal do Agrupamento</h2>
                    </div>

                    <p className="text-brand-green-light font-medium max-w-md">
                        O nosso jornal é publicado de <span className="text-white font-bold">3 em 3 meses</span>, trazendo todas as novidades, aventuras e memórias de cada trimestre.
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                        <div className="flex items-center gap-2 bg-black/10 px-4 py-2 rounded-xl text-xs font-bold border border-white/10">
                            <FaClock className="text-brand-gold" /> Próxima edição em breve
                        </div>
                        <div className="flex items-center gap-2 bg-black/10 px-4 py-2 rounded-xl text-xs font-bold border border-white/10">
                            <FaCalendarAlt className="text-brand-gold" /> Publicação: Jan | Abr | Jul | Out
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 min-w-[200px]">
                    <button
                        disabled
                        className="w-full bg-white/10 border border-white/20 text-white font-bold py-4 px-6 rounded-2xl cursor-not-allowed opacity-50 flex items-center justify-center gap-2 transition-all"
                    >
                        Ficheiro em breve <FaClock />
                    </button>
                    <p className="text-[10px] text-center text-white/50 italic">
                        O ficheiro será disponibilizado pela chefia brevemente.
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
