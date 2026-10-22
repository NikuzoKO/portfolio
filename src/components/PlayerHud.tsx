import { useState } from "react";

import { useAuth } from "../auth/useAuth";
import { useGame } from "../game/useGame";
import { ACHIEVEMENTS, XP_PER_LEVEL } from "../game/gameConfig";

// Logic-wired placeholder: restyle/re-layout freely, the hooks are the contract.
export default function PlayerHud() {
    const { user, configured, signInWithGitHub, signInWithMagicLink, signOut } =
        useAuth();
    const { xp, level, recentUnlock } = useGame();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [expanded, setExpanded] = useState(false);

    const handleMagicLink = async (event: React.FormEvent) => {
        event.preventDefault();
        const { error } = await signInWithMagicLink(email);
        setMessage(error ?? "Check your email for the sign-in link.");
    };

    const handleGitHub = async () => {
        const { error } = await signInWithGitHub();
        if (error) setMessage(error);
    };

    return (
        <div>
            <button onClick={() => setExpanded((current) => !current)}>
                LV {level} · {xp} XP {expanded ? "▾" : "▸"}
            </button>
            {recentUnlock && (
                <p>Achievement: {ACHIEVEMENTS[recentUnlock].title}</p>
            )}
            {expanded && (
                <p>
                    {xp % XP_PER_LEVEL}/{XP_PER_LEVEL} XP to next level
                </p>
            )}
            {expanded && (user ? (
                <button onClick={signOut}>Sign out ({user.email})</button>
            ) : (
                <div>
                    <button onClick={handleGitHub} disabled={!configured}>
                        Save progress with GitHub
                    </button>
                    <form onSubmit={handleMagicLink}>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="you@company.com"
                            required
                        />
                        <button type="submit" disabled={!configured}>
                            Email me a link
                        </button>
                    </form>
                    {!configured && <p>Login not configured yet.</p>}
                </div>
            ))}
            {expanded && message && <p>{message}</p>}
        </div>
    );
}
