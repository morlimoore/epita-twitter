export const keycloakConfig = {
  authServerUrl: process.env.KEYCLOAK_AUTH_SERVER_URL || 'http://localhost:8080/auth',
  realm: process.env.KEYCLOAK_REALM || 'epita-twitter',
  clientId: process.env.KEYCLOAK_CLIENT_ID || 'X_JavaScript',
  clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || '3960edda-5e30-4e8e-9da8-89387003ff76',
  publicKey: process.env.KEYCLOAK_PUBLIC_KEY || 'LMDISM3v5J090E5OFT28dfVrplNK9g2_ah5a6Q0RJjk',
  tokenEndpoint: process.env.KEYCLOAK_TOKEN_ENDPOINT || 'http://localhost:8080/auth/realms/epita-twitter/protocol/openid-connect/token',
  userInfoEndpoint: process.env.KEYCLOAK_USERINFO_ENDPOINT || 'http://localhost:8080/auth/realms/epita-twitter/protocol/openid-connect/userinfo',
  jwksUri: process.env.KEYCLOAK_JWKS_URI || 'http://localhost:8080/auth/realms/epita-twitter/protocol/openid-connect/certs',
}; 