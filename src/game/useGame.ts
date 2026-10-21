import { useContext, useEffect } from "react";

import { GameContext } from "./GameContext";

const KONAMI_SEQUENCE = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
];

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) throw new Error("useGame must be used inside GameProvider");
    return context;
};

export const useKonami = (onSuccess: () => void) => {
    useEffect(() => {
        let position = 0;
        const handleKey = (event: KeyboardEvent) => {
            const expected = KONAMI_SEQUENCE[position];
            const pressed =
                event.key.length === 1 ? event.key.toLowerCase() : event.key;
            if (pressed === expected) {
                position += 1;
                if (position === KONAMI_SEQUENCE.length) {
                    position = 0;
                    onSuccess();
                }
            } else {
                position = pressed === KONAMI_SEQUENCE[0] ? 1 : 0;
            }
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [onSuccess]);
};
