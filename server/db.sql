DROP TABLE IF EXISTS boards;
CREATE TABLE board (
  id SERIAL NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  label TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  PRIMARY KEY(id)
);