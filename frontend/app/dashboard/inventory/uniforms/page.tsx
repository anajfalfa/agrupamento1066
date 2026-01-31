"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaTshirt,
    FaPlus,
    FaMinus,
    FaSearch,
    FaCheck,
    FaSpinner,
    FaArrowLeft,
    FaShoppingBag,
    FaInfoCircle
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UniformBankPage() {
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
            const response = await fetch("/api/admin/inventory?category=UNIFORM");
            const data = await response.json();
            if (Array.isArray(data)) setInventory(data);
        } catch (error) {
            console.error("Failed to fetch uniform inventory", error);
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
        if (Object.keys(selectedItems).length === 0) return alert("Seleciona pelo menos uma peça.");

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "UNIFORM",
                    details: `Pedido de Uniforme: ${details}`,
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
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Banco de Uniformes</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Reutilização de fardamento para todos os escuteiros.
                            </p>
                        </div>
                        <div className="bg-brand-gold/10 text-brand-gold px-4 py-2 rounded-xl text-xs font-bold border border-brand-gold/20 flex items-center gap-2">
                            <FaInfoCircle /> Economia Circular e Solidária
                        </div>
                    </div>
                </header>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="relative">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Procurar peças (camisa, calças, lenço...)"
                                className="w-full pl-10 pr-4 py-4 bg-white dark:bg-zinc-900 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-brand-green outline-none transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {isLoading ? (
                            <div className="py-20 flex flex-col items-center justify-center text-gray-400 gap-4">
                                <FaSpinner className="animate-spin text-4xl text-brand-green" />
                                <p>A carregar peças disponíveis...</p>
                            </div>
                        ) : filteredInventory.length === 0 ? (
                            <div className="bg-white dark:bg-zinc-900 p-20 rounded-3xl text-center border-2 border-dashed border-gray-100 dark:border-zinc-800">
                                <FaTshirt className="mx-auto text-5xl text-gray-200 mb-4" />
                                <p className="text-gray-500">Nenhuma peça encontrada.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {filteredInventory.map(item => (
                                    <div key={item.id} className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 flex justify-between items-center group hover:shadow-md transition-all">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-gray-900 dark:text-white">{item.name}</h3>
                                                {item.size && (
                                                    <span className="px-2 py-0.5 bg-gray-100 dark:bg-zinc-800 text-gray-500 rounded text-[10px] font-bold">
                                                        TAM. {item.size}
                                                    </span>
                                                )}
                                            </div>
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

                    <div className="space-y-6">
                        <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-zinc-800 sticky top-24">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <FaShoppingBag className="text-brand-gold" /> O teu Pedido
                            </h2>

                            <div className="space-y-4 mb-6">
                                {Object.entries(selectedItems).length > 0 ? (
                                    Object.entries(selectedItems).map(([id, qty]) => {
                                        const item = inventory.find(i => i.id === id);
                                        return (
                                            <div key={id} className="flex justify-between items-center text-sm">
                                                <div className="flex flex-col">
                                                    <span className="text-gray-600 dark:text-gray-400 font-medium">{item?.name}</span>
                                                    {item?.size && <span className="text-[10px] text-gray-400">Tamanho: {item.size}</span>}
                                                </div>
                                                <span className="font-bold">x{qty}</span>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-xs italic text-gray-400">Nenhuma peça selecionada.</p>
                                )}
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                                    Notas Adicionais
                                </label>
                                <textarea
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                    placeholder="Ex: Preciso para o meu filho que vai entrar agora..."
                                    className="w-full p-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-green text-sm h-32 transition-all"
                                />

                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || Object.keys(selectedItems).length === 0}
                                    className="w-full bg-brand-green text-white font-bold py-4 rounded-2xl shadow-lg shadow-brand-green/20 hover:bg-brand-green-dark transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isSubmitting ? <FaSpinner className="animate-spin" /> : <>Solicitar Peças <FaCheck /></>}
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
