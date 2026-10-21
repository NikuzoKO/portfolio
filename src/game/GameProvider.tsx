import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { useAuth } from "../auth/useAuth";
import { supabase } from "../lib/supabase";
import { GameContext } from "./GameContext";
import {
    CONTACT_QUEST_UNLOCK_XP,
    calculateLevel,
    calculateXp,
    isAchievementId,
} from "./gameConfig";
import type { AchievementId } from "./gameConfig";

const STORAGE_KEY = "portfolio.progress";

const readStoredProgress = (): AchievementId[] => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed: unknown = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed)
            ? parsed.filter(
                  (value): value is AchievementId =>
                      typeof value === "string" && isAchievementId(value),
              )
            : [];
    } catch {
        return [];
    }
};

const writeStoredProgress = (unlocked: AchievementId[]) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(unlocked));
    } catch {
        // storage blocked (private window): progress just lives in memory
    }
};

const mergeUnlocked = (first: AchievementId[], second: AchievementId[]) =>
    Array.from(new Set([...first, ...second]));

export default function GameProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const [unlocked, setUnlocked] = useState<AchievementId[]>(
        readStoredProgress,
    );
    const [recentUnlock, setRecentUnlock] = useState<AchievementId | null>(
        null,
    );
    const unlockedRef = useRef(unlocked);

    const persist = useCallback(
        async (nextUnlocked: AchievementId[]) => {
            unlockedRef.current = nextUnlocked;
            setUnlocked(nextUnlocked);
            writeStoredProgress(nextUnlocked);

            if (!supabase || !user) return;
            await supabase.from("progress").upsert({
                user_id: user.id,
                email: user.email ?? null,
                display_name:
                    (user.user_metadata?.user_name as string | undefined) ??
                    (user.user_metadata?.full_name as string | undefined) ??
                    null,
                unlocked: nextUnlocked,
                updated_at: new Date().toISOString(),
            });
        },
        [user],
    );

    const award = useCallback(
        (id: AchievementId) => {
            if (unlockedRef.current.includes(id)) return;
            setRecentUnlock(id);
            persist([...unlockedRef.current, id]);
        },
        [persist],
    );

    // On sign-in: merge the saved server row with whatever the guest already earned.
    useEffect(() => {
        if (!supabase || !user) return;
        const client = supabase;
        let cancelled = false;

        const syncWithServer = async () => {
            const { data } = await client
                .from("progress")
                .select("unlocked")
                .eq("user_id", user.id)
                .maybeSingle();
            if (cancelled) return;

            const serverUnlocked = ((data?.unlocked as string[] | undefined) ??
                []).filter(isAchievementId);
            const merged = mergeUnlocked(
                unlockedRef.current,
                serverUnlocked,
            );
            if (!merged.includes("signed_in")) {
                setRecentUnlock("signed_in");
                merged.push("signed_in");
            }
            await persist(merged);
        };

        syncWithServer();
        return () => {
            cancelled = true;
        };
    }, [user, persist]);

    const xp = calculateXp(unlocked);

    return (
        <GameContext.Provider
            value={{
                unlocked,
                xp,
                level: calculateLevel(xp),
                questUnlocked: xp >= CONTACT_QUEST_UNLOCK_XP,
                recentUnlock,
                award,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}
