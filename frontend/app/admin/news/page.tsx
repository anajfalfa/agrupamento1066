"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaPlus,
    FaEdit,
    FaTrash,
    FaNewspaper,
    FaSave,
    FaTimes,
    FaImage
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import { isLeader } from "@/lib/auth-utils";

export default function AdminNews() {
    const { data: session } = useSession();
    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingPost, setEditingPost] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        imageUrl: ""
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/admin/news");
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching news", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (post: any = null) => {
        if (post) {
            setEditingPost(post);
            setFormData({
                title: post.title,
                content: post.content,
                imageUrl: post.imageUrl || ""
            });
        } else {
            setEditingPost(null);
            setFormData({ title: "", content: "", imageUrl: "" });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingPost ? "PATCH" : "POST";
        const body = editingPost ? { ...formData, id: editingPost.id } : formData;

        try {
            const response = await fetch("/api/admin/news", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                setShowModal(false);
                fetchPosts();
            }
        } catch (error) {
            console.error("Error saving post", error);
        }
    };

    const deletePost = async (id: string) => {
        if (!confirm("Tem a certeza que deseja eliminar esta notícia?")) return;

        try {
            const response = await fetch(`/api/admin/news?id=${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                fetchPosts();
            }
        } catch (error) {
            console.error("Error deleting post", error);
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
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Gestão de Notícias</h1>
                        <p className="text-gray-500 dark:text-gray-400">Publicação de novidades e avisos para o agrupamento.</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-brand-green text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-brand-green/20 hover:bg-brand-green-dark transition-all flex items-center justify-center gap-2"
                    >
                        <FaPlus /> Nova Notícia
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? (
                        <div className="col-span-full flex justify-center p-20">
                            <div className="w-10 h-10 border-4 border-brand-green border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="col-span-full bg-white dark:bg-zinc-900 rounded-[2rem] p-20 text-center border border-gray-100 dark:border-zinc-800">
                            <FaNewspaper size={48} className="mx-auto text-gray-200 mb-4" />
                            <h3 className="text-xl font-bold text-gray-400">Ainda não há notícias</h3>
                        </div>
                    ) : (
                        posts.map((post) => (
                            <motion.div
                                layout
                                key={post.id}
                                className="bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all group flex flex-col"
                            >
                                {post.imageUrl ? (
                                    <div className="h-48 overflow-hidden relative">
                                        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/20" />
                                    </div>
                                ) : (
                                    <div className="h-48 bg-gray-50 dark:bg-zinc-800 flex items-center justify-center text-4xl text-gray-200">
                                        <FaNewspaper />
                                    </div>
                                )}

                                <div className="p-6 flex-1 space-y-4">
                                    <div>
                                        <span className="text-[10px] font-black text-brand-green uppercase tracking-widest">{new Date(post.publishedAt).toLocaleDateString()}</span>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1 line-clamp-2">{post.title}</h3>
                                    </div>

                                    <p className="text-sm text-gray-500 line-clamp-3 overflow-hidden">{post.content}</p>

                                    <div className="pt-4 border-t border-gray-50 dark:border-zinc-800 flex justify-between items-center text-xs text-gray-400">
                                        <span className="font-bold uppercase tracking-widest">Autor: {post.author.name}</span>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleOpenModal(post)}
                                                className="p-2 text-gray-400 hover:text-brand-green transition-all"
                                            >
                                                <FaEdit size={16} />
                                            </button>
                                            <button
                                                onClick={() => deletePost(post.id)}
                                                className="p-2 text-gray-400 hover:text-red-500 transition-all"
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal */}
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
                            className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-[2.5rem] p-8 relative z-10 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black">{editingPost ? "Editar Notícia" : "Nova Notícia"}</h2>
                                <button onClick={() => setShowModal(false)} className="bg-gray-50 dark:bg-zinc-800 p-2 rounded-xl text-gray-400 hover:text-gray-600 transition-all">
                                    <FaTimes />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Título</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-gray-50 dark:bg-zinc-800 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand-green transition-all"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center justify-between">
                                        Imagem (URL)
                                        <span className="text-[8px] normal-case text-gray-300">Cole o link de uma imagem externa</span>
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            className="flex-1 bg-gray-50 dark:bg-zinc-800 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand-green transition-all"
                                            placeholder="https://..."
                                            value={formData.imageUrl}
                                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        />
                                        <div className="w-14 h-14 bg-gray-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-xl text-gray-300 overflow-hidden border border-gray-100 dark:border-zinc-800">
                                            {formData.imageUrl ? <img src={formData.imageUrl} className="w-full h-full object-cover" /> : <FaImage />}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Conteúdo</label>
                                    <textarea
                                        rows={6}
                                        required
                                        className="w-full bg-gray-50 dark:bg-zinc-800 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-brand-green transition-all resize-none"
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    />
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-brand-green text-white font-black py-4 rounded-2xl shadow-xl shadow-brand-green/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                    >
                                        <FaSave /> {editingPost ? "Guardar Alterações" : "Publicar Notícia"}
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
