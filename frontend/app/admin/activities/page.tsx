"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaCalendarAlt,
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaMapMarkerAlt,
    FaSpinner,
    FaTimes,
    FaCheck,
    FaArrowLeft,
    FaUsers
} from "react-icons/fa";
import Link from "next/link";
import { getSectionDisplayName } from "@/lib/auth-utils";

export default function ActivitiesManagement() {
    const [events, setEvents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        location: "",
        section: "",
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            // Need to implement or point to the correct API for events
            const response = await fetch("/api/admin/events"); // Assuming this is the endpoint
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) setEvents(data);
            } else {
                // If API not ready, show empty for now (seeding will handle it if integrated)
                setEvents([]);
            }
        } catch (error) {
            console.error("Failed to fetch events", error);
        } finally {
            setIsLoading(false);
        }
    };

    const openAddModal = () => {
        setEditingEvent(null);
        setFormData({
            title: "",
            description: "",
            startDate: "",
            endDate: "",
            location: "",
            section: "",
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        // API Implementation would go here
        alert("Funcionalidade de guardar atividade em desenvolvimento.");
        setIsSaving(false);
        setIsModalOpen(false);
    };

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Link href="/admin" className="text-sm font-bold text-brand-green flex items-center gap-2 mb-2 hover:underline">
                        <FaArrowLeft /> Voltar
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Atividades e Escalas</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Planeamento e gestão do calendário do agrupamento.
                    </p>
                </div>
                <button
                    onClick={openAddModal}
                    className="bg-brand-green text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-brand-green/20 hover:bg-brand-green-dark transition-all"
                >
                    <FaPlus /> Nova Atividade
                </button>
            </header>

            <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Procurar atividades..."
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-800 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-brand-green outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center text-gray-400 gap-4">
                    <FaSpinner className="animate-spin text-4xl text-brand-green" />
                    <p>A carregar calendário...</p>
                </div>
            ) : filteredEvents.length === 0 ? (
                <div className="bg-white dark:bg-zinc-800 p-20 rounded-3xl text-center border-2 border-dashed border-gray-100 dark:border-zinc-700">
                    <FaCalendarAlt className="mx-auto text-5xl text-gray-200 mb-4" />
                    <p className="text-gray-500">Nenhuma atividade registada.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredEvents.map(event => (
                        <div key={event.id} className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-700 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                            <div className="flex items-center gap-6">
                                <div className="hidden md:flex flex-col items-center justify-center w-16 h-16 bg-brand-green/5 rounded-2xl text-brand-green border border-brand-green/10">
                                    <span className="text-[10px] font-bold uppercase">{new Date(event.startDate).toLocaleString('pt-PT', { month: 'short' })}</span>
                                    <span className="text-xl font-black">{new Date(event.startDate).getDate()}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{event.title}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                        <span className="flex items-center gap-1"><FaMapMarkerAlt className="text-brand-gold" /> {event.location || "Local a definir"}</span>
                                        <span className="flex items-center gap-1"><FaUsers className="text-brand-green" /> {event.section ? getSectionDisplayName(event.section) : "Geral"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-3 bg-gray-50 dark:bg-zinc-700 rounded-xl text-gray-500 hover:text-brand-green transition-all"><FaEdit /></button>
                                <button className="p-3 bg-red-50 dark:bg-red-900/10 rounded-xl text-red-500 hover:bg-red-100 transition-all"><FaTrash /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Mockup */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white dark:bg-zinc-800 rounded-3xl p-8 max-w-lg w-full shadow-2xl relative"
                        >
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-gray-400"><FaTimes /></button>
                            <h2 className="text-2xl font-bold mb-6">Nova Atividade</h2>
                            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                                <div>
                                    <label className="block font-bold mb-1">Título</label>
                                    <input type="text" className="w-full p-3 bg-gray-50 dark:bg-zinc-900 rounded-xl outline-none border-none focus:ring-1 focus:ring-brand-green" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-bold mb-1">Data Início</label>
                                        <input type="date" className="w-full p-3 bg-gray-50 dark:bg-zinc-900 rounded-xl outline-none" />
                                    </div>
                                    <div>
                                        <label className="block font-bold mb-1">Secção</label>
                                        <select className="w-full p-3 bg-gray-50 dark:bg-zinc-900 rounded-xl outline-none">
                                            <option value="">Geral</option>
                                            <option value="LOBITOS">Lobitos</option>
                                            <option value="EXPLORADORES">Exploradores</option>
                                            <option value="PIONEIROS">Pioneiros</option>
                                            <option value="CAMINHEIROS">Caminheiros</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="w-full bg-brand-green text-white font-bold py-4 rounded-2xl mt-4">Criar Atividade</button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
