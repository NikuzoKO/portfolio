import type { Lang } from "../App";

export default function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
    return (
        <div className="fixed top-4 right-4 z-50 flex gap-2 font-mono text-xs">
            <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded border transition-all ${
                    lang === "en"
                        ? "border-purple-accent text-purple-accent"
                        : "border-purple-mid text-purple-mid hover:border-purple-light"
                }`}
            >
                EN
            </button>
            <button
                onClick={() => setLang("es")}
                className={`px-3 py-1 rounded border transition-all ${
                    lang === "es"
                        ? "border-purple-accent text-purple-accent"
                        : "border-purple-mid text-purple-mid hover:border-purple-light"
                }`}
            >
                ES
            </button>
        </div>
    );
}
