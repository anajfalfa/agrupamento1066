"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaMoon,
    FaPlus,
    FaCheck,
    FaSpinner,
    FaArrowLeft,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaHistory
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function FieldNightsPage() {
    const { data: session } = useSession();
    const [history, setHistory] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    // Form state
    const [formData, setFormData] = useState({
        nights: "1",
        location: "",
        date: new Date().toISOString().split('T')[0],
        description: ""
    });

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await fetch("/api/requests?type=FIELD_NIGHT_VALIDATION");
            const data = await response.json();
            if (Array.isArray(data)) setHistory(data);
        } catch (error) {
            console.error("Failed to fetch field night history", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "FIELD_NIGHT_VALIDATION",
                    details: JSON.stringify(formData),
                    items: [] // No inventory items for this
                }),
            });

            if (response.ok) {
                setIsModalOpen(false);
                fetchHistory();
            } else {
                alert("Erro ao registar noites de campo.");
            }
        } catch (error) {
            alert("Erro de conexão.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const totalValidated = (session?.user as any)?.scoutInfo?.fieldNights || 0;

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-8">
                <header>
                    <Link href="/dashboard" className="text-sm font-bold text-brand-green flex items-center gap-2 mb-4 hover:underline">
                        <FaArrowLeft /> Voltar ao Dashboard
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Noites de Campo</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Regista e valida as tuas dormidas em atividades escutistas.
                            </p>
                        </div>
                        <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800">
                            <div className="w-12 h-12 bg-brand-green/10 rounded-2xl flex items-center justify-center text-brand-green text-xl font-black">
                                {totalValidated}
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Validado</p>
                                <p className="text-sm font-bold">Noites Registadas</p>
                            </div>
                        </div>
                    </div>
                </header>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-brand-green text-white font-bold py-6 rounded-3xl shadow-xl shadow-brand-green/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-3 text-lg"
                >
                    <FaPlus /> Registar Novos Dias
                </button>

                <section className="space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-3">
                        <FaHistory className="text-brand-gold" /> Histórico de Pedidos
                    </h2>

                    {isLoading ? (
                        <div className="py-20 flex flex-col items-center justify-center text-gray-400 gap-4">
                            <FaSpinner className="animate-spin text-4xl text-brand-green" />
                            <p>A carregar registos...</p>
                        </div>
                    ) : history.length === 0 ? (
                        <div className="bg-white dark:bg-zinc-900 p-12 rounded-3xl text-center border-2 border-dashed border-gray-100 dark:border-zinc-800">
                            <FaMoon className="mx-auto text-4xl text-gray-200 mb-4" />
                            <p className="text-gray-500">Ainda não tens nenhum registo de noites de campo.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {history.map(item => {
                                const details = JSON.parse(item.details);
                                return (
                                    <div key={item.id} className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${item.status === 'APPROVED' ? 'bg-green-100 text-green-600' :
                                                    item.status === 'REJECTED' ? 'bg-red-100 text-red-600' :
                                                        'bg-orange-100 text-orange-600'
                                                }`}>
                                                {details.nights}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white capitalize">{details.location || "Local não especificado"}</h4>
                                                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                                    <span className="flex items-center gap-1"><FaCalendarAlt /> {details.date}</span>
                                                    <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-black ${item.status === 'APPROVED' ? 'bg-green-500/10 text-green-500' :
                                                            item.status === 'REJECTED' ? 'bg-red-500/10 text-red-500' :
                                                                'bg-orange-500/10 text-orange-500'
                                                        }`}>
                                                        {item.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>

            {/* Add Nights Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white dark:bg-zinc-900 rounded-3xl p-8 max-w-lg w-full shadow-2xl relative"
                        >
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold">Registar Noites de Campo</h2>
                                <p className="text-sm text-gray-500">Envia para validação pela chefia.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Quantas Noites?</label>
                                        <input
                                            type="number"
                                            required
                                            min="1"
                                            value={formData.nights}
                                            onChange={e => setFormData({ ...formData, nights: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 rounded-2xl outline-none focus:ring-2 focus:ring-brand-green"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Data Início</label>
                                        <input
                                            type="date"
                                            required
                                            value={formData.date}
                                            onChange={e => setFormData({ ...formData, date: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 rounded-2xl outline-none focus:ring-2 focus:ring-brand-green"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-2">Local / Atividade</label>
                                    <div className="relative">
                                        <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Ex: Acampamento de Agrupamento - Évora"
                                            value={formData.location}
                                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-zinc-800 rounded-2xl outline-none focus:ring-2 focus:ring-brand-green"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-2">Descrição (Opcional)</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Detalhes sobre a atividade..."
                                        className="w-full p-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl outline-none focus:ring-2 focus:ring-brand-green text-sm h-32"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 font-bold py-4 bg-gray-100 dark:bg-zinc-800 rounded-2xl hover:bg-gray-200 transition-all"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-brand-green text-white font-bold py-4 rounded-2xl shadow-lg shadow-brand-green/20 hover:bg-brand-green-dark transition-all flex items-center justify-center gap-2"
                                    >
                                        {isSubmitting ? <FaSpinner className="animate-spin" /> : <>Submeter <FaCheck /></>}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
