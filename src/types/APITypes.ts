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