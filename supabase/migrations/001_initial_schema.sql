-- ToolBaseAI — Initial Schema Migration
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql

-- ────────────────────────────────────────────────────────────────────────────
-- TOOLS TABLE
-- ────────────────────────────────────────────────────────────────────────────
create table if not exists public.tools (
  id                bigserial primary key,
  name              text not null,
  slug              text not null unique,
  logo_letter       text,
  logo_color        text,
  tagline           text,
  description       text,
  category          text not null,
  pricing_type      text check (pricing_type in ('free', 'freemium', 'paid')),
  has_free_tier     boolean default false,
  affiliate_url     text,
  discount_code     text,
  discount_text     text,
  g2_rating         numeric(3,1) check (g2_rating >= 0 and g2_rating <= 5),
  g2_review_count   integer default 0,
  best_for          text[] default '{}',
  is_sponsored      boolean default false,
  is_featured       boolean default false,
  created_at        timestamptz default now()
);

-- Index for fast category lookups
create index if not exists tools_category_idx on public.tools(category);
-- Index for sponsored/featured listings
create index if not exists tools_featured_idx on public.tools(is_featured, is_sponsored);

-- ────────────────────────────────────────────────────────────────────────────
-- REVIEWS TABLE
-- ────────────────────────────────────────────────────────────────────────────
create table if not exists public.reviews (
  id              bigserial primary key,
  tool_id         bigint not null references public.tools(id) on delete cascade,
  reviewer_name   text not null,
  rating          smallint not null check (rating >= 1 and rating <= 5),
  body            text not null,
  approved        boolean default false,
  created_at      timestamptz default now()
);

-- Index for fetching reviews per tool
create index if not exists reviews_tool_id_idx on public.reviews(tool_id, approved);

-- ────────────────────────────────────────────────────────────────────────────
-- SUBMISSIONS TABLE
-- ────────────────────────────────────────────────────────────────────────────
create table if not exists public.submissions (
  id                    bigserial primary key,
  company_name          text not null,
  tool_name             text not null,
  website_url           text not null,
  category              text not null,
  description           text,
  affiliate_url         text,
  discount_offer        text,
  contact_email         text not null,
  apply_sponsored       boolean default false,
  apply_newsletter      boolean default false,
  status                text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at            timestamptz default now()
);

-- ────────────────────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ────────────────────────────────────────────────────────────────────────────

-- Enable RLS
alter table public.tools enable row level security;
alter table public.reviews enable row level security;
alter table public.submissions enable row level security;

-- TOOLS: Public read access
create policy "Tools are publicly readable"
  on public.tools for select
  using (true);

-- REVIEWS: Public read for approved reviews only
create policy "Approved reviews are publicly readable"
  on public.reviews for select
  using (approved = true);

-- REVIEWS: Anyone can insert (submit a review)
create policy "Anyone can submit a review"
  on public.reviews for insert
  with check (true);

-- SUBMISSIONS: Anyone can insert a tool submission
create policy "Anyone can submit a tool"
  on public.submissions for insert
  with check (true);

-- ────────────────────────────────────────────────────────────────────────────
-- COMMENTS
-- ────────────────────────────────────────────────────────────────────────────
comment on table public.tools is 'AI tool listings for the ToolBaseAI marketplace';
comment on table public.reviews is 'Community reviews — moderated via approved flag in Supabase dashboard';
comment on table public.submissions is 'Vendor tool submissions — moderated via status field in Supabase dashboard';
comment on column public.reviews.approved is 'Set to true in Supabase dashboard to publish review publicly';
comment on column public.submissions.status is 'pending | approved | rejected — managed in Supabase dashboard';
