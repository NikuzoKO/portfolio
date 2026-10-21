export type AchievementId =
    | "seen_hero"
    | "seen_about"
    | "seen_skills"
    | "seen_projects"
    | "seen_contact"
    | "polyglot"
    | "konami"
    | "signed_in"
    | "booked_call"
    | "quest_sent";

export type Achievement = {
    title: string;
    description: string;
    xp: number;
};

export const ACHIEVEMENTS: Record<AchievementId, Achievement> = {
    seen_hero: {
        title: "Press Start",
        description: "Landed on the title screen",
        xp: 10,
    },
    seen_about: {
        title: "Lore Reader",
        description: "Read the character sheet",
        xp: 20,
    },
    seen_skills: {
        title: "Skill Tree Inspector",
        description: "Checked the skill tree",
        xp: 20,
    },
    seen_projects: {
        title: "Quest Log Opened",
        description: "Browsed the project quests",
        xp: 30,
    },
    seen_contact: {
        title: "Tavern Found",
        description: "Reached the party recruitment board",
        xp: 10,
    },
    polyglot: {
        title: "Polyglot",
        description: "Switched the language",
        xp: 25,
    },
    konami: {
        title: "Old School",
        description: "Entered the Konami code",
        xp: 50,
    },
    signed_in: {
        title: "Save Slot Created",
        description: "Signed in so progress is saved",
        xp: 30,
    },
    booked_call: {
        title: "Side Quest Accepted",
        description: "Opened the booking link",
        xp: 40,
    },
    quest_sent: {
        title: "Quest Accepted",
        description: "Sent a message through the contact quest",
        xp: 100,
    },
};

export const ACHIEVEMENT_IDS = Object.keys(ACHIEVEMENTS) as AchievementId[];

export const XP_PER_LEVEL = 100;
export const CONTACT_QUEST_UNLOCK_XP = 100;

export const isAchievementId = (value: string): value is AchievementId =>
    value in ACHIEVEMENTS;

export const calculateXp = (unlocked: AchievementId[]) =>
    unlocked.reduce((total, id) => total + ACHIEVEMENTS[id].xp, 0);

export const calculateLevel = (xp: number) => Math.floor(xp / XP_PER_LEVEL) + 1;
