export const environmentConfig = {
  database: {
    type: process.env.DATABASE_TYPE || 'sqlite',
    database: process.env.DATABASE_DATABASE || 'epita-twitter.db',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
  },
  keycloak: {
    authServerUrl: process.env.KEYCLOAK_AUTH_SERVER_URL || 'http://localhost:8080/auth',
    realm: process.env.KEYCLOAK_REALM || 'epita-twitter',
    clientId: process.env.KEYCLOAK_CLIENT_ID || 'epita-twitter-backend',
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || 'your-client-secret-from-keycloak',
    publicKey: process.env.KEYCLOAK_PUBLIC_KEY || 'your-public-key-from-keycloak-realm',
  },
  server: {
    port: process.env.PORT || 3001,
  },
}; 