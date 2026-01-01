// frontend/app/components/Footer.tsx
import { FaInstagram, FaFacebook, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="text-center py-6 text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 mt-16">
      <p>Agrupamento 1066 Ribamar | Núcleo Oeste | Região Lisboa | CNE Portugal</p>
      <p>© 2026 Todos os direitos reservados</p>
      <div className="mt-2 flex justify-center gap-4 text-blue-600">
        <a href="https://www.instagram.com/1066ribamar/" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={24} className="hover:text-pink-500 transition"/>
        </a>
        <a href="https://www.facebook.com/CNE1066" target="_blank" rel="noopener noreferrer">
          <FaFacebook size={24} className="hover:text-blue-700 transition"/>
        </a>
        <a href="mailto:Geral.1066@escutismo.pt">
          <FaEnvelope size={24} className="hover:text-green-500 transition"/>
        </a>
        <a href="https://wa.me/351912345678" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp size={24} className="hover:text-green-600 transition"/>
        </a>
      </div>
    </footer>
  );
}
