"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FaUsers,
    FaTshirt,
    FaBox,
    FaCalendarAlt,
    FaShieldAlt,
    FaChartLine,
    FaArrowLeft,
    FaBars,
    FaTimes,
    FaShoppingBag
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (session?.user && (session.user as any).role === "SCOUT") {
            router.push("/dashboard");
        }
    }, [status, session, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-brand-green border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!session || (session.user as any).role === "SCOUT") {
        return null;
    }

    const menuItems = [
        { icon: <FaChartLine />, label: "Visão Geral", href: "/admin" },
        { icon: <FaUsers />, label: "Utilizadores", href: "/admin/users" },
        { icon: <FaBox />, label: "Material", href: "/admin/material" },
        { icon: <FaTshirt />, label: "Uniformes", href: "/admin/uniforms" },
        { icon: <FaCalendarAlt />, label: "Atividades/Escalas", href: "/admin/activities" },
        { icon: <FaShoppingBag />, label: "Loja DMF", href: "/admin/shop" },
        { icon: <FaShieldAlt />, label: "Log de Auditoria", href: "/admin/audit" },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex">
            {/* Sidebar Desktop */}
            <aside
                className={`${isSidebarOpen ? "w-64" : "w-20"
                    } bg-white dark:bg-zinc-800 border-r border-gray-200 dark:border-zinc-700 transition-all duration-300 hidden lg:flex flex-col sticky top-0 h-screen`}
            >
                <div className="p-6 flex items-center justify-between">
                    {isSidebarOpen && (
                        <span className="text-xl font-bold text-brand-green">Admin Panel</span>
                    )}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors text-gray-500"
                    >
                        {isSidebarOpen ? <FaBars /> : <FaBars className="mx-auto" />}
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${pathname === item.href
                                ? "bg-brand-green text-white shadow-md shadow-brand-green/20"
                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-700"
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100 dark:border-zinc-700">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-4 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-xl transition-all"
                    >
                        <FaArrowLeft />
                        {isSidebarOpen && <span className="font-medium">Sair p/ Dashboard</span>}
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                <header className="h-16 bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 flex items-center justify-between px-6 lg:hidden">
                    <span className="text-xl font-bold text-brand-green">Admin</span>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 text-gray-500"
                    >
                        <FaBars size={24} />
                    </button>
                </header>

                <div className="p-6 lg:p-10 max-w-7xl w-full mx-auto">
                    {children}
                </div>
            </main>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {!isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(true)}
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
