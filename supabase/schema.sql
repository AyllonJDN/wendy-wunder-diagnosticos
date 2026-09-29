-- Ejecutar una sola vez en Supabase: SQL Editor -> New query -> Run.
create table if not exists public.submissions (
  id uuid primary key,
  kind text not null check (kind in ('scaling', 'pricing')),
  score smallint not null,
  answers jsonb not null,
  -- Recurso 01 · antes de escalar
  stage text,
  main_blocker text,
  goal_90_days text,
  reflection text,
  -- Recurso 02 · precio y valor
  signals smallint[],
  next_level_goal text,
  next_level_other text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Seguridad: RLS activado y SIN políticas => la clave pública (anon) no puede
-- leer ni escribir. Solo el servidor (clave secreta) puede guardar.
alter table public.submissions enable row level security;

create index if not exists submissions_kind_created_idx
  on public.submissions (kind, created_at desc);
