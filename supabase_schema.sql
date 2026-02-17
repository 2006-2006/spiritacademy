
-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- PROFILES TABLE
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on public.profiles for update
  using ( auth.uid() = id );

-- TRIGGER TO CREATE PROFILE ON SIGNUP
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- COURSES TABLE
create table if not exists public.courses (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  image_url text,
  category text,
  difficulty text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.courses enable row level security;
create policy "Courses are viewable by everyone." on public.courses for select using (true);

-- USER PROGRESS TABLE
create table if not exists public.user_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  course_id uuid references public.courses not null,
  progress_percentage integer default 0,
  completed boolean default false,
  last_accessed timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, course_id)
);

alter table public.user_progress enable row level security;
create policy "Users can view own progress." on public.user_progress for select using (auth.uid() = user_id);
create policy "Users can update own progress." on public.user_progress for insert with check (auth.uid() = user_id);
create policy "Users can update own progress update." on public.user_progress for update using (auth.uid() = user_id);

-- CHAT HISTORY TABLE
create table if not exists public.chat_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  message text not null,
  response text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.chat_history enable row level security;
create policy "Users can view own chat history." on public.chat_history for select using (auth.uid() = user_id);
create policy "Users can insert own chat history." on public.chat_history for insert with check (auth.uid() = user_id);

-- SEED DATA (Optional)
insert into public.courses (title, description, category, difficulty)
values 
('Neural Networks 101', 'Introduction to Neural Networks and Deep Learning', 'AI', 'Beginner'),
('Quantum Computing Basics', 'Understanding Qubits and Superposition', 'Quantum', 'Intermediate'),
('Collective Intelligence', 'Swarm Theory and Distributed Systems', 'Theory', 'Advanced')
on conflict do nothing;
