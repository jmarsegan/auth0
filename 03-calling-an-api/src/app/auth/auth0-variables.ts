interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
  apiUrl: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'ThKwsPiy6w0Nsmko6lYrpMVeT1TMz9eg',
  domain: 'marsegan.eu.auth0.com',
  callbackURL: 'http://localhost:3000/callback',
  apiUrl: 'https://api.mysite.com'
};
