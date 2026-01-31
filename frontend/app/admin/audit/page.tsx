"use client";

import { FaShieldAlt, FaHistory, FaSearch, FaArrowLeft, FaFilter } from "react-icons/fa";
import Link from "next/link";

export default function AuditLog() {
    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Link href="/admin" className="text-sm font-bold text-brand-green flex items-center gap-2 mb-2 hover:underline">
                        <FaArrowLeft /> Voltar
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Log de Auditoria</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Histórico de ações e alterações críticas no sistema.
                    </p>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Procurar por utilizador ou ação..."
                        className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-800 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-brand-green outline-none"
                    />
                </div>
                <button className="px-6 py-3 bg-white dark:bg-zinc-800 rounded-xl font-bold text-gray-500 flex items-center gap-2 border border-gray-100 dark:border-zinc-700 hover:bg-gray-50 transition-all">
                    <FaFilter /> Filtrar
                </button>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-700 overflow-hidden">
                <div className="p-20 text-center flex flex-col items-center justify-center gap-4">
                    <div className="w-20 h-20 bg-gray-50 dark:bg-zinc-700 rounded-full flex items-center justify-center text-gray-200 text-4xl">
                        <FaShieldAlt />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Audit Log Inicializado</h2>
                        <p className="text-gray-500 mt-1 max-w-sm mx-auto">
                            O sistema de monitorização está ativo. As ações serão registadas a partir deste momento.
                        </p>
                    </div>
                </div>

                {/* Sample Log Entry for UI demonstration */}
                <div className="border-t border-gray-50 dark:border-zinc-700 p-4 bg-zinc-50/50 dark:bg-zinc-900/30">
                    <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-2">
                        <span>Ação</span>
                        <span>Data / Hora</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green">
                                <FaHistory />
                            </div>
                            <div>
                                <p className="font-bold text-sm">Super Admin (Developer)</p>
                                <p className="text-xs text-gray-500">Database Seed Executed</p>
                            </div>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">Hoje, 14:45</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
