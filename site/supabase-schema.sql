-- Ejecuta este SQL en Supabase → SQL Editor

create table reservations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text not null,
  date date not null,
  time text not null,
  guests integer not null,
  event_type text not null,
  notes text default '',
  status text default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  payment_status text default 'pending' check (payment_status in ('pending', 'paid', 'refunded')),
  payment_link text,
  created_at timestamptz default now()
);

-- Allow public insert (for form submissions)
alter table reservations enable row level security;

create policy "Anyone can create a reservation"
  on reservations for insert
  with check (true);

create policy "Anyone can read availability counts"
  on reservations for select
  using (true);

create policy "Anyone can update status"
  on reservations for update
  using (true);
