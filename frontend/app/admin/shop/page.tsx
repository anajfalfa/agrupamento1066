"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaShoppingBag,
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaSpinner,
    FaTimes,
    FaCheck,
    FaArrowLeft,
    FaFilter,
    FaTruckLoading
} from "react-icons/fa";
import Link from "next/link";

export default function DMFManagement() {
    const [items, setItems] = useState<any[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("orders"); // "orders" or "catalog"

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [invRes, reqRes] = await Promise.all([
                fetch("/api/admin/inventory"),
                fetch("/api/requests")
            ]);

            const invData = await invRes.json();
            const reqData = await reqRes.json();

            if (Array.isArray(invData)) {
                setItems(invData.filter(i => ["UNIFORM", "LITERATURE", "CAMPING", "GIFTS"].includes(i.category)));
            }
            if (Array.isArray(reqData)) {
                setOrders(reqData.filter(r => r.type === "DMF_ORDER"));
            }
        } catch (error) {
            console.error("Failed to fetch DMF data", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Link href="/admin" className="text-sm font-bold text-brand-green flex items-center gap-2 mb-2 hover:underline">
                        <FaArrowLeft /> Voltar
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Loja DMF</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Gestão de encomendas e catálogo do Depósito de Material e Fardamento.
                    </p>
                </div>
                <div className="flex gap-2 bg-white dark:bg-zinc-800 p-1 rounded-2xl shadow-sm">
                    <button
                        onClick={() => setActiveTab("orders")}
                        className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'orders' ? 'bg-brand-green text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        Encomendas
                    </button>
                    <button
                        onClick={() => setActiveTab("catalog")}
                        className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'catalog' ? 'bg-brand-green text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        Catálogo
                    </button>
                </div>
            </header>

            {activeTab === "orders" ? (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <FaTruckLoading className="text-brand-gold" /> Pedidos Pendentes
                        </h2>
                        <button className="text-sm font-bold text-brand-green hover:underline flex items-center gap-2">
                            <FaFilter size={12} /> Filtrar por Secção
                        </button>
                    </div>

                    {isLoading ? (
                        <div className="py-20 flex justify-center"><FaSpinner className="animate-spin text-brand-green text-3xl" /></div>
                    ) : orders.length === 0 ? (
                        <div className="bg-white dark:bg-zinc-800 p-20 rounded-3xl text-center border-2 border-dashed border-gray-100 dark:border-zinc-700 text-gray-400">
                            Nenhuma encomenda DMF registada.
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {orders.map(order => (
                                <div key={order.id} className="bg-white dark:bg-zinc-800 p-6 rounded-3xl border border-gray-100 dark:border-zinc-700 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center text-brand-green font-bold">
                                            {order.user?.name?.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 dark:text-white">{order.user?.name}</p>
                                            <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString()} • {order.items?.length || 0} itens</p>
                                        </div>
                                    </div>

                                    <div className="flex-1 max-w-md">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Detalhes</p>
                                        <p className="text-sm text-gray-600 dark:text-zinc-400 line-clamp-1 italic">{order.details?.replace('Encomenda DMF: ', '') || "Sem notas adicionais."}</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${order.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                                                order.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                                                    'bg-orange-100 text-orange-700'
                                            }`}>
                                            {order.status}
                                        </span>
                                        <button className="p-3 bg-gray-50 dark:bg-zinc-700 rounded-xl text-gray-500 hover:text-brand-green transition-all">
                                            <FaEdit />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative flex-1 w-full">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Procurar no catálogo..."
                                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-800 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-brand-green outline-none"
                            />
                        </div>
                        <button className="bg-brand-green text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-brand-green/20 hover:bg-brand-green-dark transition-all w-full md:w-auto">
                            <FaPlus /> Novo Item
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map(item => (
                            <div key={item.id} className="bg-white dark:bg-zinc-800 p-5 rounded-3xl border border-gray-100 dark:border-zinc-700 group hover:shadow-lg transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 bg-gray-50 dark:bg-zinc-900 rounded-lg flex items-center justify-center text-brand-green text-lg">
                                        <FaShoppingBag />
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 text-gray-400 hover:text-brand-green"><FaEdit size={14} /></button>
                                        <button className="p-2 text-gray-400 hover:text-red-500"><FaTrash size={14} /></button>
                                    </div>
                                </div>
                                <h3 className="font-bold text-gray-900 dark:text-white">{item.name}</h3>
                                <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
