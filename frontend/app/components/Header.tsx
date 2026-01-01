// frontend/app/components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-6 bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <h1 className="text-xl font-bold text-blue-600">Agrupamento 1066 Ribamar</h1>
      <nav className="flex gap-4 md:gap-6">
        <Link href="/" className="hover:text-blue-600 transition">Início</Link>
        <Link href="/quem-somos" className="hover:text-blue-600 transition">Quem somos</Link>
        <Link href="/historia" className="hover:text-blue-600 transition">História</Link>
        <Link href="/patrono" className="hover:text-blue-600 transition">Patrono</Link>
        <Link href="/seccoes" className="hover:text-blue-600 transition">Secções</Link>
        <Link href="/atividades" className="hover:text-blue-600 transition">Atividades</Link>
        <Link href="/calendario" className="hover:text-blue-600 transition">Calendário</Link>
        <Link href="/contactos" className="hover:text-blue-600 transition">Contactos</Link>
        <Link href="/area-reservada" className="hover:text-blue-600 transition">Área Reservada</Link>
      </nav>
    </header>
  );
}
