import { useState, useEffect } from "react";
import Hero from "./scenes/Hero";
import About from "./scenes/About";
import Skills from "./scenes/Skills";
import Projects from "./scenes/Projects";
import Contact from "./scenes/Contact";
import AudioPlayer from "./components/AudioPlayer";
import LangToggle from "./components/LangToggle";

export type Lang = "en" | "es";

function App() {
    const [lang, setLang] = useState<Lang>("en");

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
        <div className="relative">
            <LangToggle lang={lang} setLang={setLang} />
            <AudioPlayer />
            <Hero lang={lang} />
            <About lang={lang} />
            <Skills lang={lang} />
            <Projects lang={lang} />
            <Contact lang={lang} />
        </div>
    );
}

export default App;
