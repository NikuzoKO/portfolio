import { useEffect, useRef, useState } from "react";
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
        url: "",
        private: true,
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
        private: true,
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
        private: true,
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
        url: "",
        private: true,
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
    {
        name: "CURRICULUM",
        status: { en: "TypeScript", es: "TypeScript" },
        type: { en: "SIDE QUEST", es: "MISIÓN SECUNDARIA" },
        desc: {
            en: "Interactive CV, also rendered to the PDF behind the Download CV button.",
            es: "CV interactivo, también renderizado al PDF del botón Descargar CV.",
        },
        stack: ["TypeScript"],
        url: "https://github.com/NikuzoKO/curriculum",
        color: "#FF628C",
    },
    {
        name: "PORTFOLIO",
        status: { en: "TypeScript", es: "TypeScript" },
        type: { en: "SIDE QUEST", es: "MISIÓN SECUNDARIA" },
        desc: {
            en: "This site — React, Tailwind and a Supabase-backed XP system.",
            es: "Este sitio — React, Tailwind y un sistema de XP con Supabase.",
        },
        stack: ["TypeScript"],
        url: "https://github.com/NikuzoKO/portfolio",
        color: "#3AD900",
    },
    {
        name: "GLYPHFALL",
        status: { en: "Python", es: "Python" },
        type: { en: "SIDE QUEST", es: "MISIÓN SECUNDARIA" },
        desc: {
            en: "Terminal ARPG: classless skill-swap builds, affix loot, infinite passive grid. Python curses/pygame, web build via pygbag.",
            es: "ARPG de terminal: builds sin clases con habilidades intercambiables, loot con afijos, grilla pasiva infinita. Python curses/pygame, build web con pygbag.",
        },
        stack: ["Python"],
        url: "https://github.com/NikuzoKO/glyphfall",
        color: "#6943FF",
    },
    {
        name: "PMOS MOTO G06",
        status: { en: "Python", es: "Python" },
        type: { en: "SIDE QUEST", es: "MISIÓN SECUNDARIA" },
        desc: {
            en: "WIP postmarketOS port for the Motorola Moto G06 (lagos, MT6768): boots to systemd on the stock GKI kernel + vendor modules.",
            es: "Port de postmarketOS en desarrollo para el Motorola Moto G06 (lagos, MT6768): arranca a systemd con el kernel GKI de stock + módulos del vendor.",
        },
        stack: ["Python"],
        url: "https://github.com/NikuzoKO/pmos-moto-g06-lagos",
        color: "#FAD000",
    },
    {
        name: "ANDROID TRANSLATION LAYER",
        status: { en: "Java", es: "Java" },
        type: { en: "SIDE QUEST", es: "MISIÓN SECUNDARIA" },
        desc: {
            en: "Fork of Android Translation Layer with fixes to run WhatsApp on a Linux phone.",
            es: "Fork de Android Translation Layer con arreglos para correr WhatsApp en un teléfono Linux.",
        },
        stack: ["Java"],
        url: "https://github.com/NikuzoKO/android_translation_layer",
        color: "#FB94FF",
    },
    {
        name: "BIONIC TRANSLATION",
        status: { en: "C", es: "C" },
        type: { en: "SIDE QUEST", es: "MISIÓN SECUNDARIA" },
        desc: {
            en: "Fork of bionic_translation with libc fixes (getaddrinfo/getnameinfo flags, readdir) found running WhatsApp via ATL.",
            es: "Fork de bionic_translation con arreglos de libc (flags de getaddrinfo/getnameinfo, readdir) encontrados al correr WhatsApp vía ATL.",
        },
        stack: ["C"],
        url: "https://github.com/NikuzoKO/bionic_translation",
        color: "#FF628C",
    },
    {
        name: "MTG CARD ART VIEWER",
        status: { en: "JavaScript", es: "JavaScript" },
        type: { en: "SIDE QUEST", es: "MISIÓN SECUNDARIA" },
        desc: {
            en: "Public repository on GitHub.",
            es: "Repositorio público en GitHub.",
        },
        stack: ["JavaScript"],
        url: "https://github.com/NikuzoKO/mtgCardArtViewer",
        color: "#3AD900",
    },
    {
        name: "TOO HEAVY PROJECT",
        status: { en: "C#", es: "C#" },
        type: { en: "SIDE QUEST", es: "MISIÓN SECUNDARIA" },
        desc: {
            en: "Videogame about shooting physics.",
            es: "Videojuego sobre física de disparos.",
        },
        stack: ["C#"],
        url: "",
        private: true,
        color: "#6943FF",
    },
    {
        name: "RPG PROJECT",
        status: { en: "JavaScript", es: "JavaScript" },
        type: { en: "SIDE QUEST", es: "MISIÓN SECUNDARIA" },
        desc: {
            en: "Private repository.",
            es: "Repositorio privado.",
        },
        stack: ["JavaScript"],
        url: "",
        private: true,
        color: "#FAD000",
    },
    {
        name: "PLAYME",
        status: { en: "CSS", es: "CSS" },
        type: { en: "SIDE QUEST", es: "MISIÓN SECUNDARIA" },
        desc: {
            en: "Private repository.",
            es: "Repositorio privado.",
        },
        stack: ["CSS"],
        url: "",
        private: true,
        color: "#FB94FF",
    },
    {
        name: "IDLE PROJECT",
        status: { en: "JavaScript", es: "JavaScript" },
        type: { en: "SIDE QUEST", es: "MISIÓN SECUNDARIA" },
        desc: {
            en: "Private repository.",
            es: "Repositorio privado.",
        },
        stack: ["JavaScript"],
        url: "",
        private: true,
        color: "#FF628C",
    },
    {
        name: "DUNGEON CRAWLER PUZZLE GAME",
        status: { en: "C#", es: "C#" },
        type: { en: "SIDE QUEST", es: "MISIÓN SECUNDARIA" },
        desc: {
            en: "Walking simulator.",
            es: "Simulador de caminata.",
        },
        stack: ["C#"],
        url: "",
        private: true,
        color: "#3AD900",
    },
    {
        name: "DETECTIVE GAME",
        status: { en: "C#", es: "C#" },
        type: { en: "SIDE QUEST", es: "MISIÓN SECUNDARIA" },
        desc: {
            en: "Private repository.",
            es: "Repositorio privado.",
        },
        stack: ["C#"],
        url: "",
        private: true,
        color: "#6943FF",
    },
    {
        name: "MTG UNIFICATED APP",
        status: { en: "JavaScript", es: "JavaScript" },
        type: { en: "SIDE QUEST", es: "MISIÓN SECUNDARIA" },
        desc: {
            en: "An MTG app to have everything a Magic player needs.",
            es: "Una app de MTG con todo lo que necesita un jugador de Magic.",
        },
        stack: ["JavaScript"],
        url: "",
        private: true,
        color: "#FAD000",
    },
    {
        name: "DOGMA",
        status: { en: "JavaScript", es: "JavaScript" },
        type: { en: "SIDE QUEST", es: "MISIÓN SECUNDARIA" },
        desc: {
            en: "Puzzle videogame on React.",
            es: "Videojuego de puzzles en React.",
        },
        stack: ["JavaScript"],
        url: "",
        private: true,
        color: "#FB94FF",
    },
    {
        name: "EJERCICIO 17",
        status: { en: "JavaScript", es: "JavaScript" },
        type: { en: "SIDE QUEST", es: "MISIÓN SECUNDARIA" },
        desc: {
            en: "Private repository.",
            es: "Repositorio privado.",
        },
        stack: ["JavaScript"],
        url: "",
        private: true,
        color: "#FF628C",
    },
];

