"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaHome,
    FaCalendarAlt,
    FaPlus,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaEuroSign,
    FaMapMarkerAlt,
    FaChevronRight,
    FaInfoCircle
} from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function ReservationsPage() {
    const { data: session } = useSession();
    const [reservations, setReservations] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        type: "SEDE",
        location: "Sede de Agrupamento"
    });

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/reservations");
            const data = await response.json();
            setReservations(data);
        } catch (error) {
            console.error("Error fetching reservations", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/reservations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setShowModal(false);
                fetchReservations();
                setFormData({
                    title: "",
                    description: "",
                    startDate: "",
                    endDate: "",
                    type: "SEDE",
                    location: "Sede de Agrupamento"
                });
            }
        } catch (error) {
            console.error("Error creating reservation", error);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "APPROVED": return "text-brand-green bg-brand-green/10";
            case "REJECTED": return "text-red-500 bg-red-500/10";
            case "PENDING": return "text-brand-gold bg-brand-gold/10";
            default: return "text-gray-400 bg-gray-100";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "APPROVED": return <FaCheckCircle />;
            case "REJECTED": return <FaTimesCircle />;
            case "PENDING": return <FaClock />;
            default: return null;
        }
    };

    const getTypeName = (type: string) => {
        switch (type) {
            case "SEDE": return "Reserva de Sede";
            case "ACANTONAMENTO": return "Acantonamento";
            case "ACAMPAMENTO": return "Acampamento";
            default: return type;
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-6 md:p-12">
            <div className="max-w-7xl mx-auto space-y-12">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Reservas & Atividades</h1>
                        <p className="text-gray-500 dark:text-gray-400">Gere as tuas reservas de sede e participações em atividades.</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-brand-green text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-brand-green/20 hover:bg-brand-green-dark transition-all flex items-center justify-center gap-2"
                    >
                        <FaPlus /> Nova Reserva
                    </button>
                </header>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main List */}
                    <div className="lg:col-span-2 space-y-4">
                        {isLoading ? (
                            <div className="flex justify-center p-20">
                                <div className="w-10 h-10 border-4 border-brand-green border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : reservations.length === 0 ? (
                            <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-20 text-center border border-gray-100 dark:border-zinc-800">
                                <FaHome size={48} className="mx-auto text-gray-200 mb-4" />
                                <h3 className="text-xl font-bold text-gray-400">Sem reservas</h3>
                                <p className="text-gray-500 mt-2">Ainda não efetuaste nenhuma reserva.</p>
                            </div>
                        ) : (
                            reservations.map((res) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={res.id}
                                    className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-3xl text-brand-green flex-shrink-0">
                                            {res.type === 'SEDE' ? <FaHome /> : <FaCalendarAlt />}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${getStatusColor(res.status)} flex items-center gap-1`}>
                                                    {getStatusIcon(res.status)} {res.status}
                                                </span>
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{getTypeName(res.type)}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{res.title}</h3>
                                            <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                                                <span className="flex items-center gap-1"><FaCalendarAlt /> {new Date(res.startDate).toLocaleDateString()}</span>
                                                <span className="flex items-center gap-1"><FaMapMarkerAlt /> {res.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {res.payments && res.payments.length > 0 && (
                                            <div className="bg-gray-50 dark:bg-zinc-800 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                                                <FaEuroSign className="text-brand-gold" />
                                                <span className={res.payments[0].status === 'PAID' ? 'text-brand-green' : 'text-brand-gold'}>
                                                    {res.payments[0].status === 'PAID' ? 'Pago' : 'Pendete'}
                                                </span>
                                            </div>
                                        )}
                                        <button className="text-gray-400 hover:text-brand-green transition-all p-3 border border-gray-50 dark:border-zinc-800 rounded-2xl">
                                            <FaChevronRight />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-sm border border-gray-100 dark:border-zinc-800">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <FaInfoCircle className="text-brand-gold" /> Regras de Reserva
                            </h3>
                            <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                                <li className="flex gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0" />
                                    As reservas de sede devem ser feitas com pelo menos 48h de antecedência.
                                </li>
                                <li className="flex gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2 flex-shrink-0" />
                                    Atividades de secção requerem aprovação do Chefe de Unidade.
                                </li>
                                <li className="flex gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 flex-shrink-0" />
                                    Pagamentos de acampamentos podem ser feitos via MBWay na recepção.
                                </li>
                            </ul>
                        </div>

                        <div className="bg-brand-green/5 rounded-[2.5rem] p-8 border border-brand-green/10">
                            <FaEuroSign size={32} className="text-brand-green mb-4" />
                            <h4 className="font-bold text-brand-green text-lg mb-2">Estado Financeiro</h4>
                            <p className="text-xs text-brand-green/70">Consulta os teus pagamentos pendentes e histórico de contribuições para atividades.</p>
                            <button className="mt-6 w-full bg-brand-green text-white py-3 rounded-2xl font-bold text-sm shadow-lg shadow-brand-green/10">
                                Ver Pagamentos
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Reserva */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-[2.5rem] p-8 relative z-10 shadow-2xl overflow-hidden"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black">Nova Reserva</h2>
                                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 transition-all p-2 bg-gray-50 dark:bg-zinc-800 rounded-xl">
                                    <FaTimesCircle />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Título da Atividade</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-gray-50 dark:bg-zinc-800 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand-green transition-all"
                                            placeholder="Ex: Reunião de Patrulha Raposa"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Tipo</label>
                                        <select
                                            className="w-full bg-gray-50 dark:bg-zinc-800 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand-green transition-all appearance-none"
                                            value={formData.type}
                                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        >
                                            <option value="SEDE">Sede</option>
                                            <option value="ACANTONAMENTO">Acantonamento</option>
                                            <option value="ACAMPAMENTO">Acampamento</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Local</label>
                                        <input
                                            type="text"
                                            className="w-full bg-gray-50 dark:bg-zinc-800 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand-green transition-all"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Data Início</label>
                                        <input
                                            type="datetime-local"
                                            required
                                            className="w-full bg-gray-50 dark:bg-zinc-800 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand-green transition-all"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Data Fim</label>
                                        <input
                                            type="datetime-local"
                                            required
                                            className="w-full bg-gray-50 dark:bg-zinc-800 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand-green transition-all"
                                            value={formData.endDate}
                                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Descrição / Notas</label>
                                        <textarea
                                            rows={3}
                                            className="w-full bg-gray-50 dark:bg-zinc-800 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand-green transition-all resize-none"
                                            placeholder="Detalhes adicionais..."
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-brand-green text-white font-black py-4 rounded-2xl shadow-xl shadow-brand-green/20 hover:scale-[1.02] transition-all"
                                    >
                                        Submeter Pedido
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
