"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    FaUsers,
    FaClipboardList,
    FaExclamationTriangle,
    FaUserCheck,
    FaCalendarCheck,
    FaBoxOpen,
    FaSpinner
} from "react-icons/fa";

export default function AdminDashboard() {
    const [stats, setStats] = useState<any>(null);
    const [recentRequests, setRecentRequests] = useState<any[]>([]);
    const [nextActivities, setNextActivities] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setIsLoading(true);
        try {
            const [statsRes, reqRes, eventsRes] = await Promise.all([
                fetch("/api/admin/stats"),
                fetch("/api/requests?status=PENDING"),
                fetch("/api/admin/events")
            ]);

            const statsData = await statsRes.json();
            const reqData = await reqRes.json();
            const eventsData = await eventsRes.json();

            if (statsData.stats) setStats(statsData.stats);
            if (Array.isArray(reqData)) setRecentRequests(reqData.slice(0, 5));
            if (Array.isArray(eventsData)) setNextActivities(eventsData.slice(0, 5));
        } catch (error) {
            console.error("Dashboard fetch error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <FaSpinner className="animate-spin text-4xl text-brand-green" />
            </div>
        );
    }

    return (
        <div className="space-y-10">
            <header>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Visão Geral</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Estado atual do Agrupamento 1066 Ribamar.
                </p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    icon={<FaUsers className="text-blue-500" />}
                    label="Total de Utilizadores"
                    value={stats?.totalUsers || "0"}
                    change="Utilizadores registados"
                />
                <StatCard
                    icon={<FaUserCheck className="text-green-500" />}
                    label="Escuteiros Ativos"
                    value={stats?.activeScouts || "0"}
                    change="Na base de dados"
                />
                <StatCard
                    icon={<FaClipboardList className="text-orange-500" />}
                    label="Pedidos Pendentes"
                    value={stats?.pendingRequests || "0"}
                    change={`${stats?.urgentRequests || 0} demorados`}
                />
                <StatCard
                    icon={<FaExclamationTriangle className="text-red-500" />}
                    label="Stock Baixo"
                    value={stats?.lowStockItems || "0"}
                    change="Itens p/ reposição"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Requests */}
                <section className="bg-white dark:bg-zinc-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-zinc-700">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <FaBoxOpen className="text-brand-green" /> Pendentes
                        </h2>
                        <a href="/admin/requests" className="text-sm font-bold text-brand-green hover:underline">Ver todos</a>
                    </div>
                    <div className="space-y-4">
                        {recentRequests.length === 0 ? (
                            <p className="text-center py-10 text-gray-400">Nenhum pedido pendente.</p>
                        ) : (
                            recentRequests.map(req => (
                                <RequestItem
                                    key={req.id}
                                    name={req.user.name}
                                    type={req.type}
                                    item={req.type === 'FIELD_NIGHT_VALIDATION' ? 'Validação de Noites' : (req.items?.[0]?.inventoryItem?.name || 'Pedido')}
                                    time={new Date(req.createdAt).toLocaleDateString()}
                                />
                            ))
                        )}
                    </div>
                </section>

                {/* Next Activities */}
                <section className="bg-white dark:bg-zinc-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-zinc-700">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <FaCalendarCheck className="text-brand-green" /> Próximas Atividades
                        </h2>
                        <a href="/admin/activities" className="text-sm font-bold text-brand-green hover:underline">Calendário</a>
                    </div>
                    <div className="space-y-4">
                        {nextActivities.length === 0 ? (
                            <p className="text-center py-10 text-gray-400">Sem atividades planeadas.</p>
                        ) : (
                            nextActivities.map(event => (
                                <ActivityItem
                                    key={event.id}
                                    title={event.title}
                                    date={new Date(event.startDate).toLocaleDateString()}
                                    status={event.section || "Geral"}
                                />
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, change }: any) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-700"
        >
            <div className="w-12 h-12 bg-gray-50 dark:bg-zinc-700 rounded-2xl flex items-center justify-center mb-4 text-2xl">
                {icon}
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{label}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
            <p className="text-xs font-bold text-brand-green mt-2">{change}</p>
        </motion.div>
    );
}

function RequestItem({ name, type, item, time }: any) {
    return (
        <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green font-bold text-xs">
                    {name.charAt(0)}
                </div>
                <div>
                    <p className="font-bold text-sm">{name}</p>
                    <p className="text-xs text-gray-500">{type}: {item}</p>
                </div>
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{time}</span>
        </div>
    );
}

function ActivityItem({ title, date, status }: any) {
    return (
        <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors">
            <div>
                <p className="font-bold text-sm">{title}</p>
                <p className="text-xs text-gray-500">{date}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${status === 'Confirmado' ? 'bg-green-100 text-green-700' :
                status === 'Planificação' ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                }`}>
                {status}
            </span>
        </div>
    );
}
