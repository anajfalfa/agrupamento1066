"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaCheckCircle, FaSpinner } from "react-icons/fa";

export default function Contactos() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  }
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-brand-green mb-4">Contactos</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Entre em contacto connosco ou visite-nos na nossa sede.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg space-y-6">
              <h2 className="text-2xl font-bold text-brand-green mb-6">Informações</h2>

              <div className="flex items-start space-x-4">
                <FaMapMarkerAlt className="text-brand-gold text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Morada da Sede</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Rua dos Escuteiros – Ribamar<br />
                    2530-642 Ribamar
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    29S MD 7160 3840
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaEnvelope className="text-brand-gold text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Email</h3>
                  <a href="mailto:geral.1066@escutismo.pt" className="text-gray-600 dark:text-gray-400 hover:text-brand-green transition-colors">
                    geral.1066@escutismo.pt
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <FaClock className="text-brand-gold text-xl mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Horário de Atividade</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Sábados: 15:00 - 17:30<br />
                    Domingos: Missa/Atividades Especiais
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-zinc-700">
                <a href="https://maps.app.goo.gl/vtq43dMUHnzo547EA" target="_blank" rel="noopener noreferrer" className="text-brand-green font-semibold hover:underline flex items-center gap-2">
                  <FaMapMarkerAlt /> Ver localização no Google Maps
                </a>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-zinc-700">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Redes Sociais</h3>
                <div className="flex space-x-4">
                  <a href="#" className="p-3 bg-brand-green/10 rounded-full text-brand-green hover:bg-brand-green hover:text-white transition-all">
                    <FaFacebook size={20} />
                  </a>
                  <a href="#" className="p-3 bg-brand-green/10 rounded-full text-brand-green hover:bg-brand-green hover:text-white transition-all">
                    <FaInstagram size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="bg-white dark:bg-zinc-800 p-2 rounded-2xl shadow-lg h-80 overflow-hidden relative">
              <iframe
                title="Sede de Agrupamento 1066 Ribamar"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Rua+dos+Escuteiros,+Ribamar,+Lourinhã&zoom=17"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl w-full h-full"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {status === "success" ? (
              <div className="bg-white dark:bg-zinc-800 p-12 rounded-2xl shadow-lg text-center space-y-4">
                <FaCheckCircle className="text-brand-green text-6xl mx-auto animate-bounce" />
                <h2 className="text-2xl font-bold dark:text-white">Mensagem Enviada!</h2>
                <p className="text-gray-600 dark:text-gray-400">Canhota, responderemos o mais breve possível.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-brand-green font-semibold hover:underline"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-brand-green mb-6">Envie-nos uma mensagem</h2>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
                    placeholder="O seu nome"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
                    placeholder="seu.email@exemplo.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Assunto
                  </label>
                  <select
                    name="subject"
                    id="subject"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
                  >
                    <option value="geral">Informações Gerais</option>
                    <option value="inscricoes">Inscrições</option>
                    <option value="aluguer">Aluguer de Espaços</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-900 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Escreva a sua mensagem aqui..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 bg-brand-green hover:bg-brand-green-dark text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  {status === "loading" ? <FaSpinner className="animate-spin" /> : "Enviar Mensagem"}
                </button>
                {status === "error" && <p className="text-red-500 text-sm text-center">Ocorreu um erro. Tenta novamente.</p>}
              </form>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
}

