import jwt, { expressjwt } from "express-jwt";
import jwksRsa from "jwks-rsa";

const secret = jwksRsa.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `https://dev-c0yb5cr7.us.auth0.com/.well-known/jwks.json`,
}) as jwt.GetVerificationKey;

// Authentication middleware
export const checkJwt = expressjwt({
  secret,
  audience: "https://auth0-jwt-authorizer",
  issuer: `https://dev-c0yb5cr7.us.auth0.com/`,
  algorithms: ["RS256"],
});
