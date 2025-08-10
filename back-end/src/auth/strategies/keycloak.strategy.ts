import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { keycloakConfig } from '../../config/keycloak.config';

@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy, 'keycloak') {
  constructor() {
    super({
      authorizationURL: `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/auth`,
      tokenURL: keycloakConfig.tokenEndpoint,
      clientID: keycloakConfig.clientId,
      clientSecret: keycloakConfig.clientSecret,
      callbackURL: 'http://localhost:3001/auth/keycloak/callback',
      scope: 'openid profile email',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: any) {
    try {
      // Fetch user info from Keycloak
      const userInfoResponse = await fetch(keycloakConfig.userInfoEndpoint, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!userInfoResponse.ok) {
        return done(new Error('Failed to fetch user info'), null);
      }

      const userInfo = await userInfoResponse.json();
      
      const user = {
        id: userInfo.sub,
        email: userInfo.email,
        username: userInfo.preferred_username,
        firstName: userInfo.given_name,
        lastName: userInfo.family_name,
        roles: userInfo.realm_access?.roles || [],
        accessToken,
        refreshToken,
      };

      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
} 