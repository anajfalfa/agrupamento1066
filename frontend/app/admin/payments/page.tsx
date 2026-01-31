"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaCheck,
    FaEuroSign,
    FaUser,
    FaInfoCircle,
    FaFilter,
    FaSearch,
    FaClock,
    FaHistory
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import { isLeader } from "@/lib/auth-utils";

export default function AdminPayments() {
    const { data: session } = useSession();
    const [payments, setPayments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("ALL");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/payments");
            const data = await response.json();
            setPayments(data);
        } catch (error) {
            console.error("Error fetching payments", error);
        } finally {
            setIsLoading(false);
        }
    };

    const markAsPaid = async (id: string) => {
        if (!confirm("Confirmar que este pagamento foi recebido?")) return;

        try {
            const response = await fetch("/api/payments", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: "PAID", paidAt: new Date().toISOString() }),
            });
            if (response.ok) {
                fetchPayments();
            }
        } catch (error) {
            console.error("Error updating payment status", error);
        }
    };

    const filteredPayments = payments.filter(p => {
        const matchesFilter = filter === "ALL" || p.status === filter;
        const matchesSearch = p.user.name.toLowerCase().includes(search.toLowerCase()) ||
            (p.reservation?.title || "").toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

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
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Gestão de Pagamentos</h1>
                        <p className="text-gray-500 dark:text-gray-400">Controlo de contribuições para atividades e reservas.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Procurar por nome ou título..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-12 pr-4 py-3 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm outline-none focus:ring-2 focus:ring-brand-green w-64 text-sm"
                            />
                        </div>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="px-4 py-3 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm outline-none focus:ring-2 focus:ring-brand-green font-bold text-sm"
                        >
                            <option value="ALL">Todos os Estados</option>
                            <option value="PENDING">Pendentes</option>
                            <option value="PAID">Pagos</option>
                        </select>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ReportCard title="Total Pendente" amount={payments.filter(p => p.status === 'PENDING').reduce((acc, p) => acc + p.amount, 0)} color="text-brand-gold" icon={<FaClock />} />
                    <ReportCard title="Total Recebido" amount={payments.filter(p => p.status === 'PAID').reduce((acc, p) => acc + p.amount, 0)} color="text-brand-green" icon={<FaCheck />} />
                    <ReportCard title="Transações" amount={payments.length} color="text-gray-500" icon={<FaHistory />} isCount />
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {isLoading ? (
                        <div className="flex justify-center p-20">
                            <div className="w-10 h-10 border-4 border-brand-green border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : filteredPayments.length === 0 ? (
                        <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-20 text-center border border-gray-100 dark:border-zinc-800">
                            <FaEuroSign size={48} className="mx-auto text-gray-200 mb-4" />
                            <h3 className="text-xl font-bold text-gray-400">Sem registos encontrados</h3>
                        </div>
                    ) : (
                        filteredPayments.map((p) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                key={p.id}
                                className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-all"
                            >
                                <div className="flex items-center gap-6 flex-1">
                                    <div className="w-14 h-14 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-2xl text-brand-gold">
                                        <FaEuroSign />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${p.status === 'PAID' ? 'bg-brand-green/10 text-brand-green' : 'bg-brand-gold/10 text-brand-gold'
                                                }`}>
                                                {p.status}
                                            </span>
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{p.method || "N/A"}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                            {p.amount.toFixed(2)}€ - <span className="text-gray-500 font-medium">{p.user.name}</span>
                                        </h3>
                                        <p className="text-xs text-gray-400 flex items-center gap-2">
                                            <FaInfoCircle /> {p.reservation?.title || "Contribuição Geral"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right hidden md:block">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Data de Criação</p>
                                        <p className="text-xs font-bold">{new Date(p.createdAt).toLocaleDateString()}</p>
                                    </div>

                                    {p.status === 'PENDING' ? (
                                        <button
                                            onClick={() => markAsPaid(p.id)}
                                            className="bg-brand-green text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-brand-green-dark transition-all flex items-center gap-2 shadow-lg shadow-brand-green/10"
                                        >
                                            <FaCheck /> Confirmar Pagamento
                                        </button>
                                    ) : (
                                        <div className="flex items-center gap-2 text-brand-green font-bold text-sm bg-brand-green/5 px-6 py-3 rounded-2xl border border-brand-green/10">
                                            <FaHistory /> Pago em {new Date(p.paidAt).toLocaleDateString()}
                                        </div>
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

function ReportCard({ title, amount, color, icon, isCount }: any) {
    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
            <div className={`p-3 rounded-xl ${color === 'text-brand-green' ? 'bg-brand-green/10' : color === 'text-brand-gold' ? 'bg-brand-gold/10' : 'bg-gray-100 dark:bg-zinc-800'} w-fit mb-4`}>
                {icon}
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</p>
            <p className={`text-2xl font-black ${color}`}>{isCount ? amount : `${amount?.toFixed(2)}€`}</p>
        </div>
    );
}
