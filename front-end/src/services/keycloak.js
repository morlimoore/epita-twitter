import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8080/auth',
  realm: 'epita-twitter',
  clientId: 'X_JavaScript',
};

class KeycloakService {
  constructor() {
    this.keycloak = new Keycloak(keycloakConfig);
    this.authenticated = false;
    this.token = null;
  }

  async init() {
    try {
      const authenticated = await this.keycloak.init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        checkLoginIframe: false,
      });

      this.authenticated = authenticated;
      if (authenticated) {
        this.token = this.keycloak.token;
        this.setupTokenRefresh();
      }

      return authenticated;
    } catch (error) {
      console.error('Keycloak initialization failed:', error);
      return false;
    }
  }

  setupTokenRefresh() {
    this.keycloak.onTokenExpired = () => {
      this.keycloak.updateToken(70).then((refreshed) => {
        if (refreshed) {
          this.token = this.keycloak.token;
          console.log('Token refreshed');
        }
      }).catch(() => {
        console.error('Token refresh failed');
        this.logout();
      });
    };
  }

  async login() {
    try {
      await this.keycloak.login({
        redirectUri: window.location.origin,
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  async logout() {
    try {
      await this.keycloak.logout({
        redirectUri: window.location.origin,
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  getToken() {
    return this.keycloak.token;
  }

  getUserInfo() {
    return this.keycloak.tokenParsed;
  }

  isAuthenticated() {
    return this.authenticated;
  }

  hasRole(role) {
    return this.keycloak.hasRealmRole(role);
  }

  updateToken(minValidity) {
    return this.keycloak.updateToken(minValidity);
  }
}

export default new KeycloakService(); 