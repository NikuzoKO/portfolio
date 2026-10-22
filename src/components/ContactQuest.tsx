import { useState } from "react";

import { useAuth } from "../auth/useAuth";
import { useGame } from "../game/useGame";
import { ACHIEVEMENTS, CONTACT_QUEST_UNLOCK_XP } from "../game/gameConfig";
import { bookingUrl, hasBookingUrl } from "../lib/supabase";
import { submitContactQuest } from "../lib/contactQuest";

type SubmitStatus = "idle" | "sending" | "sent" | "error";

// Logic-wired placeholder: restyle/re-layout freely, the hooks are the contract.
export default function ContactQuest() {
    const { user } = useAuth();
    const { xp, questUnlocked, hints, award } = useGame();
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<SubmitStatus>("idle");
    const [errorText, setErrorText] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!user) return;
        setStatus("sending");
        const { error } = await submitContactQuest(user.id, {
            name,
            company,
            email,
            message,
        });
        if (error) {
            setErrorText(error);
            setStatus("error");
            return;
        }
        setErrorText(null);
        setStatus("sent");
        award("quest_sent");
    };

    return (
        <div>
            {hasBookingUrl && (
                <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => award("booked_call")}
                >
                    Book a call
                </a>
            )}

            {!questUnlocked ? (
                <div>
                    <p>
                        Contact quest locked: {xp}/{CONTACT_QUEST_UNLOCK_XP} XP.
                    </p>
                    {hints.slice(0, 2).map((hint) => (
                        <p key={hint}>
                            Try: {ACHIEVEMENTS[hint].title} (+
                            {ACHIEVEMENTS[hint].xp} XP), {ACHIEVEMENTS[hint].description}
                        </p>
                    ))}
                </div>
            ) : !user ? (
                <p>Sign in (top HUD) to accept the quest.</p>
            ) : status === "sent" ? (
                <p>Quest accepted. I'll reply soon.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Your name"
                        required
                    />
                    <input
                        value={company}
                        onChange={(event) => setCompany(event.target.value)}
                        placeholder="Company"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Reply-to email"
                        required
                    />
                    <textarea
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="What's the quest?"
                        required
                    />
                    <button type="submit" disabled={status === "sending"}>
                        Accept quest
                    </button>
                    {errorText && <p>{errorText}</p>}
                </form>
            )}
        </div>
    );
}
