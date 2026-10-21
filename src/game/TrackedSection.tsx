import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

import { useGame } from "./useGame";
import type { AchievementId } from "./gameConfig";

// Wrapper that awards an achievement the first time the section is mostly on screen.
export default function TrackedSection({
    achievement,
    children,
}: {
    achievement: AchievementId;
    children: ReactNode;
}) {
    const { award } = useGame();
    const wrapperReference = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = wrapperReference.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    award(achievement);
                    observer.disconnect();
                }
            },
            { threshold: 0.4 },
        );
        observer.observe(element);
        return () => observer.disconnect();
    }, [achievement, award]);

    return <div ref={wrapperReference}>{children}</div>;
}
