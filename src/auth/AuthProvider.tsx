import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "@supabase/supabase-js";

import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { AuthContext } from "./AuthContext";
import type { AuthResult } from "./AuthContext";

const NOT_CONFIGURED: AuthResult = { error: "Login is not configured yet." };

const getRedirectUrl = () => window.location.origin + import.meta.env.BASE_URL;

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(isSupabaseConfigured);

    useEffect(() => {
        if (!supabase) return;

        supabase.auth.getSession().then(({ data }) => {
            setUser(data.session?.user ?? null);
            setLoading(false);
        });

        const { data: subscription } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            },
        );

        return () => subscription.subscription.unsubscribe();
    }, []);

    const signInWithGitHub = async (): Promise<AuthResult> => {
        if (!supabase) return NOT_CONFIGURED;
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: { redirectTo: getRedirectUrl() },
        });
        return { error: error?.message ?? null };
    };

    const signInWithMagicLink = async (email: string): Promise<AuthResult> => {
        if (!supabase) return NOT_CONFIGURED;
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: { emailRedirectTo: getRedirectUrl() },
        });
        return { error: error?.message ?? null };
    };

    const signOut = async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                configured: isSupabaseConfigured,
                signInWithGitHub,
                signInWithMagicLink,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
