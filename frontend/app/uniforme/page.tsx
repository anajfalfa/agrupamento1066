"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FaArrowRight, FaInfoCircle, FaCheckCircle, FaExchangeAlt } from "react-icons/fa";

const sections = [
    {
        id: "lobitos",
        name: "Lobitos",
        age: "6 - 10 anos",
        color: "bg-brand-yellow",
        textColor: "text-gray-900",
        scarf: "Amarelo com debruado a branco",
        theme: "Livro da Selva",
        description: "Inspirada no imaginário do Livro da Selva, a farda dos Lobitos destaca-se pelo seu lenço amarelo.",
    },
    {
        id: "exploradores",
        name: "Exploradores",
        age: "10 - 14 anos",
        color: "bg-brand-green",
        textColor: "text-white",
        scarf: "Verde com debruado a branco",
        theme: "Aventura e Descoberta",
        description: "Os exploradores vivem a aventura da descoberta, usando o lenço verde que simboliza a natureza.",
    },
    {
        id: "pioneiros",
        name: "Pioneiros",
        age: "14 - 17 anos",
        color: "bg-brand-blue",
        textColor: "text-white",
        scarf: "Azul com debruado a branco",
        theme: "Construção e Empreendimento",
        description: "O azul dos pioneiros reflete a vastidão dos horizontes que pretendem conquistar.",
    },
    {
        id: "caminheiros",
        name: "Caminheiros",
        age: "17 - 22 anos",
        color: "bg-brand-red",
        textColor: "text-white",
        scarf: "Encarnado com debruado a branco",
        theme: "Serviço e Caminhada",
        description: "O vermelho simboliza o fogo do serviço e o compromisso da caminhada.",
    },
    {
        id: "dirigentes",
        name: "Dirigentes",
        age: "22+ anos",
        color: "bg-brand-green-dark",
        textColor: "text-white",
        scarf: "Verde escuro",
        theme: "Testemunho e Serviço",
        description: "Os dirigentes são os educadores adultos que acompanham o crescimento dos jovens escuteiros.",
    },
];

