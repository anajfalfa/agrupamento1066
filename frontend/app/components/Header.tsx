"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/quem-somos", label: "Quem somos" },
  { href: "/historia", label: "História" },
  { href: "/padroeira", label: "Padroeira" },
  { href: "/seccoes", label: "Secções" },
  { href: "/uniforme", label: "Fardamento" },
  { href: "/atividades", label: "Atividades" },
  { href: "/calendario", label: "Calendário" },
  { href: "/contactos", label: "Contactos" },
  { href: "/area-reservada", label: "Área Reservada" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white/90 backdrop-blur-md shadow-lg py-2"
        : "bg-white py-4 shadow-sm"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center text-brand-green">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Image
              src="/logos/1066 LOGO HORIZONTAL_COR.png"
              alt="Logo 1066 Ribamar"
              width={180}
              height={50}
              className="h-10 md:h-14 w-auto drop-shadow-sm"
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 text-sm font-semibold transition-colors rounded-full overflow-hidden group"
              >
                <span className={`relative z-10 ${isActive ? "text-brand-gold" : "text-brand-green group-hover:text-brand-gold"}`}>
                  {link.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-brand-green/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <motion.div
                  className="absolute inset-0 bg-brand-green/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full -z-0"
                />
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-brand-green hover:bg-brand-green/10 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl overflow-hidden shadow-xl border-t border-brand-green/10"
          >
            <nav className="flex flex-col p-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-3 rounded-xl font-medium transition-all ${isActive
                      ? "bg-brand-green text-white shadow-md"
                      : "text-brand-green hover:bg-brand-green/10"
                      }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

