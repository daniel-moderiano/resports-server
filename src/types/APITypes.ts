// This file aims to define types related to the auth0 API, particularly expected API responses or structured objects required when making API calls

// Made available when the auth0 API token is translated into a user object. This cannot, however, be assigned to the req.oidc.user property, as this is already typed
export interface RequestOIDCUser {
  given_name?: string;
  family_name?: string;
  nickname: string;
  name: string;
  picture: string;
  locale?: string;
  updated_at: string;
  email: string;
  email_verified: boolean,
  sub: string;
}

// Identitiy is a nested object within the Auth- user interface below
export interface Identities {
  connection: string;
  user_id: string;
  provider: string;
  isSocial: boolean;
}

// Full user object returned by Auth0 getUser API route
export interface Auth0User {
  email: string;
  email_verified: boolean;
  username: string;
  phone_number?: string;
  phone_verified?: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
  identities: Identities[],
  app_metadata?: {},
  user_metadata?: {},
  picture: string;
  name: string;
  nickname: string;
  multifactor?: [];
  last_ip: string;
  last_login: string;
  logins_count: number;
  blocked?: boolean;
  given_name?: string;
  family_name?: string;
  locale?: string;
}

// JSON error returned with non-status 200 errors from a number of Auth0 API routes
export interface Auth0ApiError {
  statusCode: number;
  error: string;
  message: string;
  errorCode?: string;
}

// Receive this object when requesting new Auth0 Management API JWTs
export interface APIToken {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

// Errors in fetching an API token for Auth0 management API will be of this type
export interface APITokenError {
  error: string;
  error_description: string;
}