export default function UniformePage() {
    const [activeTab, setActiveTab] = useState("lobitos");

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans pb-20">
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative py-24 px-6 bg-gradient-to-b from-brand-green to-brand-green-dark text-white text-center overflow-hidden"
            >
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Guia do Uniforme</h1>
                    <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
                        O uniforme escutista é mais do que uma roupa: é um símbolo de união,
                        igualdade e prontidão para o serviço.
                    </p>
                </div>
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-brand-gold/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl"></div>
            </motion.section>

            <main className="max-w-6xl mx-auto px-6 -mt-10">
                {/* Section Tabs */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16">
                    {sections.map((section) => (
                        <motion.button
                            key={section.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setActiveTab(section.id)}
                            className={`p-6 rounded-2xl shadow-xl transition-all flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden group ${activeTab === section.id
                                ? `${section.color} ${section.textColor} ring-4 ring-brand-gold ring-offset-4 dark:ring-offset-black scale-105`
                                : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:shadow-2xl hover:ring-2 hover:ring-brand-green/50"
                                }`}
                        >
                            <span className="text-sm uppercase tracking-widest font-bold mb-1 opacity-80">
                                {section.age}
                            </span>
                            <h3 className="text-xl font-bold mb-2">{section.name}</h3>
                            {activeTab !== section.id && (
                                <span className="text-xs font-bold text-brand-green opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-2">
                                    Ver Detalhes
                                </span>
                            )}
                        </motion.button>
                    ))}
                </div>

                {/* Section Content */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold text-brand-green mb-4 flex items-center gap-3">
                            <span className={`w-8 h-8 rounded-full ${sections.find(s => s.id === activeTab)?.color}`}></span>
                            {sections.find(s => s.id === activeTab)?.name}
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                            {sections.find(s => s.id === activeTab)?.description}
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border-l-4 border-brand-gold">
                                <FaCheckCircle className="text-brand-gold mt-1 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Lenço</h4>
                                    <p className="text-gray-600 dark:text-gray-400">{sections.find(s => s.id === activeTab)?.scarf}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border-l-4 border-brand-green">
                                <FaInfoCircle className="text-brand-green mt-1 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Mística e Imaginário</h4>
                                    <p className="text-gray-600 dark:text-gray-400">{sections.find(s => s.id === activeTab)?.theme}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="relative aspect-square">
                        <motion.div
                            key={`${activeTab}-image`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-800 dark:to-zinc-900 rounded-3xl overflow-hidden flex items-center justify-center border-4 border-gray-200 dark:border-zinc-700 shadow-xl"
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={`/uniforme/${activeTab === 'lobitos' ? 'lobito-600x824.jpg' :
                                        activeTab === 'exploradores' ? 'explorador-600x829.jpg' :
                                            activeTab === 'pioneiros' ? 'pioneiro-600x828.jpg' :
                                                activeTab === 'caminheiros' ? 'caminheiro-600x822.jpg' :
                                                    'dirigente-600x833.jpg'
                                        }`}
                                    alt={`Uniforme ${sections.find(s => s.id === activeTab)?.name}`}
                                    fill
                                    className="object-contain p-4"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Transitions Section */}
                <section className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-gray-800 mb-24">
                    <div className="text-center mb-12">
                        <div className="inline-flex p-3 bg-brand-gold/10 rounded-2xl mb-4">
                            <FaExchangeAlt className="text-brand-gold text-2xl" />
                        </div>
                        <h2 className="text-3xl font-bold text-brand-green tracking-tight">Transição entre Secções</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
                            A passagem de uma secção para a outra é um momento importante de crescimento.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-brand-green text-white rounded-full flex items-center justify-center font-bold text-xl">1</div>
                            <h4 className="text-xl font-bold">Proposta e Decisão</h4>
                            <p className="text-gray-600 dark:text-gray-400">
                                A transição ocorre mediante proposta do respetivo Chefe de Unidade e decisão da Direção de Agrupamento.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-brand-green text-white rounded-full flex items-center justify-center font-bold text-xl">2</div>
                            <h4 className="text-xl font-bold">Troca de Lenço</h4>
                            <p className="text-gray-600 dark:text-gray-400">
                                Durante a cerimónia de "Passagem", o escuteiro entrega o seu lenço antigo e recebe o novo lenço da secção.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-brand-green text-white rounded-full flex items-center justify-center font-bold text-xl">3</div>
                            <h4 className="text-xl font-bold">Remoção de Insígnias</h4>
                            <p className="text-gray-600 dark:text-gray-400">
                                Devem ser removidas todas as insígnias de progresso da secção anterior. Guardam-se apenas as permanentes.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 p-6 bg-brand-green/5 rounded-2xl border border-brand-green/20">
                        <h5 className="font-bold text-brand-green mb-2 flex items-center gap-2">
                            <FaInfoCircle /> Período de Adaptação
                        </h5>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                            Existe frequentemente um curto período onde o escuteiro participa nas atividades da nova secção antes da cerimónia oficial,
                            podendo manter o uniforme antigo até ao momento formal da Passagem.
                        </p>
                    </div>
                </section>

                {/* General Rules */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold text-brand-green mb-8 text-center">Regras Gerais do Fardamento</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Camisa", text: "Beige, com dois bolsos no peito." },
                            { title: "Calções/Saia/Calças", text: "Azul escuro (conforme tom regulamentar)." },
                            { title: "Cinto", text: "Azuis ou em cabedal de cor natural com fivela oficial CNE." },
                            { title: "Meias", text: "Até ao joelho, de cor azul-escuro, caneladas." },
                            { title: "Jarreteiras", text: "De lã, da cor da secção, ocultas até à franja, sob o canhão da meia (coser com elásticos)." },
                            { title: "Calçado", text: "Sapatos ou botas de montanha, de cor preta ou castanho escuro." }
                        ].map((rule, i) => (
                            <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow border-b-4 border-brand-gold">
                                <h4 className="font-bold text-lg mb-2 text-brand-green">{rule.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{rule.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA / Official Links */}
                <div className="text-center bg-brand-gold text-white rounded-3xl p-10 shadow-xl overflow-hidden relative">
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold mb-4">Ainda tens dúvidas?</h3>
                        <p className="text-xl mb-8 opacity-90">Consulta o Guia Oficial do Uniforme no site do DMF.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a
                                href="https://dmf.escutismo.pt/ajuda-e-suporte/guia-do-uniforme/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white text-brand-gold px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg flex items-center gap-2"
                            >
                                Guia DMF <FaArrowRight />
                            </a>
                            <a
                                href="https://cne223.weebly.com/uploads/7/7/3/6/7736755/regulamento__uniforme.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brand-green text-white px-8 py-3 rounded-full font-bold hover:bg-brand-green-dark transition shadow-lg flex items-center gap-2"
                            >
                                Regulamento (PDF) <FaArrowRight />
                            </a>
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-black/5 -skew-y-3 origin-top-left"></div>
                </div>
            </main>
        </div>
    );
}
