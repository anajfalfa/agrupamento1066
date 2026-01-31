"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaBox,
    FaPlus,
    FaMinus,
    FaSearch,
    FaCheck,
    FaSpinner,
    FaArrowLeft,
    FaShoppingBasket
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewRequestPage() {
    const [inventory, setInventory] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});
    const [details, setDetails] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const response = await fetch("/api/admin/inventory");
            const data = await response.json();
            if (Array.isArray(data)) setInventory(data);
        } catch (error) {
            console.error("Failed to fetch inventory", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateQuantity = (id: string, delta: number) => {
        const current = selectedItems[id] || 0;
        const item = inventory.find(i => i.id === id);
        if (!item) return;

        const next = Math.max(0, Math.min(item.quantity, current + delta));

        setSelectedItems(prev => {
            if (next === 0) {
                const { [id]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [id]: next };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (Object.keys(selectedItems).length === 0) return alert("Seleciona pelo menos um item.");

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "MATERIAL",
                    details,
                    items: Object.entries(selectedItems).map(([id, qty]) => ({ id, quantity: qty })),
                }),
            });

            if (response.ok) {
                router.push("/dashboard");
            } else {
                alert("Erro ao enviar pedido.");
            }
        } catch (error) {
            alert("Erro de conexão.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredInventory = inventory.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) && item.quantity > 0
    );

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-6 md:p-12">
            <div className="max-w-5xl mx-auto space-y-8">
                <header>
                    <Link href="/dashboard" className="text-sm font-bold text-brand-green flex items-center gap-2 mb-4 hover:underline">
                        <FaArrowLeft /> Voltar ao Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Novo Pedido de Material</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Escolhe os itens que precisas para a tua atividade ou acampamento.
                    </p>
                </header>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Inventory Selection */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="relative">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Procurar material disponível..."
                                className="w-full pl-10 pr-4 py-4 bg-white dark:bg-zinc-900 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-brand-green outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {isLoading ? (
                            <div className="py-20 flex flex-col items-center justify-center text-gray-400 gap-4">
                                <FaSpinner className="animate-spin text-4xl text-brand-green" />
                                <p>A carregar inventário...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {filteredInventory.map(item => (
                                    <div key={item.id} className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 flex justify-between items-center group">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 dark:text-white">{item.name}</h3>
                                            <p className="text-xs text-gray-500">{item.quantity} disponíveis</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="w-8 h-8 rounded-full bg-gray-50 dark:bg-zinc-800 flex items-center justify-center text-gray-400 hover:text-brand-green transition-all"
                                            >
                                                <FaMinus size={10} />
                                            </button>
                                            <span className="font-bold text-brand-green min-w-[20px] text-center">
                                                {selectedItems[item.id] || 0}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="w-8 h-8 rounded-full bg-gray-50 dark:bg-zinc-800 flex items-center justify-center text-gray-400 hover:text-brand-green transition-all"
                                            >
                                                <FaPlus size={10} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Checkout / Details */}
                    <div className="space-y-6">
                        <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-zinc-800 sticky top-24">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <FaShoppingBasket className="text-brand-gold" /> O teu Pedido
                            </h2>

                            <div className="space-y-4 mb-6">
                                {Object.entries(selectedItems).length > 0 ? (
                                    Object.entries(selectedItems).map(([id, qty]) => {
                                        const item = inventory.find(i => i.id === id);
                                        return (
                                            <div key={id} className="flex justify-between items-center text-sm">
                                                <span className="text-gray-600 dark:text-gray-400">{item?.name}</span>
                                                <span className="font-bold">x{qty}</span>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-xs italic text-gray-400">Nenhum item selecionado.</p>
                                )}
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                                    Notas Adicionais
                                </label>
                                <textarea
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                    placeholder="Ex: Atividade de secção no próximo fim-de-semana..."
                                    className="w-full p-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl outline-none focus:ring-2 focus:ring-brand-green text-sm h-32"
                                />

                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || Object.keys(selectedItems).length === 0}
                                    className="w-full bg-brand-green text-white font-bold py-4 rounded-2xl shadow-lg shadow-brand-green/20 hover:bg-brand-green-dark transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isSubmitting ? <FaSpinner className="animate-spin" /> : <>Submeter Pedido <FaCheck /></>}
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
