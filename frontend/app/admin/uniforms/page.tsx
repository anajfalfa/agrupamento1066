"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaTshirt,
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaExclamationTriangle,
    FaSpinner,
    FaTimes,
    FaCheck,
    FaArrowLeft
} from "react-icons/fa";
import Link from "next/link";

export default function UniformManagement() {
    const [items, setItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "UNIFORM",
        size: "",
        quantity: "0",
        minQuantity: "0",
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/admin/inventory?category=UNIFORM");
            const data = await response.json();
            if (Array.isArray(data)) setItems(data);
        } catch (error) {
            console.error("Failed to fetch uniform inventory", error);
        } finally {
            setIsLoading(false);
        }
    };

    const openAddModal = () => {
        setEditingItem(null);
        setFormData({
            name: "",
            description: "",
            category: "UNIFORM",
            size: "",
            quantity: "0",
            minQuantity: "0",
        });
        setIsModalOpen(true);
    };

    const openEditModal = (item: any) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            description: item.description || "",
            category: item.category,
            size: item.size || "",
            quantity: item.quantity.toString(),
            minQuantity: item.minQuantity.toString(),
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const method = editingItem ? "PATCH" : "POST";
        const body = editingItem ? { id: editingItem.id, ...formData } : formData;

        try {
            const response = await fetch("/api/admin/inventory", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                setIsModalOpen(false);
                fetchItems();
            } else {
                alert("Erro ao guardar fardamento.");
            }
        } catch (error) {
            alert("Erro de conexão.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Tens a certeza que queres eliminar esta peça?")) return;

        try {
            const response = await fetch("/api/admin/inventory", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                fetchItems();
            }
        } catch (error) {
            alert("Erro ao eliminar peça.");
        }
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.size && item.size.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Link href="/admin" className="text-sm font-bold text-brand-green flex items-center gap-2 mb-2 hover:underline">
                        <FaArrowLeft /> Voltar
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestão de Uniformes</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Banco de fardamento (Economia Solidária).
                    </p>
                </div>
                <button
                    onClick={openAddModal}
                    className="bg-brand-green text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-brand-green/20 hover:bg-brand-green-dark transition-all"
                >
                    <FaPlus /> Adicionar Peça
                </button>
            </header>

            {/* Filters */}
            <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Procurar peças ou tamanhos..."
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-800 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-brand-green outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Grid */}
            {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center text-gray-400 gap-4">
                    <FaSpinner className="animate-spin text-4xl text-brand-green" />
                    <p>A carregar peças...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredItems.map(item => (
                        <motion.div
                            key={item.id}
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-700 relative group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold text-xl">
                                    <FaTshirt />
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => openEditModal(item)}
                                        className="p-2 bg-gray-50 dark:bg-zinc-700 rounded-lg text-gray-500 hover:text-brand-green transition-colors"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="p-2 bg-red-50 dark:bg-red-900/10 rounded-lg text-red-500 hover:bg-red-100 transition-colors"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>

                            <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                            <p className="text-xs text-brand-gold font-bold mb-4 uppercase tracking-tighter">
                                Tamanho: {item.size || "N/A"}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-zinc-700">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Em Stock</p>
                                    <p className={`text-xl font-black ${item.quantity <= item.minQuantity ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
                                        {item.quantity}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white dark:bg-zinc-800 rounded-3xl p-8 max-w-lg w-full shadow-2xl relative"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-full text-gray-400"
                            >
                                <FaTimes />
                            </button>

                            <h2 className="text-2xl font-bold mb-6">
                                {editingItem ? "Editar Peça" : "Adicionar Peça"}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold mb-2">Nome da Peça</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Ex: Camisa Lobito"
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-brand-green"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Tamanho</label>
                                        <input
                                            type="text"
                                            value={formData.size}
                                            onChange={e => setFormData({ ...formData, size: e.target.value })}
                                            placeholder="Ex: 38, S, M..."
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-brand-green"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Stock Atual</label>
                                        <input
                                            type="number"
                                            required
                                            value={formData.quantity}
                                            onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-brand-green"
                                        />
                                    </div>
                                </div>
                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 font-bold py-3 bg-gray-100 dark:bg-zinc-700 rounded-xl hover:bg-gray-200 transition-all"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSaving}
                                        className="flex-1 font-bold py-3 bg-brand-green text-white rounded-xl shadow-lg shadow-brand-green/20 hover:bg-brand-green-dark transition-all flex items-center justify-center gap-2"
                                    >
                                        {isSaving ? <FaSpinner className="animate-spin" /> : <>{editingItem ? "Atualizar" : "Adicionar"} <FaCheck /></>}
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
