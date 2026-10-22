import { useState, useEffect } from "react";
import Hero from "./scenes/Hero";
import About from "./scenes/About";
import Skills from "./scenes/Skills";
import Projects from "./scenes/Projects";
import Contact from "./scenes/Contact";
import AudioPlayer from "./components/AudioPlayer";
import LangToggle from "./components/LangToggle";
import PlayerHud from "./components/PlayerHud";
import TrackedSection from "./game/TrackedSection";
import { useGame, useKonami } from "./game/useGame";

export type Lang = "en" | "es";

function App() {
    const [lang, setLang] = useState<Lang>("en");
    const { award } = useGame();

    useKonami(() => award("konami"));

    useEffect(() => {
        if (lang !== "en") award("polyglot");
    }, [lang, award]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "l" || e.key === "L") {
                setLang((prev) => (prev === "en" ? "es" : "en"));
            }
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, []);

    return (
        <div className="relative overflow-x-clip">
            <LangToggle lang={lang} setLang={setLang} />
            <AudioPlayer />
            <div className="fixed bottom-4 left-4 z-50 max-w-[calc(100vw-8rem)] text-xs text-white">
                <PlayerHud />
            </div>
            <TrackedSection achievement="seen_hero">
                <Hero lang={lang} />
            </TrackedSection>
            <TrackedSection achievement="seen_about">
                <About lang={lang} />
            </TrackedSection>
            <TrackedSection achievement="seen_skills">
                <Skills lang={lang} />
            </TrackedSection>
            <TrackedSection achievement="seen_projects">
                <Projects lang={lang} />
            </TrackedSection>
            <TrackedSection achievement="seen_contact">
                <Contact lang={lang} />
            </TrackedSection>
        </div>
    );
}

export default App;
