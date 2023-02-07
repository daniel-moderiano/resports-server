-- Will link with AWS Cognito to provide cognito_username
CREATE TABLE [IF NOT EXISTS] users (
  cognito_username TEXT UNIQUE NOT NULL PRIMARY KEY,
  email TEXT CI UNIQUE NOT NULL,
  created_on TIMESTAMP NOT NULL
);

