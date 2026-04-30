import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Lang } from "../App";

const skills = [
    {
        name: "FRONTEND",
        icon: "⚔️",
        items: ["React + Redux", "TypeScript", "HTML + CSS", "Framer Motion", "Vite"],
        desc: {
            en: "Building responsive, interactive UIs that feel alive. From landing pages to complex SPAs.",
            es: "Construyo interfaces responsivas e interactivas. Desde landing pages hasta SPAs complejas.",
        },
    },
    {
        name: "BACKEND",
        icon: "🛡️",
        items: ["Node.js + Express", "PHP + Laravel", "REST APIs", "Sanctum Auth", "Docker"],
        desc: {
            en: "Solid APIs and server-side logic. Clean architecture, proper auth, real deployments.",
            es: "APIs sólidas y lógica del servidor. Arquitectura limpia, auth correcta, deploys reales.",
        },
    },
    {
        name: "DATABASE",
        icon: "📚",
        items: ["MySQL", "MongoDB", "PostgreSQL", "Eloquent ORM", "Mongoose"],
        desc: {
            en: "Designing schemas, writing queries, optimizing for performance across SQL and NoSQL.",
            es: "Diseño de esquemas, consultas y optimización tanto en SQL como NoSQL.",
        },
    },
    {
        name: "CREATIVE",
        icon: "🎮",
        items: ["C# Game Dev", "Music Production", "Photoshop", "Illustrator", "Figma"],
        desc: {
            en: "Games, music, and visual design. The creative side that makes my work stand out.",
            es: "Juegos, música y diseño visual. El lado creativo que hace destacar mi trabajo.",
        },
    },
    {
        name: "TOOLS",
        icon: "⚙️",
        items: ["Git + GitHub", "Linux / Arch", "Scrum / Kanban", "VSCode", "Jira / Trello"],
        desc: {
            en: "Professional workflow tools. I work well in agile teams and know my way around a terminal.",
            es: "Herramientas de flujo profesional. Trabajo bien en equipos ágiles y manejo la terminal.",
        },
    },
];

export default function Skills({ lang }: { lang: Lang }) {
    const [selected, setSelected] = useState(0);

    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen bg-purple-darkest px-6 py-20">
            <div className="relative z-10 max-w-4xl w-full">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-purple-mid text-xs tracking-widest mb-2"
                >
                    {lang === "en" ? "// CHAPTER 02" : "// CAPÍTULO 02"}
                </motion.p>

                <motion.h2
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="text-4xl font-bold text-white mb-8"
                    style={{ textShadow: "0 0 20px #6943FF" }}
                >
                    {lang === "en" ? "SKILL TREE" : "ÁRBOL DE HABILIDADES"}
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Menu */}
                    <div className="border border-purple-mid rounded overflow-hidden"
                        style={{ boxShadow: "0 0 20px #6943FF22" }}>
                        <div className="bg-purple-mid bg-opacity-20 px-4 py-2 text-xs text-purple-mid tracking-widest">
                            {lang === "en" ? "SELECT SKILL" : "SELECCIONAR HABILIDAD"}
                        </div>
                        {skills.map((skill, i) => (
                            <motion.button
                                key={i}
                                onClick={() => setSelected(i)}
                                whileHover={{ x: 4 }}
                                className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-all border-b border-purple-mid border-opacity-20 ${
                                    selected === i
                                        ? "bg-purple-mid bg-opacity-30 text-white"
                                        : "text-purple-light hover:bg-purple-mid hover:bg-opacity-10"
                                }`}
                            >
                                <span>{skill.icon}</span>
                                <span>{skill.name}</span>
                                {selected === i && (
                                    <motion.span
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                        className="ml-auto text-purple-accent"
                                    >
                                        ▶
                                    </motion.span>
                                )}
                            </motion.button>
                        ))}
                    </div>

                    {/* Detail panel */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selected}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="border border-purple-mid rounded p-6"
                            style={{ boxShadow: "0 0 20px #6943FF22" }}
                        >
                            <div className="text-4xl mb-4">{skills[selected].icon}</div>
                            <h3 className="text-white font-bold text-xl mb-4">{skills[selected].name}</h3>
                            <p className="text-purple-light text-sm mb-6 leading-relaxed">
                                {skills[selected].desc[lang]}
                            </p>
                            <div className="space-y-2">
                                {skills[selected].items.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex items-center gap-2 text-sm text-purple-light"
                                    >
                                        <span className="text-purple-accent">▸</span>
                                        {item}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
