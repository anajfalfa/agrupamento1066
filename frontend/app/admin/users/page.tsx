"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    FaSearch,
    FaFilter,
    FaUserTag,
    FaUsersCog,
    FaCheck,
    FaTimes,
    FaChevronDown,
    FaSpinner
} from "react-icons/fa";

export default function UserManagement() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterSection, setFilterSection] = useState("all");
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Form states for editing
    const [editScoutNumber, setEditScoutNumber] = useState("");
    const [editRole, setEditRole] = useState("");
    const [editSection, setEditSection] = useState("");
    const [editStatus, setEditStatus] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/admin/users");
            const data = await response.json();
            if (Array.isArray(data)) {
                setUsers(data);
            }
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditClick = (user: any) => {
        setEditingUser(user);
        setEditScoutNumber(user.scoutNumber || "");
        setEditRole(user.role || "SCOUT");
        setEditSection(user.scoutInfo?.section || "");
        setEditStatus(user.status || "APPROVED");
    };

    const handleSave = async () => {
        if (!editingUser) return;
        setIsSaving(true);
        try {
            const response = await fetch("/api/admin/users", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: editingUser.id,
                    scoutNumber: editScoutNumber,
                    role: editRole,
                    section: editSection,
                    status: editStatus,
                }),
            });

            if (response.ok) {
                setEditingUser(null);
                fetchUsers(); // Refresh list
            } else {
                const err = await response.json();
                alert(`Erro: ${err.error}`);
            }
        } catch (error) {
            alert("Erro ao guardar alterações.");
        } finally {
            setIsSaving(false);
        }
    };

    // Filter logic
    const filteredUsers = users.filter(user => {
        const matchesSearch =
            (user.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (user.email?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (user.scoutNumber && user.scoutNumber.includes(searchTerm));
        const matchesRole = filterRole === "all" || user.role === filterRole;
        const matchesStatus = filterStatus === "all" || user.status === filterStatus;
        const matchesSection = filterSection === "all" || user.scoutInfo?.section === filterSection;
        return matchesSearch && matchesRole && matchesStatus && matchesSection;
    });

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestão de Utilizadores</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Administra contas, atribui números de escuteiro e define funções.
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-brand-green/10 text-brand-green px-4 py-2 rounded-xl font-bold text-sm">
                    <FaUserTag /> {filteredUsers.length} Utilizadores
                </div>
            </header>

            {/* Filters Bar */}
            <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Procurar por nome, email ou NII..."
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-zinc-900 border-none rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap gap-4">
                    <div className="relative">
                        <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                        <select
                            className="pl-10 pr-8 py-3 bg-gray-50 dark:bg-zinc-900 border-none rounded-xl focus:ring-2 focus:ring-brand-green outline-none appearance-none cursor-pointer font-medium text-sm"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">Todos os Estados</option>
                            <option value="PENDING">Pendentes</option>
                            <option value="APPROVED">Aprovados</option>
                            <option value="REJECTED">Rejeitados</option>
                        </select>
                        <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none" />
                    </div>
                    <div className="relative">
                        <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                        <select
                            className="pl-10 pr-8 py-3 bg-gray-50 dark:bg-zinc-900 border-none rounded-xl focus:ring-2 focus:ring-brand-green outline-none appearance-none cursor-pointer font-medium text-sm"
                            value={filterSection}
                            onChange={(e) => setFilterSection(e.target.value)}
                        >
                            <option value="all">Todas as Secções</option>
                            <option value="LOBITOS">Lobitos</option>
                            <option value="EXPLORADORES">Exploradores</option>
                            <option value="PIONEIROS">Pioneiros</option>
                            <option value="CAMINHEIROS">Caminheiros</option>
                        </select>
                        <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-[10px] pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-700 overflow-hidden">
                {isLoading ? (
                    <div className="p-20 flex flex-col items-center justify-center text-gray-400 gap-4">
                        <FaSpinner className="animate-spin text-4xl text-brand-green" />
                        <p>A carregar utilizadores...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-zinc-900/50 border-b border-gray-100 dark:border-zinc-700">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Utilizador</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Função</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Estado</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">NII (Scout ID)</th>
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-500">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-zinc-700">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-zinc-700/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${user.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                                                    user.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                }`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green font-bold">
                                                    {user.name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${user.role === 'SCOUT' ? 'bg-blue-100 text-blue-700' :
                                                user.role === 'SECTION_LEADER' ? 'bg-green-100 text-green-700' :
                                                    user.role === 'GROUP_LEADER' ? 'bg-orange-100 text-orange-700' :
                                                        'bg-purple-100 text-purple-700'
                                                }`}>
                                                {user.role?.replace("_", " ")}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.scoutNumber ? (
                                                <span className="font-mono text-sm font-bold text-gray-600 dark:text-gray-400">
                                                    {user.scoutNumber}
                                                </span>
                                            ) : (
                                                <span className="text-xs italic text-gray-400">Não atribuído</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleEditClick(user)}
                                                className="p-2 text-gray-400 hover:text-brand-green transition-colors"
                                                title="Editar Utilizador"
                                            >
                                                <FaUsersCog size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Quick Edit Modal */}
            {editingUser && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-zinc-800 rounded-3xl p-8 max-w-lg w-full shadow-2xl"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">Gerir Utilizador</h2>
                                <p className="text-sm text-gray-500">{editingUser.name}</p>
                            </div>
                            <button
                                onClick={() => setEditingUser(null)}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-full"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold mb-2">NII (Número de Escuteiro)</label>
                                <input
                                    type="text"
                                    value={editScoutNumber}
                                    onChange={(e) => setEditScoutNumber(e.target.value)}
                                    placeholder="Ex: 12345678"
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 border-none rounded-xl focus:ring-2 focus:ring-brand-green outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2">Função</label>
                                <select
                                    value={editRole}
                                    onChange={(e) => setEditRole(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 border-none rounded-xl focus:ring-2 focus:ring-brand-green outline-none appearance-none cursor-pointer"
                                >
                                    <option value="SCOUT">Escuteiro</option>
                                    <option value="SECTION_LEADER">Chefe de Secção</option>
                                    <option value="GROUP_LEADER">Chefe de Agrupamento</option>
                                    <option value="SUPER_ADMIN">Super Admin (Dev)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2">Secção</label>
                                <select
                                    value={editSection}
                                    onChange={(e) => setEditSection(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 border-none rounded-xl focus:ring-2 focus:ring-brand-green outline-none appearance-none cursor-pointer"
                                >
                                    <option value="">Nenhuma / Geral</option>
                                    <option value="LOBITOS">Lobitos</option>
                                    <option value="EXPLORADORES">Exploradores</option>
                                    <option value="PIONEIROS">Pioneiros</option>
                                    <option value="CAMINHEIROS">Caminheiros</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2">Estado da Conta</label>
                                <select
                                    value={editStatus}
                                    onChange={(e) => setEditStatus(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 border-none rounded-xl focus:ring-2 focus:ring-brand-green outline-none appearance-none cursor-pointer"
                                >
                                    <option value="PENDING">Pendente</option>
                                    <option value="APPROVED">Aprovado</option>
                                    <option value="REJECTED">Rejeitado</option>
                                </select>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    onClick={() => setEditingUser(null)}
                                    disabled={isSaving}
                                    className="flex-1 bg-gray-100 dark:bg-zinc-700 font-bold py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-600 transition-all disabled:opacity-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="flex-1 bg-brand-green text-white font-bold py-3 rounded-xl hover:bg-brand-green-dark shadow-lg shadow-brand-green/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                                >
                                    {isSaving ? <FaSpinner className="animate-spin" /> : <>Guardar <FaCheck /></>}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
