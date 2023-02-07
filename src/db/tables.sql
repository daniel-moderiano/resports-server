-- Creates all tables for the Resports database

-- Will link with AWS Cognito to provide username
CREATE TABLE [IF NOT EXISTS] users (
  username TEXT UNIQUE NOT NULL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_on TIMESTAMP NOT NULL
);

-- Channel ID will be provided via video platform APIs
CREATE TABLE [IF NOT EXISTS] channels (
  channel_id TEXT NOT NULL PRIMARY KEY,
  platform TEXT NOT NULL
);

-- Because the combination of username and channel_id should always be unique, we should use a composite primary key
CREATE TABLE [IF NOT EXISTS] saved_channels (
  username TEXT NOT NULL,
  channel_id TEXT NOT NULL,
  PRIMARY KEY (username, channel_id),
  FOREIGN KEY (username)
    REFERENCES users (username),
  FOREIGN KEY (channel_id)
    REFERENCES channels (channel_id)
);
