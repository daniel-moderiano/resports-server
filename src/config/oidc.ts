// This import is written as a require statement to avoid TS import module errors
const { ExpressOIDC } = require('@okta/oidc-middleware')
import 'dotenv/config'


// Create the OIDC client
const oidc = new ExpressOIDC({
  client_id: process.env.OKTA_CLIENT_ID,
  client_secret: process.env.OKTA_CLIENT_SECRET,
  issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
  redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
  appBaseUrl: `${process.env.HOST_URL}`,
  scope: "openid profile"
});

export default oidc;