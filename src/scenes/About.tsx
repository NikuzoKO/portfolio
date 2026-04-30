import { motion } from "framer-motion";
import type { Lang } from "../App";

const content = {
    en: {
        chapter: "// CHAPTER 01",
        title: "ORIGIN STORY",
        dialog: "▶ Party member NIKUZO's stats loaded...",
        bio1: "Self-taught developer from Piriápolis, Uruguay. Started coding in 2018 and never stopped.",
        bio2: "I build full stack web apps, compose music, and develop games. I bridge the gap between clean code and creative vision.",
        bio3: "Currently available for remote work. Trilingual: Spanish (native), English, Portuguese.",
        stats: "CHARACTER STATS",
    },
    es: {
        chapter: "// CAPÍTULO 01",
        title: "HISTORIA DE ORIGEN",
        dialog: "▶ Estadísticas del miembro NIKUZO cargadas...",
        bio1: "Desarrollador autodidacta de Piriápolis, Uruguay. Empecé a programar en 2018 y no paré.",
        bio2: "Construyo apps web full stack, compongo música y desarrollo juegos. Conecto el código limpio con la visión creativa.",
        bio3: "Disponible para trabajo remoto. Trilingüe: Español (nativo), Inglés, Portugués.",
        stats: "ESTADÍSTICAS",
    },
};

const stats = [
    { label: "JavaScript", value: 85 },
    { label: "React", value: 80 },
    { label: "Node.js", value: 75 },
    { label: "PHP/Laravel", value: 65 },
    { label: "C#", value: 60 },
    { label: "Databases", value: 75 },
];

export default function About({ lang }: { lang: Lang }) {
    const t = content[lang];

    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen bg-purple-dark px-6 py-20">
            <div className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `linear-gradient(#6943FF 1px, transparent 1px), linear-gradient(90deg, #6943FF 1px, transparent 1px)`,
                    backgroundSize: "50px 50px"
                }}
            />

            <div className="relative z-10 max-w-4xl w-full">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-purple-mid text-xs tracking-widest mb-2"
                >
                    {t.chapter}
                </motion.p>

                <motion.h2
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="text-4xl font-bold text-white mb-8"
                    style={{ textShadow: "0 0 20px #6943FF" }}
                >
                    {t.title}
                </motion.h2>

                {/* Dialog box */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="border border-purple-mid bg-purple-darkest p-4 rounded mb-8 text-purple-light text-sm"
                    style={{ boxShadow: "0 0 20px #6943FF22" }}
                >
                    {t.dialog}
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        <p className="text-purple-light text-sm leading-relaxed">{t.bio1}</p>
                        <p className="text-purple-light text-sm leading-relaxed">{t.bio2}</p>
                        <p className="text-purple-accent text-sm leading-relaxed">{t.bio3}</p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <p className="text-purple-mid text-xs tracking-widest mb-4">{t.stats}</p>
                        <div className="space-y-3">
                            {stats.map((stat, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-purple-light">{stat.label}</span>
                                        <span className="text-purple-accent">{stat.value}/100</span>
                                    </div>
                                    <div className="h-1 bg-purple-darkest rounded overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${stat.value}%` }}
                                            transition={{ duration: 1, delay: i * 0.1 }}
                                            className="h-full bg-purple-mid rounded"
                                            style={{ boxShadow: "0 0 8px #6943FF" }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
