import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { keycloakConfig } from '../../config/keycloak.config';
import * as jwksClient from 'jwks-client';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class KeycloakJwtStrategy extends PassportStrategy(Strategy, 'keycloak-jwt') {
  private jwksClient: any;

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: (request, token, done) => {
        // Initialize JWKS client if not already done
        if (!this.jwksClient) {
          this.jwksClient = jwksClient.JwksClient({
            jwksUri: keycloakConfig.jwksUri,
            cache: true,
            cacheMaxEntries: 5,
            cacheMaxAge: 600000, // 10 minutes in milliseconds
          });
        }

        // Get the key ID from the token header
        const decoded = jwt.decode(token, { complete: true });
        if (!decoded || !decoded.header.kid) {
          return done(new Error('Invalid token'), null);
        }

        // Fetch the public key from JWKS
        this.jwksClient.getSigningKey(decoded.header.kid, (err, key) => {
          if (err) {
            return done(err, null);
          }
          const signingKey = key.publicKey || key.rsaPublicKey;
          return done(null, signingKey);
        });
      },
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      username: payload.preferred_username,
      firstName: payload.given_name,
      lastName: payload.family_name,
      roles: payload.realm_access?.roles || [],
    };
  }
} 