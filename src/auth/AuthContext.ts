import { createContext } from "react";
import type { User } from "@supabase/supabase-js";

export type AuthResult = { error: string | null };

export type AuthContextValue = {
    user: User | null;
    loading: boolean;
    configured: boolean;
    signInWithGitHub: () => Promise<AuthResult>;
    signInWithMagicLink: (email: string) => Promise<AuthResult>;
    signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
