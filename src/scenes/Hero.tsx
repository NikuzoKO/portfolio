import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Lang } from "../App";

const dialogs = {
    en: [
        "▶ A mysterious developer appears in The City of Coders...",
        "▶ ???: \"I build things that live on the web.\"",
        "▶ ???: \"Full stack. Creative. Trilingual.\"",
        "▶ The developer reveals their name...",
        "▶ NIKUZO has joined the party!",
    ],
    es: [
        "▶ Un misterioso desarrollador aparece en La Ciudad de Programadores...",
        "▶ ???: \"Construyo cosas que viven en la web.\"",
        "▶ ???: \"Full stack. Creativo. Trilingüe.\"",
        "▶ El desarrollador revela su nombre...",
        "▶ ¡NIKUZO se unió al grupo!",
    ],
};

const roles = {
    en: ["Full Stack Developer", "Creative Coder", "Music Producer", "Game Developer"],
    es: ["Desarrollador Full Stack", "Programador Creativo", "Productor Musical", "Desarrollador de Juegos"],
};

function TypeWriter({ text, speed = 30, onDone }: { text: string; speed?: number; onDone?: () => void }) {
    const [displayed, setDisplayed] = useState("");
    const [i, setI] = useState(0);

    useEffect(() => {
        setDisplayed("");
        setI(0);
    }, [text]);

    useEffect(() => {
        if (i < text.length) {
            const t = setTimeout(() => {
                setDisplayed((prev) => prev + text[i]);
                setI((prev) => prev + 1);
            }, speed);
            return () => clearTimeout(t);
        } else if (onDone) {
            onDone();
        }
    }, [i, text, speed, onDone]);

    return <span>{displayed}</span>;
}

export default function Hero({ lang }: { lang: Lang }) {
    const [dialogIndex, setDialogIndex] = useState(0);
    const [done, setDone] = useState(false);
    const [showMain, setShowMain] = useState(false);
    const [roleIndex, setRoleIndex] = useState(0);

    const currentDialogs = dialogs[lang];

    useEffect(() => {
        setDialogIndex(0);
        setDone(false);
        setShowMain(false);
    }, [lang]);

    useEffect(() => {
        if (!showMain) return;
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles[lang].length);
        }, 2000);
        return () => clearInterval(interval);
    }, [showMain, lang]);

    const handleNext = () => {
        if (!done) return;
        if (dialogIndex < currentDialogs.length - 1) {
            setDialogIndex((prev) => prev + 1);
            setDone(false);
        } else {
            setShowMain(true);
        }
    };

    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen bg-purple-darkest overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `linear-gradient(#6943FF 1px, transparent 1px), linear-gradient(90deg, #6943FF 1px, transparent 1px)`,
                    backgroundSize: "50px 50px"
                }}
            />

            {/* Glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-mid opacity-10 rounded-full blur-3xl" />

            <AnimatePresence mode="wait">
                {!showMain ? (
                    <motion.div
                        key="dialog"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="relative z-10 w-full max-w-2xl px-6"
                    >
                        {/* Dialog box */}
                        <div
                            className="border-2 border-purple-mid bg-purple-darkest bg-opacity-95 p-6 rounded cursor-pointer select-none"
                            style={{ boxShadow: "0 0 30px #6943FF44" }}
                            onClick={handleNext}
                        >
                            <p className="text-purple-light text-sm md:text-base min-h-[3rem]">
                                <TypeWriter
                                    key={dialogIndex + lang}
                                    text={currentDialogs[dialogIndex]}
                                    onDone={() => setDone(true)}
                                />
                            </p>
                            {done && (
                                <motion.p
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="text-purple-accent text-xs mt-4 text-right"
                                >
                                    {lang === "en" ? "[ Click to continue ]" : "[ Click para continuar ]"}
                                </motion.p>
                            )}
                        </div>

                        {/* Progress dots */}
                        <div className="flex justify-center gap-2 mt-4">
                            {currentDialogs.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full ${i === dialogIndex ? "bg-purple-accent" : "bg-purple-mid opacity-40"}`}
                                />
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="main"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="relative z-10 text-center px-6"
                    >
                        <motion.p
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-purple-mid text-sm mb-2 tracking-widest"
                        >
                            {lang === "en" ? "// PLAYER ONE" : "// JUGADOR UNO"}
                        </motion.p>

                        <motion.h1
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-6xl md:text-8xl font-bold text-white mb-4"
                            style={{ textShadow: "0 0 40px #6943FF" }}
                        >
                            NIKUZO
                        </motion.h1>

                        <AnimatePresence mode="wait">
                            <motion.p
                                key={roleIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-purple-accent text-lg md:text-xl mb-8"
                            >
                                {roles[lang][roleIndex]}
                            </motion.p>
                        </AnimatePresence>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex gap-6 justify-center"
                        >
                            <a href="https://github.com/NikuzoKo" target="_blank"
                                className="border border-purple-mid text-purple-light px-6 py-2 rounded hover:bg-purple-mid hover:text-white transition-all text-sm">
                                GitHub
                            </a>
                            <a href="https://linkedin.com/in/niki-buela" target="_blank"
                                className="border border-purple-mid text-purple-light px-6 py-2 rounded hover:bg-purple-mid hover:text-white transition-all text-sm">
                                LinkedIn
                            </a>
                            <a href="mailto:nikibuela@gmail.com"
                                className="bg-purple-mid text-white px-6 py-2 rounded hover:bg-purple-accent hover:text-purple-darkest transition-all text-sm font-bold">
                                {lang === "en" ? "Contact" : "Contacto"}
                            </a>
                        </motion.div>

                        <motion.p
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-purple-mid text-xs mt-12"
                        >
                            {lang === "en" ? "↓ scroll to explore ↓" : "↓ scroll para explorar ↓"}
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
