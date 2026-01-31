"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalculator, FaChevronRight, FaInfoCircle } from "react-icons/fa";

export default function SectionCalculator() {
    const [birthDate, setBirthDate] = useState("");
    const [result, setResult] = useState<any>(null);

    const calculateSection = (e: React.FormEvent) => {
        e.preventDefault();
        if (!birthDate) return;

        const birth = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        let section = "";
        let color = "";
        let desc = "";

        if (age >= 6 && age < 10) {
            section = "Lobitos";
            color = "bg-[#ffe066] text-zinc-900";
            desc = "A I Secção é para crianças dos 6 aos 10 anos. O seu lema é 'Da Melhor Vontade'.";
        } else if (age >= 10 && age < 14) {
            section = "Exploradores";
            color = "bg-[#006738] text-white";
            desc = "A II Secção é para jovens dos 10 aos 14 anos. O seu lema é 'Sempre Alerta'.";
        } else if (age >= 14 && age < 18) {
            section = "Pioneiros";
            color = "bg-[#00599c] text-white";
            desc = "A III Secção é para jovens dos 14 aos 18 anos. O seu lema é 'Sempre Alerta'.";
        } else if (age >= 18 && age < 22) {
            section = "Caminheiros";
            color = "bg-[#e4022d] text-white";
            desc = "A IV Secção é para jovens dos 18 aos 22 anos. O seu lema é 'Servir'.";
        } else if (age >= 22) {
            section = "Dirigente / Adulto";
            color = "bg-zinc-800 text-white";
            desc = "Com mais de 22 anos, podes juntar-te a nós como Dirigente!";
        } else {
            section = "Ainda é muito cedo!";
            color = "bg-gray-100 text-gray-500";
            desc = "O escutismo no CNE começa aos 6 anos. Esperamos por ti em breve!";
        }

        setResult({ section, color, desc, age });
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-zinc-800">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-brand-green/10 rounded-2xl flex items-center justify-center text-brand-green text-xl">
                    <FaCalculator />
                </div>
                <div>
                    <h3 className="text-xl font-bold">Calculadora de Secção</h3>
                    <p className="text-sm text-gray-500">Descobre a tua secção baseada na idade.</p>
                </div>
            </div>

            <form onSubmit={calculateSection} className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Data de Nascimento
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="date"
                            required
                            className="flex-1 bg-gray-50 dark:bg-zinc-800 border-none rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand-green transition-all"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-brand-green text-white px-6 rounded-2xl font-bold hover:bg-brand-green-dark transition-all flex items-center gap-2"
                        >
                            Calcular <FaChevronRight />
                        </button>
                    </div>
                </div>
            </form>

            <AnimatePresence mode="wait">
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-8 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Resultado ({result.age} anos)</p>
                                <h4 className={`text-2xl font-black px-4 py-1 rounded-xl inline-block ${result.color}`}>
                                    {result.section}
                                </h4>
                            </div>
                            <div className="flex-1 md:max-w-xs">
                                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                    <FaInfoCircle className="mt-1 flex-shrink-0 text-brand-green" />
                                    {result.desc}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
