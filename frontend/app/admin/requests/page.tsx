"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaClipboardList,
    FaCheck,
    FaTimes,
    FaSpinner,
    FaUser,
    FaBoxOpen,
    FaArrowLeft,
    FaCalendarCheck,
    FaMoon,
    FaShoppingBag
} from "react-icons/fa";
import Link from "next/link";

export default function RequestManagement() {
    const [requests, setRequests] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("PENDING");

    useEffect(() => {
        fetchRequests();
    }, [filterStatus]);

    const fetchRequests = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/requests?status=${filterStatus}`);
            const data = await response.json();
            if (Array.isArray(data)) setRequests(data);
        } catch (error) {
            console.error("Failed to fetch requests", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            const response = await fetch("/api/requests", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });

            if (response.ok) {
                fetchRequests();
            } else {
                const err = await response.json();
                alert(`Erro: ${err.error}`);
            }
        } catch (error) {
            alert("Erro ao atualizar pedido.");
        }
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Link href="/admin" className="text-sm font-bold text-brand-green flex items-center gap-2 mb-2 hover:underline">
                        <FaArrowLeft /> Voltar
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestão de Pedidos</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Rever e aprovar pedidos de material e outras solicitações.
                    </p>
                </div>
                <div className="flex gap-2">
                    {["PENDING", "APPROVED", "REJECTED"].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${filterStatus === status
                                ? (status === 'PENDING' ? 'bg-orange-500 text-white shadow-orange-500/20 shadow-lg' :
                                    status === 'APPROVED' ? 'bg-green-500 text-white shadow-green-500/20 shadow-lg' :
                                        'bg-red-500 text-white shadow-red-500/20 shadow-lg')
                                : "bg-white dark:bg-zinc-800 text-gray-500 hover:bg-gray-50"
                                }`}
                        >
                            {status === 'PENDING' ? 'Pendentes' : status === 'APPROVED' ? 'Aprovados' : 'Rejeitados'}
                        </button>
                    ))}
                </div>
            </header>

            {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center text-gray-400 gap-4">
                    <FaSpinner className="animate-spin text-4xl text-brand-green" />
                    <p>A carregar pedidos...</p>
                </div>
            ) : requests.length === 0 ? (
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-20 text-center border-2 border-dashed border-gray-100 dark:border-zinc-800">
                    <FaClipboardList className="mx-auto text-5xl text-gray-200 mb-4" />
                    <p className="text-gray-500">Não há pedidos {filterStatus.toLowerCase()}neste momento.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {requests.map(request => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={request.id}
                            className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 flex flex-col md:flex-row gap-8 items-start justify-between"
                        >
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-gray-400">
                                        <FaUser size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{request.user.name}</h3>
                                        <p className="text-xs text-brand-green font-bold uppercase tracking-widest">
                                            {request.user.scoutNumber ? `NII: ${request.user.scoutNumber}` : "Sem NII"}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-zinc-800/50 p-6 rounded-2xl space-y-4">
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                        {request.type === 'FIELD_NIGHT_VALIDATION' ? <FaMoon /> :
                                            request.type === 'DMF_ORDER' ? <FaShoppingBag /> : <FaBoxOpen />}
                                        {request.type === 'FIELD_NIGHT_VALIDATION' ? 'Validação de Noites' :
                                            request.type === 'DMF_ORDER' ? 'Encomenda DMF' : 'Itens Solicitados'}
                                    </div>

                                    {request.type === 'FIELD_NIGHT_VALIDATION' ? (
                                        <div className="space-y-2">
                                            {(() => {
                                                try {
                                                    const d = JSON.parse(request.details);
                                                    return (
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Noites</p>
                                                                <p className="text-xl font-bold text-brand-green">{d.nights}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Local</p>
                                                                <p className="text-sm font-bold">{d.location}</p>
                                                            </div>
                                                        </div>
                                                    );
                                                } catch (e) {
                                                    return <p className="text-sm text-red-500">Erro ao processar dados.</p>;
                                                }
                                            })()}
                                        </div>
                                    ) : (
                                        <ul className="space-y-2">
                                            {request.items.map((item: any) => (
                                                <li key={item.id} className="flex justify-between items-center text-sm">
                                                    <div className="flex flex-col">
                                                        <span className="text-gray-600 dark:text-gray-400 font-medium">{item.inventoryItem.name}</span>
                                                        {item.inventoryItem.size && <span className="text-[10px] text-gray-400 uppercase">Tam: {item.inventoryItem.size}</span>}
                                                    </div>
                                                    <span className="font-bold text-brand-green">x{item.quantity}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {request.details && request.type !== 'FIELD_NIGHT_VALIDATION' && (
                                        <div className="pt-4 border-t border-gray-200 dark:border-zinc-700">
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Motivo/Detalhes</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 italic">"{request.details}"</p>
                                        </div>
                                    )}
                                    {request.type === 'FIELD_NIGHT_VALIDATION' && (() => {
                                        try {
                                            const d = JSON.parse(request.details);
                                            if (d.description) return (
                                                <div className="pt-4 border-t border-gray-200 dark:border-zinc-700">
                                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Descrição</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 italic">"{d.description}"</p>
                                                </div>
                                            );
                                        } catch (e) { }
                                    })()}
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-6 justify-between self-stretch">
                                <div className="text-right">
                                    <div className="flex items-center gap-2 text-gray-400 text-xs font-bold justify-end mb-1">
                                        <FaCalendarCheck /> {new Date(request.createdAt).toLocaleDateString()}
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${request.status === 'PENDING' ? 'bg-orange-100 text-orange-600' :
                                        request.status === 'APPROVED' ? 'bg-green-100 text-green-600' :
                                            'bg-red-100 text-red-600'
                                        }`}>
                                        {request.status}
                                    </span>
                                </div>

                                {request.status === 'PENDING' && (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => updateStatus(request.id, 'REJECTED')}
                                            className="px-6 py-2 bg-red-50 dark:bg-red-900/10 text-red-600 rounded-xl font-bold text-sm hover:bg-red-100 transition-all flex items-center gap-2"
                                        >
                                            <FaTimes /> Rejeitar
                                        </button>
                                        <button
                                            onClick={() => updateStatus(request.id, 'APPROVED')}
                                            className="px-6 py-2 bg-brand-green text-white rounded-xl font-bold text-sm hover:bg-brand-green-dark shadow-md shadow-brand-green/20 transition-all flex items-center gap-2"
                                        >
                                            <FaCheck /> Aprovar
                                        </button>
                                    </div>
                                )}

                                {request.status !== 'PENDING' && (
                                    <div className="text-right text-xs text-gray-400">
                                        <p>Revisto por: <span className="font-bold">{request.reviewedBy}</span></p>
                                        <p>{new Date(request.reviewedAt).toLocaleDateString()}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
