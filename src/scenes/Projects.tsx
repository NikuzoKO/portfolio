import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Lang } from "../App";

const projects = [
    {
        name: "THE DISCIPLE",
        status: { en: "IN PROGRESS", es: "EN PROGRESO" },
        type: { en: "MAIN QUEST", es: "MISIÓN PRINCIPAL" },
        desc: {
            en: "Godot 4.7 roguelite combining Dark Souls-style combat with Diablo/PoE-style loot and skill trees. PC first, console/mobile ports planned.",
            es: "Roguelite en Godot 4.7 que combina combate estilo Dark Souls con loot y árbol de habilidades estilo Diablo/PoE. PC primero, con puertos a consola/móvil planeados.",
        },
        stack: ["Godot", "GDScript"],
        url: "https://github.com/NikuzoKO/the-disciple",
        color: "#FF628C",
    },
    {
        name: "SKYTRIM",
        status: { en: "IN PROGRESS", es: "EN PROGRESO" },
        type: { en: "SIDE QUEST", es: "MISIÓN SECUNDARIA" },
        desc: {
            en: "Fabric client mod for Hypixel Skyblock — custom HUD, live Hypixel API integration, generic menu re-skinning, dungeon/garden/auction tooling.",
            es: "Mod cliente Fabric para Hypixel Skyblock — HUD personalizado, integración en vivo con la API de Hypixel, re-skinning de menús genéricos, herramientas de mazmorras/jardín/subastas.",
        },
        stack: ["Java", "Fabric", "Hypixel API"],
        url: "https://github.com/NikuzoKO/skytrim",
        color: "#3AD900",
    },
    {
        name: "RUBBLE STONE",
        status: { en: "EARLY PROTOTYPE", es: "PROTOTIPO TEMPRANO" },
        type: { en: "SIDE QUEST", es: "MISIÓN SECUNDARIA" },
        desc: {
            en: "Dark-fantasy tower-defense/deckbuilder hybrid (Loop Hero meets Plants vs. Zombies), Godot + GodotJS.",
            es: "Híbrido de tower-defense/deckbuilder de fantasía oscura (Loop Hero + Plants vs. Zombies), Godot + GodotJS.",
        },
        stack: ["Godot", "GodotJS", "TypeScript"],
        url: "https://github.com/NikuzoKO/rubble-stone",
        color: "#6943FF",
    },
    {
        name: "MUSICLI",
        status: { en: "IN PROGRESS", es: "EN PROGRESO" },
        type: { en: "SIDE QUEST", es: "MISIÓN SECUNDARIA" },
        desc: {
            en: "Terminal YouTube music player — Ink/React UI, mpv-driven playback over IPC, yt-dlp search.",
            es: "Reproductor de música de YouTube en terminal — UI con Ink/React, reproducción vía mpv por IPC, búsqueda con yt-dlp.",
        },
        stack: ["TypeScript", "Ink/React", "mpv"],
        url: "https://github.com/NikuzoKO/musicli",
        color: "#FAD000",
    },
    {
        name: "COMPACTA",
        status: { en: "COMPLETED ✓", es: "COMPLETADO ✓" },
        type: { en: "MAIN QUEST", es: "MISIÓN PRINCIPAL" },
        desc: {
            en: "Full-stack Laravel API + React frontend, shipped and live in production.",
            es: "Fullstack con API Laravel + frontend React, en producción.",
        },
        stack: ["React", "Laravel", "MySQL"],
        url: "https://compacta.net.uy",
        color: "#FB94FF",
    },
    {
        name: "FARO CONSTRUCTORA",
        status: { en: "COMPLETED ✓", es: "COMPLETADO ✓" },
        type: { en: "MAIN QUEST", es: "MISIÓN PRINCIPAL" },
        desc: {
            en: "Fullstack website for a real construction company. React frontend with dynamic carousel. Laravel API backend with admin panel for content management. Live in production.",
            es: "Sitio web fullstack para una empresa constructora real. Frontend en React con carrusel dinámico. API Laravel con panel de administración. En producción.",
        },
        stack: ["React", "Laravel", "MySQL", "Docker", "cPanel"],
        url: "https://faro.net.uy",
        color: "#FAD000",
    },
    {
        name: "STOCK DASHBOARD",
        status: { en: "COMPLETED ✓", es: "COMPLETADO ✓" },
        type: { en: "SIDE QUEST", es: "MISIÓN SECUNDARIA" },
        desc: {
            en: "Fullstack stock market tracking app. React frontend with real-time search. Laravel API with Sanctum authentication — register, login, password recovery.",
            es: "App fullstack de seguimiento bursátil. Frontend React con búsqueda en tiempo real. API Laravel con autenticación Sanctum.",
        },
        stack: ["React", "Laravel", "Sanctum", "MySQL"],
        url: "https://github.com/NikuzoKo/stockDashboardFront",
        color: "#6943FF",
    },
    {
        name: "MOVIES CATALOG",
        status: { en: "COMPLETED ✓", es: "COMPLETADO ✓" },
        type: { en: "SIDE QUEST", es: "MISIÓN SECUNDARIA" },
        desc: {
            en: "React movie catalog integrating The Movie Database API. Infinite scroll, responsive design, live on Vercel.",
            es: "Catálogo de películas en React integrando The Movie Database API. Scroll infinito y diseño responsivo.",
        },
        stack: ["React", "TMDB API", "Vercel"],
        url: "https://nikuzomovies.vercel.app",
        color: "#FB94FF",
    },
    {
        name: "PLANTASIA",
        status: { en: "COMPLETED ✓", es: "COMPLETADO ✓" },
        type: { en: "SIDE QUEST", es: "MISIÓN SECUNDARIA" },
        desc: {
            en: "E-commerce built with React + Bootstrap. Functional shopping cart, responsive design.",
            es: "E-commerce con React + Bootstrap. Carrito de compras funcional y diseño responsivo.",
        },
        stack: ["React", "Bootstrap", "Redux"],
        url: "",
        color: "#3AD900",
    },
];

