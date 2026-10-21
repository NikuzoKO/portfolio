import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as
    | string
    | undefined;

const isPlaceholder = (value: string | undefined) =>
    !value || value.includes("YOUR-");

export const isSupabaseConfigured =
    !isPlaceholder(supabaseUrl) && !isPlaceholder(supabaseAnonKey);

export const supabase = isSupabaseConfigured
    ? createClient(supabaseUrl as string, supabaseAnonKey as string)
    : null;

export const bookingUrl = import.meta.env.VITE_BOOKING_URL as
    | string
    | undefined;

export const hasBookingUrl = !isPlaceholder(bookingUrl);
