"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaChevronLeft,
    FaChevronRight,
    FaBirthdayCake,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaClock,
    FaPlus,
    FaSpinner,
    FaInfoCircle
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import { isLeader, getSectionDisplayName, getSectionColor } from "@/lib/auth-utils";

export default function AdvancedCalendar() {
    const { data: session } = useSession();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<any[]>([]);
    const [birthdays, setBirthdays] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [showEventModal, setShowEventModal] = useState(false);

    // Filter state
    const [sectionFilter, setSectionFilter] = useState<string>(
        (session?.user as any)?.scoutInfo?.section || ""
    );

    useEffect(() => {
        fetchEvents();
    }, [currentDate, sectionFilter]);

    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            const monthStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
            const response = await fetch(`/api/events?section=${sectionFilter}&month=${monthStr}`);
            const data = await response.json();
            setEvents(data.events || []);
            setBirthdays(data.birthdays || []);
        } catch (error) {
            console.error("Failed to fetch events", error);
        } finally {
            setIsLoading(false);
        }
    };

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const startOffset = firstDayOfMonth(year, month);

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const getEventsForDay = (day: number) => {
        return events.filter(e => {
            const d = new Date(e.startDate);
            return d.getDate() === day && d.getMonth() === month && d.getFullYear() === year;
        });
    };

    const getBirthdaysForDay = (day: number) => {
        return birthdays.filter(b => {
            const d = new Date(b.startDate);
            return d.getDate() === day && d.getMonth() === month;
        });
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white">Calendário de Agrupamento</h1>
                    <p className="text-gray-500 dark:text-gray-400">Atividades, reuniões e aniversários.</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <select
                        value={sectionFilter}
                        onChange={(e) => setSectionFilter(e.target.value)}
                        className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl px-4 py-2 text-sm font-bold shadow-sm outline-none focus:ring-2 focus:ring-brand-green"
                    >
                        <option value="">Todas as Secções</option>
                        <option value="LOBITOS">Lobitos</option>
                        <option value="EXPLORADORES">Exploradores</option>
                        <option value="PIONEIROS">Pioneiros</option>
                        <option value="CAMINHEIROS">Caminheiros</option>
                    </select>

                    {isLeader(session?.user as any) && (
                        <button
                            onClick={() => setShowEventModal(true)}
                            className="bg-brand-green text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-brand-green/20 flex items-center gap-2 hover:bg-brand-green-dark transition-all"
                        >
                            <FaPlus /> Novo Evento
                        </button>
                    )}
                </div>
            </header>

            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-zinc-800 overflow-hidden">
                {/* Calendar Nav */}
                <div className="p-8 border-b border-gray-50 dark:border-zinc-800 flex justify-between items-center">
                    <h2 className="text-2xl font-black text-gray-800 dark:text-white">
                        {monthNames[month]} <span className="text-brand-green">{year}</span>
                    </h2>
                    <div className="flex gap-2">
                        <button onClick={prevMonth} className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-zinc-800 flex items-center justify-center text-gray-500 hover:bg-brand-green hover:text-white transition-all">
                            <FaChevronLeft />
                        </button>
                        <button onClick={nextMonth} className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-zinc-800 flex items-center justify-center text-gray-500 hover:bg-brand-green hover:text-white transition-all">
                            <FaChevronRight />
                        </button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-px bg-gray-100 dark:bg-zinc-800">
                    {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(day => (
                        <div key={day} className="bg-gray-50 dark:bg-zinc-900 p-4 text-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                            {day}
                        </div>
                    ))}

                    {Array.from({ length: startOffset }).map((_, i) => (
                        <div key={`empty-${i}`} className="bg-white dark:bg-zinc-900 min-h-[120px] p-2 opacity-30" />
                    ))}

                    {Array.from({ length: totalDays }).map((_, i) => {
                        const day = i + 1;
                        const dayEvents = getEventsForDay(day);
                        const dayBirthdays = getBirthdaysForDay(day);
                        const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();

                        return (
                            <div
                                key={day}
                                onClick={() => setSelectedDay(day)}
                                className={`bg-white dark:bg-zinc-900 min-h-[120px] p-2 border-t border-l border-transparent hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-all cursor-pointer group relative ${isToday ? 'ring-2 ring-brand-green ring-inset' : ''}`}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className={`text-sm font-black ${isToday ? 'text-brand-green' : 'text-gray-400 dark:text-zinc-500'}`}>
                                        {day}
                                    </span>
                                    {dayBirthdays.length > 0 && <FaBirthdayCake className="text-brand-gold text-xs" />}
                                </div>

                                <div className="space-y-1 overflow-hidden">
                                    {dayEvents.slice(0, 3).map(event => (
                                        <div
                                            key={event.id}
                                            className="text-[10px] p-1.5 rounded-lg font-bold truncate transition-all text-white shadow-sm"
                                            style={{ backgroundColor: getSectionColor(event.section) || '#444' }}
                                        >
                                            {event.title}
                                        </div>
                                    ))}
                                    {dayEvents.length > 3 && (
                                        <div className="text-[9px] text-gray-400 font-bold pl-1">
                                            + {dayEvents.length - 3} mais
                                        </div>
                                    )}
                                    {dayBirthdays.slice(0, 2).map((b, idx) => (
                                        <div key={idx} className="text-[10px] p-1.5 bg-brand-gold/10 text-brand-gold rounded-lg font-bold truncate flex items-center gap-1 border border-brand-gold/20">
                                            🎂 {b.userName}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-zinc-800">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <FaInfoCircle className="text-brand-green" /> Legenda de Cores
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <LegendItem color="#ffe066" label="Lobitos" />
                        <LegendItem color="#006738" label="Exploradores" />
                        <LegendItem color="#00599c" label="Pioneiros" />
                        <LegendItem color="#e4022d" label="Caminheiros" />
                        <LegendItem color="#444" label="Global / Agrupamento" />
                        <LegendItem color="#fbc02d" label="Aniversários" isOutline />
                    </div>
                </section>

                <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-sm border border-gray-100 dark:border-zinc-800">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <FaCalendarAlt className="text-brand-gold" /> Hoje no Agrupamento
                    </h3>
                    {isLoading ? (
                        <div className="flex items-center gap-2 text-gray-400"><FaSpinner className="animate-spin" /> A carregar...</div>
                    ) : events.length === 0 && birthdays.length === 0 ? (
                        <p className="text-gray-500 italic">Sem eventos registados para este mês.</p>
                    ) : (
                        <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                            {/* Simplified list view could go here */}
                            <p className="text-sm text-gray-500">Consulta o calendário acima para detalhes.</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

function LegendItem({ color, label, isOutline }: any) {
    return (
        <div className="flex items-center gap-3">
            <div
                className={`w-4 h-4 rounded-lg ${isOutline ? 'border-2' : ''}`}
                style={isOutline ? { borderColor: color, backgroundColor: `${color}20` } : { backgroundColor: color }}
            />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</span>
        </div>
    );
}
