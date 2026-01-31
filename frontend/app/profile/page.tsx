"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
    FaUser,
    FaIdCard,
    FaCalendarAlt,
    FaUsers,
    FaEnvelope,
    FaCamera,
    FaEdit
} from "react-icons/fa";
import { getRoleDisplayName, getSectionDisplayName } from "@/lib/auth-utils";

export default function ProfilePage() {
    const { data: session, status } = useSession();

    const [profile, setProfile] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newBirthDate, setNewBirthDate] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isLoadingProfile, setIsLoadingProfile] = useState(true);

    useEffect(() => {
        if (status === "authenticated") {
            fetchProfile();
        }
    }, [status]);

    const fetchProfile = async () => {
        setIsLoadingProfile(true);
        try {
            const response = await fetch("/api/user/profile");
            const data = await response.json();
            if (response.ok) {
                setProfile(data);
                if (data.scoutInfo?.birthDate) {
                    setNewBirthDate(new Date(data.scoutInfo.birthDate).toISOString().split('T')[0]);
                }
            }
        } catch (error) {
            console.error("Failed to fetch profile", error);
        } finally {
            setIsLoadingProfile(false);
        }
    };

    const handleUpdateBirthDate = async () => {
        setIsSaving(true);
        try {
            const response = await fetch("/api/user/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ birthDate: newBirthDate }),
            });
            if (response.ok) {
                setIsEditing(false);
                fetchProfile(); // Refresh live data
                alert("Data de nascimento atualizada!");
            }
        } catch (error) {
            console.error("Failed to update birthdate", error);
        } finally {
            setIsSaving(false);
        }
    };

    if (status === "loading" || (status === "authenticated" && isLoadingProfile)) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-brand-green border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!session || !profile) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6">
                <div className="text-center space-y-4">
                    <p className="text-gray-500">Por favor, inicia sessão para ver o teu perfil.</p>
                    {status === "authenticated" && (
                        <button onClick={fetchProfile} className="text-brand-green font-bold hover:underline">
                            Tentar novamente
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black py-12 px-6">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header / Profile Card */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-zinc-800 relative overflow-hidden"
                >
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="relative group">
                            <div className="w-32 h-32 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green text-5xl font-bold border-4 border-white dark:border-zinc-800 shadow-lg">
                                {profile.name?.charAt(0)}
                            </div>
                            <div className="absolute bottom-0 right-0 p-2 bg-brand-gold text-white rounded-full shadow-lg">
                                <FaCamera size={14} />
                            </div>
                        </div>

                        <div className="text-center md:text-left flex-1">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{profile.name}</h1>
                                <span className="px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-xs font-bold uppercase tracking-widest border border-brand-green/20">
                                    {getRoleDisplayName(profile.role)}
                                </span>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 flex items-center justify-center md:justify-start gap-2">
                                <FaEnvelope size={14} /> {profile.email}
                            </p>
                        </div>
                    </div>

                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl -z-0"></div>
                </motion.section>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-zinc-800"
                    >
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <FaIdCard className="text-brand-gold" /> Identificação
                        </h2>
                        <div className="space-y-6">
                            <InfoItem
                                label="Número de Escuteiro (NII)"
                                value={profile.scoutNumber || "Não atribuído"}
                                subValue={profile.scoutNumber ? "Atribuído pela Secretaria" : "Pendente de atribuição"}
                            />
                            <InfoItem
                                label="Secção Atual"
                                value={profile.scoutInfo?.section ? getSectionDisplayName(profile.scoutInfo.section) : "Sem secção"}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-zinc-800"
                    >
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3 justify-between">
                            <div className="flex items-center gap-3">
                                <FaCalendarAlt className="text-brand-gold" /> Outros Dados
                            </div>
                            {!isEditing && (
                                <button onClick={() => setIsEditing(true)} className="text-xs text-brand-green font-bold flex items-center gap-1 hover:underline">
                                    <FaEdit /> Editar
                                </button>
                            )}
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Data de Nascimento</p>
                                {isEditing ? (
                                    <div className="flex gap-2">
                                        <input
                                            type="date"
                                            value={newBirthDate}
                                            onChange={(e) => setNewBirthDate(e.target.value)}
                                            className="bg-gray-50 dark:bg-zinc-800 p-2 rounded-lg text-sm border border-gray-100 dark:border-zinc-700 outline-none focus:ring-2 focus:ring-brand-green"
                                        />
                                        <button
                                            disabled={isSaving}
                                            onClick={handleUpdateBirthDate}
                                            className="bg-brand-green text-white px-3 py-1 rounded-lg text-xs font-bold shadow-md shadow-brand-green/20"
                                        >
                                            {isSaving ? "..." : "Gravar"}
                                        </button>
                                        <button onClick={() => setIsEditing(false)} className="bg-gray-100 dark:bg-zinc-800 text-gray-500 px-3 py-1 rounded-lg text-xs font-bold">
                                            X
                                        </button>
                                    </div>
                                ) : (
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                        {profile.scoutInfo?.birthDate ? new Date(profile.scoutInfo.birthDate).toLocaleDateString() : "Não preenchido"}
                                    </p>
                                )}
                            </div>
                            <InfoItem
                                label="Noites de Campo"
                                value={`${profile.scoutInfo?.fieldNights || 0} Noites`}
                                subValue="Registadas no sistema"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function InfoItem({ label, value, subValue }: any) {
    return (
        <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{value}</p>
            {subValue && <p className="text-sm text-gray-500 mt-1">{subValue}</p>}
        </div>
    );
}
