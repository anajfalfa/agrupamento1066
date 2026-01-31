import { FaInstagram, FaFacebook, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-0">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <Image
            src="/logos/1066 LOGO MEDIO_COR.png"
            alt="Logo 1066 Ribamar"
            width={80}
            height={80}
            className="h-16 w-auto"
          />
          <Image
            src="/logos/Logo CNE Branco 2023 - Quadrado.png"
            alt="Logo CNE"
            width={80}
            height={80}
            className="h-16 w-auto"
          />
          <div className="text-center md:text-left">
            <p className="font-medium">Agrupamento 1066 Ribamar | Núcleo Oeste | Região Lisboa | CNE Portugal</p>
            <p className="text-sm mt-1">© 2026 Todos os direitos reservados</p>
          </div>
        </div>
        <div className="flex justify-center gap-6">
          <a href="https://www.instagram.com/1066ribamar/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors duration-300">
            <FaInstagram size={28} />
          </a>
          <a href="https://www.facebook.com/CNE1066" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors duration-300">
            <FaFacebook size={28} />
          </a>
          <a href="mailto:Geral.1066@escutismo.pt" className="hover:text-green-500 transition-colors duration-300">
            <FaEnvelope size={28} />
          </a>
          <a href="https://wa.me/351912345678" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors duration-300">
            <FaWhatsapp size={28} />
          </a>
        </div>
      </div>
    </footer>
  );
}
