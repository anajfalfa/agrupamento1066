"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaCheck,
    FaTimes,
    FaHome,
    FaCalendarAlt,
    FaUser,
    FaInfoCircle,
    FaEuroSign,
    FaExclamationTriangle
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import { isLeader, getRoleDisplayName } from "@/lib/auth-utils";

export default function AdminReservations() {
    const { data: session } = useSession();
    const [reservations, setReservations] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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

    const updateStatus = async (id: string, status: string) => {
        if (!confirm(`Tem a certeza que deseja ${status === 'APPROVED' ? 'aprovar' : 'rejeitar'} esta reserva?`)) return;

        try {
            const response = await fetch("/api/reservations", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });
            if (response.ok) {
                fetchReservations();
            }
        } catch (error) {
            console.error("Error updating reservation status", error);
        }
    };

    if (!session || !isLeader(session.user as any)) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500 font-bold">Acesso restrito a Dirigentes.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-6 md:p-12">
            <div className="max-w-7xl mx-auto space-y-12">
                <header>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white">Gestão de Reservas</h1>
                    <p className="text-gray-500 dark:text-gray-400">Aprovação de sede, acantonamentos e acampamentos.</p>
                </header>

                <div className="grid grid-cols-1 gap-6">
                    {isLoading ? (
                        <div className="flex justify-center p-20">
                            <div className="w-10 h-10 border-4 border-brand-green border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : reservations.length === 0 ? (
                        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-20 text-center border border-gray-100 dark:border-zinc-800">
                            <FaCalendarAlt size={48} className="mx-auto text-gray-200 mb-4" />
                            <h3 className="text-xl font-bold text-gray-400">Sem pedidos pendentes</h3>
                        </div>
                    ) : (
                        reservations.map((res) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                key={res.id}
                                className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row gap-8 items-start hover:shadow-md transition-all"
                            >
                                <div className="w-16 h-16 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-3xl text-brand-green flex-shrink-0">
                                    {res.type === 'SEDE' ? <FaHome /> : <FaCalendarAlt />}
                                </div>

                                <div className="flex-1 space-y-4">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${res.status === 'PENDING' ? 'bg-brand-gold/10 text-brand-gold' :
                                                res.status === 'APPROVED' ? 'bg-brand-green/10 text-brand-green' : 'bg-red-500/10 text-red-500'
                                            }`}>
                                            {res.status}
                                        </span>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{res.type}</span>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white">{res.title}</h3>
                                        <p className="text-gray-500 text-sm mt-1">{res.description || "Sem descrição adicional."}</p>
                                    </div>

                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
                                        <InfoItem label="Requisitante" value={res.user.name} icon={<FaUser />} />
                                        <InfoItem label="Início" value={new Date(res.startDate).toLocaleString()} icon={<FaCalendarAlt />} />
                                        <InfoItem label="Fim" value={new Date(res.endDate).toLocaleString()} icon={<FaCalendarAlt />} />
                                        <InfoItem label="Local" value={res.location} icon={<FaInfoCircle />} />
                                    </div>
                                </div>

                                <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                                    {res.status === 'PENDING' ? (
                                        <>
                                            <button
                                                onClick={() => updateStatus(res.id, 'APPROVED')}
                                                className="flex-1 bg-brand-green text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-brand-green-dark transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-green/20"
                                            >
                                                <FaCheck /> Aprovar
                                            </button>
                                            <button
                                                onClick={() => updateStatus(res.id, 'REJECTED')}
                                                className="flex-1 bg-red-50 dark:bg-red-900/10 text-red-600 px-6 py-3 rounded-2xl font-black text-sm hover:bg-red-100 transition-all flex items-center justify-center gap-2"
                                            >
                                                <FaTimes /> Rejeitar
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => updateStatus(res.id, 'PENDING')}
                                            className="flex-1 bg-gray-100 dark:bg-zinc-800 text-gray-500 px-6 py-3 rounded-2xl font-black text-sm hover:bg-gray-200 transition-all"
                                        >
                                            Reverter para Pendente
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

function InfoItem({ label, value, icon }: any) {
    return (
        <div className="space-y-1">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                {icon} {label}
            </p>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300">{value}</p>
        </div>
    );
}
