"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
    FaUser,
    FaCalendarAlt,
    FaTshirt,
    FaBox,
    FaMoon,
    FaSignOutAlt,
    FaShieldAlt,
    FaChevronRight,
    FaBell,
    FaShoppingBag
} from "react-icons/fa";
import Link from "next/link";
import { isLeader, isAdmin, getRoleDisplayName } from "@/lib/auth-utils";
import JournalPromotion from "@/components/JournalPromotion";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-brand-green border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!session) return null;

    const user = session.user as any;
    const userIsLeader = isLeader(user);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                {/* Top Bar */}
                <header className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Olá, {user.name?.split(" ")[0]}! 👋
                        </h1>
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-brand-green/10 text-brand-green rounded-full text-[10px] font-bold uppercase tracking-widest">
                                {getRoleDisplayName(user.role)}
                            </span>
                            {user.scoutNumber && (
                                <span className="px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-500 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                    NII: {user.scoutNumber}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-3 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm text-gray-500 hover:text-brand-green transition-all relative">
                            <FaBell />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-brand-gold rounded-full border-2 border-white dark:border-zinc-900"></span>
                        </button>
                        <button
                            onClick={() => signOut()}
                            className="p-3 bg-red-50 dark:bg-red-900/10 rounded-2xl text-red-600 hover:bg-red-100 transition-all flex items-center gap-2"
                            title="Sair"
                        >
                            <FaSignOutAlt /> <span className="hidden md:inline font-bold text-xs uppercase">Sair</span>
                        </button>
                    </div>
                </header>

                <div className="mb-12">
                    <JournalPromotion />
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Quick Actions Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <DashboardAction
                                href="/calendario"
                                icon={<FaCalendarAlt />}
                                label="Calendário"
                                color="bg-blue-500"
                            />
                            <DashboardAction
                                href="/dashboard/inventory/material"
                                icon={<FaBox />}
                                label="Material"
                                color="bg-brand-green"
                            />
                            <DashboardAction
                                href="/dashboard/inventory/uniforms"
                                icon={<FaTshirt />}
                                label="Uniformes"
                                color="bg-brand-gold"
                            />
                            <DashboardAction
                                href="/dashboard/field-nights"
                                icon={<FaMoon />}
                                label="Noites Campo"
                                color="bg-indigo-600"
                            />
                            <DashboardAction
                                href="/dashboard/shop"
                                icon={<FaShoppingBag />}
                                label="Encomendas DMF"
                                color="bg-brand-gold"
                            />
                        </div>

                        {/* Role-Specific Views */}
                        {userIsLeader ? (
                            <LeaderView user={user} />
                        ) : (
                            <ScoutView user={user} />
                        )}
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-8">
                        {/* Admin Quick Entry */}
                        {userIsLeader && (
                            <Link href="/admin">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="p-6 bg-gradient-to-br from-brand-green to-brand-green-dark rounded-3xl text-white shadow-xl flex items-center justify-between cursor-pointer group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
                                            <FaShieldAlt />
                                        </div>
                                        <div>
                                            <h3 className="font-bold">Painel de Controlo</h3>
                                            <p className="text-white/70 text-sm">Gerir Agrupamento</p>
                                        </div>
                                    </div>
                                    <FaChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.div>
                            </Link>
                        )}

                        {/* Profile Summary Card */}
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-zinc-800">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green text-2xl font-bold">
                                    {user.name?.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white">O teu Perfil</h3>
                                    <Link href="/profile" className="text-brand-green text-sm font-bold hover:underline">Ver completo</Link>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <ProfileMiniItem label="Secção" value={user.scoutInfo?.section || "Sem secção"} />
                                <ProfileMiniItem label="Noites" value={`${user.scoutInfo?.fieldNights || 0} Noites`} />
                                <ProfileMiniItem label="Progresso" value={user.scoutInfo?.progressLevel || "Iniciado"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DashboardAction({ href, icon, label, color }: any) {
    return (
        <Link href={href}>
            <motion.div
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 flex flex-col items-center justify-center gap-3 transition-all hover:shadow-lg cursor-pointer h-full"
            >
                <div className={`w-12 h-12 ${color} text-white rounded-2xl flex items-center justify-center text-xl shadow-lg`}>
                    {icon}
                </div>
                <span className="font-bold text-sm text-gray-700 dark:text-gray-300">{label}</span>
            </motion.div>
        </Link>
    );
}

function ProfileMiniItem({ label, value }: any) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-zinc-800 last:border-0">
            <span className="text-sm text-gray-500">{label}</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">{value}</span>
        </div>
    );
}

function ScoutView({ user }: any) {
    return (
        <section className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-zinc-800">
            <h2 className="text-xl font-bold mb-6">Próximas Atividades</h2>
            <div className="text-center py-10">
                <FaCalendarAlt className="mx-auto text-4xl text-gray-200 mb-4" />
                <p className="text-gray-500">Sem atividades agendadas para a tua secção.</p>
            </div>
        </section>
    );
}

function LeaderView({ user }: any) {
    return (
        <div className="space-y-8">
            <section className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-zinc-800">
                <h2 className="text-xl font-bold mb-6">Gestão de Pedidos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-orange-50 dark:bg-orange-900/10 rounded-2xl border border-orange-100 dark:border-orange-800/30">
                        <p className="text-xs font-bold text-orange-600 mb-1 uppercase tracking-widest">Aguardam Aprovação</p>
                        <h4 className="text-2xl font-bold text-orange-900 dark:text-orange-100">7 Pedidos</h4>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800/30">
                        <p className="text-xs font-bold text-blue-600 mb-1 uppercase tracking-widest">Validações Noites</p>
                        <h4 className="text-2xl font-bold text-blue-900 dark:text-blue-100">3 Pendentes</h4>
                    </div>
                </div>
            </section>
        </div>
    );
}
