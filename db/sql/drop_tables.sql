DROP TABLE IF EXISTS register_user;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS news;
DROP TABLE IF EXISTS locale;
DROP TABLE IF EXISTS news_type;

DROP INDEX idx_news_id ON news;
DROP INDEX idx_news_type ON news;
DROP INDEX idx_locale ON news;
DROP INDEX idx_fk_locale ON locale;
DROP INDEX idx_fk_news_type ON news_type;