export default function Projects({ lang }: { lang: Lang }) {
    const [selected, setSelected] = useState(0);

    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen bg-purple-dark px-6 py-20">
            <div className="relative z-10 max-w-4xl w-full">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-purple-mid text-xs tracking-widest mb-2"
                >
                    {lang === "en" ? "// CHAPTER 03" : "// CAPÍTULO 03"}
                </motion.p>

                <motion.h2
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="text-4xl font-bold text-white mb-8"
                    style={{ textShadow: "0 0 20px #6943FF" }}
                >
                    {lang === "en" ? "QUEST LOG" : "REGISTRO DE MISIONES"}
                </motion.h2>

                {/* Quest list */}
                <div className="space-y-3 mb-6">
                    {projects.map((project, i) => (
                        <motion.button
                            key={i}
                            onClick={() => setSelected(i)}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ x: 4 }}
                            className={`w-full text-left border rounded px-4 py-3 transition-all ${
                                selected === i
                                    ? "border-purple-mid bg-purple-mid bg-opacity-20"
                                    : "border-purple-mid border-opacity-30 hover:border-opacity-60"
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: project.color, boxShadow: `0 0 6px ${project.color}` }}
                                    />
                                    <span className="text-white text-sm font-bold">{project.name}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-purple-mid text-xs">{project.type[lang]}</span>
                                    <span className="text-purple-green text-xs">{project.status[lang]}</span>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* Detail panel */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selected}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="border border-purple-mid rounded p-6"
                        style={{ boxShadow: "0 0 20px #6943FF22" }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-white font-bold text-xl">{projects[selected].name}</h3>
                                <p className="text-purple-mid text-xs mt-1">{projects[selected].type[lang]}</p>
                            </div>
                            {projects[selected].url && (
                                <a
                                    href={projects[selected].url}
                                    target="_blank"
                                    className="border border-purple-mid text-purple-light px-4 py-1 rounded text-xs hover:bg-purple-mid hover:text-white transition-all"
                                >
                                    {lang === "en" ? "VIEW PROJECT ↗" : "VER PROYECTO ↗"}
                                </a>
                            )}
                        </div>
                        <p className="text-purple-light text-sm leading-relaxed mb-4">
                            {projects[selected].desc[lang]}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {projects[selected].stack.map((tech, i) => (
                                <span
                                    key={i}
                                    className="text-xs px-2 py-1 rounded"
                                    style={{
                                        border: `1px solid ${projects[selected].color}44`,
                                        color: projects[selected].color,
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
