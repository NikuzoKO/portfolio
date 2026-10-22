import { createContext } from "react";

import type { AchievementId } from "./gameConfig";

export type GameContextValue = {
    unlocked: AchievementId[];
    xp: number;
    level: number;
    questUnlocked: boolean;
    hints: AchievementId[];
    recentUnlock: AchievementId | null;
    award: (id: AchievementId) => void;
};

export const GameContext = createContext<GameContextValue | null>(null);