export default function Projects({ lang }: { lang: Lang }) {
    const [selected, setSelected] = useState(0);
    const [canScrollUp, setCanScrollUp] = useState(false);
    const [canScrollDown, setCanScrollDown] = useState(false);
    const questListRef = useRef<HTMLDivElement>(null);

    const updateScrollFade = () => {
        const questList = questListRef.current;
        if (!questList) return;
        setCanScrollUp(questList.scrollTop > 4);
        setCanScrollDown(
            questList.scrollTop + questList.clientHeight < questList.scrollHeight - 4,
        );
    };

    useEffect(() => {
        updateScrollFade();
        window.addEventListener("resize", updateScrollFade);
        return () => window.removeEventListener("resize", updateScrollFade);
    }, []);

    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen bg-purple-dark px-6 py-12 sm:py-14">
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
                    className="text-4xl font-bold text-white mb-4 sm:mb-8"
                    style={{ textShadow: "0 0 20px #6943FF" }}
                >
                    {lang === "en" ? "QUEST LOG" : "REGISTRO DE MISIONES"}
                </motion.h2>

                {/* Quest list */}
                <div className="relative mb-6">
                    <div
                        ref={questListRef}
                        onScroll={updateScrollFade}
                        className="space-y-3 max-h-[34vh] sm:max-h-[42vh] overflow-y-scroll quest-scroll overscroll-contain pr-2"
                    >
                        {projects.map((project, i) => (
                            <motion.button
                                key={i}
                                onClick={() => setSelected(i)}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: Math.min(i, 6) * 0.08 }}
                                whileHover={{ x: 4 }}
                                className={`w-full text-left border rounded px-4 py-3 transition-all ${
                                    selected === i
                                        ? "border-purple-mid bg-purple-mid/20"
                                        : "border-purple-mid/30 hover:border-purple-mid/60"
                                }`}
                            >
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-3">
                                        <span
                                            className="w-2 h-2 rounded-full mr-0 shrink-0"
                                            style={{ backgroundColor: project.color, boxShadow: `0 0 6px ${project.color}` }}
                                        />
                                        <span className="text-white text-sm font-bold mr-0">{project.name}</span>
                                        {project.private && (
                                            <span
                                                className="text-xs mr-0"
                                                title={lang === "en" ? "Private repository" : "Repositorio privado"}
                                                aria-label={lang === "en" ? "Private repository" : "Repositorio privado"}
                                            >
                                                🔒
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pl-5 sm:pl-0">
                                        <span className="text-purple-mid text-xs mr-0">{project.type[lang]}</span>
                                        <span className="text-purple-green text-xs mr-0">{project.status[lang]}</span>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                    <div
                        className={`pointer-events-none absolute -left-4 right-[8px] top-0 h-16 backdrop-blur-[8px] bg-gradient-to-b from-purple-dark to-transparent transition-opacity duration-200 ${canScrollUp ? "opacity-100" : "opacity-0"}`}
                        style={{ maskImage: "linear-gradient(to bottom, black, transparent)", WebkitMaskImage: "linear-gradient(to bottom, black, transparent)" }}
                    />
                    <div
                        className={`pointer-events-none absolute -left-4 right-[8px] bottom-0 h-16 backdrop-blur-[8px] bg-gradient-to-t from-purple-dark to-transparent transition-opacity duration-200 ${canScrollDown ? "opacity-100" : "opacity-0"}`}
                        style={{ maskImage: "linear-gradient(to top, black, transparent)", WebkitMaskImage: "linear-gradient(to top, black, transparent)" }}
                    />
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
                            <div className="flex flex-wrap items-center justify-end gap-2">
                                {projects[selected].private && (
                                    <span className="text-purple-light text-xs mr-0 border border-purple-mid/50 px-3 py-1 rounded">
                                        🔒 {lang === "en" ? "PRIVATE REPO" : "REPO PRIVADO"}
                                    </span>
                                )}
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
