-- Run once in the Supabase SQL editor (Project -> SQL Editor).
-- Admin = the owner's email in the signed JWT; change it below if needed.

create or replace function public.is_admin() returns boolean
language sql stable as $$
    select coalesce(auth.jwt() ->> 'email', '') = 'buelaniki@gmail.com'
$$;

-- One row per signed-in visitor: unlocked achievements = the "visit log".
create table if not exists public.progress (
    user_id uuid primary key references auth.users on delete cascade,
    email text,
    display_name text,
    unlocked text[] not null default '{}',
    updated_at timestamptz not null default now()
);

alter table public.progress enable row level security;

create policy "own progress: read" on public.progress
    for select using (auth.uid() = user_id or public.is_admin());
create policy "own progress: insert" on public.progress
    for insert with check (auth.uid() = user_id);
create policy "own progress: update" on public.progress
    for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Messages sent through the contact quest. Only signed-in users may insert,
-- only the owner may read.
create table if not exists public.contact_quests (
    id bigint generated always as identity primary key,
    user_id uuid not null references auth.users on delete cascade,
    name text not null check (char_length(name) between 1 and 120),
    company text not null default '' check (char_length(company) <= 120),
    email text not null check (char_length(email) between 3 and 254),
    message text not null check (char_length(message) between 1 and 4000),
    created_at timestamptz not null default now()
);

alter table public.contact_quests enable row level security;

create policy "quests: insert own" on public.contact_quests
    for insert with check (auth.uid() = user_id);
create policy "quests: admin read" on public.contact_quests
    for select using (public.is_admin());

-- Private visit log for the owner: newest activity first.
create or replace view public.visit_log
    with (security_invoker = true) as
    select email, display_name, unlocked, cardinality(unlocked) as achievements, updated_at
    from public.progress
    order by updated_at desc;
