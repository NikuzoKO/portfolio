import { motion } from "framer-motion";
import type { Lang } from "../App";

const content = {
    en: {
        chapter: "// CHAPTER 04",
        title: "JOIN MY PARTY",
        dialog: "▶ Looking for a developer to join your quest?",
        subtitle:
            "I'm available for remote work. Let's build something together.",
        email: "Send a message",
        linkedin: "Connect on LinkedIn",
        github: "See my code",
        cv: "Download CV",
        available: "AVAILABLE FOR HIRE",
        remote: "REMOTE FRIENDLY",
        languages: "ES / EN / PT",
    },
    es: {
        chapter: "// CAPÍTULO 04",
        title: "ÚNETE A MI GRUPO",
        dialog: "▶ ¿Buscas un desarrollador para tu misión?",
        subtitle: "Disponible para trabajo remoto. Construyamos algo juntos.",
        email: "Enviar mensaje",
        linkedin: "Conectar en LinkedIn",
        github: "Ver mi código",
        cv: "Descargar CV",
        available: "DISPONIBLE",
        remote: "TRABAJO REMOTO",
        languages: "ES / EN / PT",
    },
};

export default function Contact({ lang }: { lang: Lang }) {
    const t = content[lang];

    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen bg-purple-darkest px-6 py-20">
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(#6943FF 1px, transparent 1px), linear-gradient(90deg, #6943FF 1px, transparent 1px)`,
                    backgroundSize: "50px 50px",
                }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-mid opacity-5 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-2xl w-full text-center">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-purple-mid text-xs tracking-widest mb-2"
                >
                    {t.chapter}
                </motion.p>

                <motion.h2
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="text-4xl font-bold text-white mb-6"
                    style={{ textShadow: "0 0 20px #6943FF" }}
                >
                    {t.title}
                </motion.h2>

                {/* Dialog box */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="border border-purple-mid bg-purple-dark p-4 rounded mb-8 text-purple-light text-sm"
                    style={{ boxShadow: "0 0 20px #6943FF22" }}
                >
                    <p>{t.dialog}</p>
                    <p className="text-purple-accent mt-2">{t.subtitle}</p>
                </motion.div>

                {/* Status badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center gap-4 mb-10"
                >
                    {[t.available, t.remote, t.languages].map((badge, i) => (
                        <span
                            key={i}
                            className="text-xs px-3 py-1 rounded border border-purple-mid text-purple-mid"
                        >
                            {badge}
                        </span>
                    ))}
                </motion.div>

                {/* Contact links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-2 gap-4"
                >
                    <a
                        href="mailto:nikibuela@gmail.com"
                        className="border border-purple-mid text-purple-light px-6 py-4 rounded hover:bg-purple-mid hover:text-white transition-all text-sm"
                    >
                        ✉ {t.email}
                    </a>
                    <a
                        href="https://linkedin.com/in/niki-buela"
                        target="_blank"
                        className="border border-purple-mid text-purple-light px-6 py-4 rounded hover:bg-purple-mid hover:text-white transition-all text-sm"
                    >
                        💼 {t.linkedin}
                    </a>
                    <a
                        href="https://github.com/NikuzoKo"
                        target="_blank"
                        className="border border-purple-mid text-purple-light px-6 py-4 rounded hover:bg-purple-mid hover:text-white transition-all text-sm"
                    >
                        🐙 {t.github}
                    </a>
                    <a
                        href="https://nikuzoko.github.io/curriculum/"
                        target="_blank"
                        className="bg-purple-mid text-white px-6 py-4 rounded hover:bg-purple-accent hover:text-purple-darkest transition-all text-sm font-bold"
                        style={{ boxShadow: "0 0 20px #6943FF44" }}
                    >
                        📄 {t.cv}
                    </a>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-purple-mid text-xs mt-12"
                >
                    © 2025 Nikuzo · Built with React + TypeScript · The City of
                    Coders
                </motion.p>
            </div>
        </section>
    );
}
