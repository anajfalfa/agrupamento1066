"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaShoppingBag,
    FaSearch,
    FaCheck,
    FaSpinner,
    FaArrowLeft,
    FaInfoCircle,
    FaCartPlus,
    FaBook,
    FaTshirt,
    FaCampground,
    FaGift
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CATEGORIES = [
    { id: "all", label: "Tudo", icon: <FaShoppingBag /> },
    { id: "UNIFORM", label: "Fardamento", icon: <FaTshirt /> },
    { id: "LITERATURE", label: "Literatura", icon: <FaBook /> },
    { id: "CAMPING", label: "Material", icon: <FaCampground /> },
    { id: "GIFTS", label: "Prendas", icon: <FaGift /> },
];

export default function DMFShopPage() {
    const [items, setItems] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [cart, setCart] = useState<{ [key: string]: number }>({});
    const [details, setDetails] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchShopItems();
    }, []);

    const fetchShopItems = async () => {
        try {
            const response = await fetch("/api/admin/inventory");
            const data = await response.json();
            if (Array.isArray(data)) {
                // In a real app, DMF shop items might be flagged differently.
                // For now, we'll use items from specific categories or marked for shop.
                setItems(data.filter(i => ["UNIFORM", "LITERATURE", "CAMPING", "GIFTS"].includes(i.category)));
            }
        } catch (error) {
            console.error("Failed to fetch shop items", error);
        } finally {
            setIsLoading(false);
        }
    };

    const addToCart = (id: string) => {
        setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    };

    const removeFromCart = (id: string) => {
        setCart(prev => {
            if (!prev[id]) return prev;
            const next = { ...prev };
            if (next[id] === 1) delete next[id];
            else next[id] -= 1;
            return next;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (Object.keys(cart).length === 0) return alert("O carrinho está vazio.");

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/requests", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "DMF_ORDER",
                    details: `Encomenda DMF: ${details}`,
                    items: Object.entries(cart).map(([id, qty]) => ({ id, quantity: qty })),
                }),
            });

            if (response.ok) {
                router.push("/dashboard");
            } else {
                alert("Erro ao enviar encomenda.");
            }
        } catch (error) {
            alert("Erro de conexão.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-6 md:p-12">
            <div className="max-w-7xl mx-auto space-y-8">
                <header>
                    <Link href="/dashboard" className="text-sm font-bold text-brand-green flex items-center gap-2 mb-4 hover:underline">
                        <FaArrowLeft /> Voltar ao Dashboard
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Encomendas DMF</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Encomenda material oficial do Depósito de Material e Fardamento.
                            </p>
                        </div>
                        <div className="hidden md:flex bg-white dark:bg-zinc-900 px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 items-center gap-3">
                            <span className="text-sm font-medium text-gray-500 italic">Parceiro oficial:</span>
                            <span className="font-black text-brand-green tracking-tighter">DMF.ESCUTISMO.PT</span>
                        </div>
                    </div>
                </header>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Catalog Section */}
                    <div className="flex-1 space-y-6">
                        {/* Search and Categories */}
                        <div className="space-y-4">
                            <div className="relative">
                                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="O que procuras?"
                                    className="w-full pl-10 pr-4 py-4 bg-white dark:bg-zinc-900 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-brand-green outline-none"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${selectedCategory === cat.id
                                            ? "bg-brand-green text-white shadow-lg shadow-brand-green/20"
                                            : "bg-white dark:bg-zinc-900 text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800"
                                            }`}
                                    >
                                        {cat.icon} {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="py-20 flex flex-col items-center justify-center text-gray-400 gap-4">
                                <FaSpinner className="animate-spin text-4xl text-brand-green" />
                                <p>A carregar catálogo...</p>
                            </div>
                        ) : filteredItems.length === 0 ? (
                            <div className="bg-white dark:bg-zinc-900 p-20 rounded-3xl text-center border-2 border-dashed border-gray-100 dark:border-zinc-800">
                                <FaShoppingBag className="mx-auto text-5xl text-gray-200 mb-4" />
                                <p className="text-gray-500">Nenhum item encontrado nesta categoria.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredItems.map(item => (
                                    <motion.div
                                        key={item.id}
                                        whileHover={{ y: -5 }}
                                        className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 flex flex-col justify-between group"
                                    >
                                        <div>
                                            <div className="w-full aspect-square bg-gray-50 dark:bg-zinc-800 rounded-2xl mb-4 flex items-center justify-center text-4xl text-gray-200 group-hover:text-brand-green transition-colors overflow-hidden">
                                                {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" /> : CATEGORIES.find(c => c.id === item.category)?.icon || <FaShoppingBag />}
                                            </div>
                                            <h3 className="font-bold text-gray-900 dark:text-white mb-1">{item.name}</h3>
                                            <p className="text-xs text-gray-500 line-clamp-2 mb-4">{item.description || "Referência oficial DMF."}</p>
                                        </div>
                                        <button
                                            onClick={() => addToCart(item.id)}
                                            className="w-full py-3 bg-gray-50 dark:bg-zinc-800 hover:bg-brand-green hover:text-white text-brand-green rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                                        >
                                            <FaCartPlus /> Adicionar
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Cart Section */}
                    <div className="w-full lg:w-96 space-y-6">
                        <section className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-800 sticky top-24">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <FaShoppingBag className="text-brand-gold" /> Carrinho
                            </h2>

                            <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin">
                                {Object.entries(cart).length > 0 ? (
                                    Object.entries(cart).map(([id, qty]) => {
                                        const item = items.find(i => i.id === id);
                                        return (
                                            <div key={id} className="flex justify-between items-center group">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-gray-800 dark:text-zinc-200">{item?.name}</span>
                                                    <span className="text-[10px] text-gray-500 uppercase">{item?.category}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <button onClick={() => removeFromCart(id)} className="w-6 h-6 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-xs hover:bg-red-50 hover:text-red-500 transition-colors">-</button>
                                                    <span className="font-bold text-sm w-4 text-center">{qty}</span>
                                                    <button onClick={() => addToCart(id)} className="w-6 h-6 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-xs hover:bg-brand-green hover:text-white transition-colors">+</button>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-10 opacity-30 text-xs italic">O carrinho está vazio.</div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <FaInfoCircle className="text-brand-green" /> Notas para o Chefe
                                </label>
                                <textarea
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                    placeholder="Indica tamanhos ou especificações extras..."
                                    className="w-full p-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-brand-green text-sm h-28 transition-all"
                                />

                                <div className="p-4 bg-brand-gold/5 rounded-2xl border border-brand-gold/10 text-[10px] text-brand-gold-dark dark:text-brand-gold font-medium leading-relaxed">
                                    ⚠️ Os pedidos via sistema são processados pelo Agrupamento. O pagamento será solicitado após validação do stock no DMF.
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || Object.keys(cart).length === 0}
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
