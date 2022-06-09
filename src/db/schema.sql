-- We would normally use CHAR(n) for password, where n is the length of the hash 

-- Users will be authenticated using 3rd party software, but will be cross-referenced here
CREATE TABLE users (
  user_id serial PRIMARY KEY,
  user_email TEXT NOT NULL UNIQUE
);

-- Consider description, logo_url, etc
CREATE TABLE channels (
  channel_id serial PRIMARY KEY,
  channel_name TEXT
);

-- Join table connecting users with channels
CREATE TABLE subscriptions (
  subscription_id serial PRIMARY KEY,
  user_id INT REFERENCES users(user_id),
  channel_id INT REFERENCES channels(channel_id)
);