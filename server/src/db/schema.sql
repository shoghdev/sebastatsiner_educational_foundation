CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role VARCHAR(10) NOT NULL CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS programs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  short_description TEXT,
  full_content TEXT,
  status VARCHAR(10) NOT NULL DEFAULT 'ongoing' CHECK (status IN ('ongoing', 'completed')),
  cover_image_url TEXT,
  gallery_urls JSONB NOT NULL DEFAULT '[]',
  start_date DATE,
  end_date DATE,
  is_published BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  category VARCHAR(15) NOT NULL DEFAULT 'news' CHECK (category IN ('news', 'event', 'announcement')),
  cover_image_url TEXT,
  published_at TIMESTAMPTZ,
  is_published BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS opportunities (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(15) NOT NULL CHECK (type IN ('scholarship', 'grant', 'contest')),
  description TEXT,
  requirements TEXT,
  deadline DATE,
  apply_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS reports (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  year INT NOT NULL,
  type VARCHAR(10) NOT NULL CHECK (type IN ('annual', 'financial')),
  file_url TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS partners (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  description TEXT,
  order_index INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS team_members (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  position VARCHAR(150),
  bio TEXT,
  photo_url TEXT,
  "group" VARCHAR(10) NOT NULL DEFAULT 'staff' CHECK ("group" IN ('staff', 'board')),
  order_index INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS impact_stats (
  id SERIAL PRIMARY KEY,
  label VARCHAR(150) NOT NULL,
  value VARCHAR(50) NOT NULL,
  icon_name VARCHAR(50),
  order_index INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  sender_name VARCHAR(150) NOT NULL,
  sender_email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_news_published ON news (is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_programs_status ON programs (status, is_published);
