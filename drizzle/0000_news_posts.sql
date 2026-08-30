CREATE TABLE IF NOT EXISTS news_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TEXT,
  version TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL,
  summary_en TEXT NOT NULL,
  content_en TEXT NOT NULL,
  title_fr TEXT NOT NULL,
  summary_fr TEXT NOT NULL,
  content_fr TEXT NOT NULL,
  author_email TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_news_posts_status_published_at
ON news_posts(status, published_at DESC);

PRAGMA optimize;
