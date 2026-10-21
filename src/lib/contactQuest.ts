import { supabase } from "./supabase";

export type ContactQuestInput = {
    name: string;
    company: string;
    email: string;
    message: string;
};

export type ContactQuestResult = { error: string | null };

// Inserts one row; a Supabase database webhook on this table triggers the
// `notify-contact` edge function, which emails the owner (see supabase/).
export const submitContactQuest = async (
    userId: string,
    input: ContactQuestInput,
): Promise<ContactQuestResult> => {
    if (!supabase) return { error: "Contact quest is not configured yet." };

    const { error } = await supabase.from("contact_quests").insert({
        user_id: userId,
        name: input.name.trim(),
        company: input.company.trim(),
        email: input.email.trim(),
        message: input.message.trim(),
    });
    return { error: error?.message ?? null };
};
