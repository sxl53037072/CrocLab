-- CrocLab Supabase Schema
-- Run this in Supabase SQL Editor to set up all required tables

-- 1. Profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- 2. Favorites table
create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  article_slug text not null,
  article_title text,
  article_lang text default 'en',
  created_at timestamptz default now(),
  unique(user_id, article_slug)
);

alter table public.favorites enable row level security;

create policy "Users can view their own favorites"
  on public.favorites for select using (auth.uid() = user_id);

create policy "Users can insert their own favorites"
  on public.favorites for insert with check (auth.uid() = user_id);

create policy "Users can delete their own favorites"
  on public.favorites for delete using (auth.uid() = user_id);

-- 3. Visit history table
create table if not exists public.visit_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  page_path text not null,
  page_title text,
  visited_at timestamptz default now()
);

alter table public.visit_history enable row level security;

create policy "Users can view their own history"
  on public.visit_history for select using (auth.uid() = user_id);

create policy "Users can insert their own history"
  on public.visit_history for insert with check (auth.uid() = user_id);

create policy "Users can delete their own history"
  on public.visit_history for delete using (auth.uid() = user_id);

-- 4. Feature requests table
-- Each row is one user's submission: a short app name + description.
-- Submissions with the same normalized name are grouped on the wall.
-- Each user can submit up to 3 wishes.
create table if not exists public.feature_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  app_name text not null check (char_length(app_name) <= 30),
  app_name_normalized text not null,
  description text not null check (char_length(description) <= 500),
  created_at timestamptz default now()
);

alter table public.feature_requests enable row level security;

create policy "Feature requests are viewable by everyone"
  on public.feature_requests for select using (true);

create policy "Authenticated users can create feature requests"
  on public.feature_requests for insert with check (auth.uid() = user_id);

create policy "Users can delete their own feature requests"
  on public.feature_requests for delete using (auth.uid() = user_id);

-- 5. Feature votes table
-- Users vote on a normalized app name, not individual submissions
create table if not exists public.feature_votes (
  id uuid primary key default gen_random_uuid(),
  app_name_normalized text not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(app_name_normalized, user_id)
);

alter table public.feature_votes enable row level security;

create policy "Votes are viewable by everyone"
  on public.feature_votes for select using (true);

create policy "Authenticated users can vote"
  on public.feature_votes for insert with check (auth.uid() = user_id);

create policy "Users can remove their own votes"
  on public.feature_votes for delete using (auth.uid() = user_id);

-- Indexes for performance
create index if not exists idx_favorites_user_id on public.favorites(user_id);
create index if not exists idx_visit_history_user_id on public.visit_history(user_id);
create index if not exists idx_visit_history_visited_at on public.visit_history(visited_at desc);
create index if not exists idx_feature_requests_normalized on public.feature_requests(app_name_normalized);
create index if not exists idx_feature_requests_user_id on public.feature_requests(user_id);
create index if not exists idx_feature_votes_normalized on public.feature_votes(app_name_normalized);
