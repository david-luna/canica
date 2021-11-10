// https://github.com/subhendukundu/Electron-GoogleSheet/blob/master/src/main.js

import { Injectable, emitEvent } from 'annotatron'
import { BrowserWindow, session } from 'electron';
import fetch from 'electron-fetch';
import { stringify } from 'qs';

type PromiseCallback = (param: unknown) => void;

interface FetchTokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
}

interface GoogleProfile {
  name: string;
  given_name: string;
  family_name: string;
  email:string;
  verified_email: boolean,
  picture: string;
  locale: string;
}

const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token'
const GOOGLE_PROFILE_URL = 'https://www.googleapis.com/userinfo/v2/me'
const GOOGLE_REDIRECT_URI = 'http://localhost'
// TODO: to be removed & passed by the user
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const AUTH_URL_PARAMS = {
  response_type: 'code',
  redirect_uri: GOOGLE_REDIRECT_URI,
  client_id: GOOGLE_CLIENT_ID,
  scope: [
    'profile email openid',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/spreadsheets',
  ].join(' '),
};

@Injectable()
export class GoogleAuthService {

  login(): Promise<void> {
    return this.getAuthorizationCode()
      .then(code => this.fetchAccessToken(code))
      .then(tokenData => {
        emitEvent({ type: 'google_authorized', payload: tokenData });
        session.defaultSession.cookies.set({
          url: 'https://canica.com',
          name: 'token',
          value: tokenData.access_token,
        });
        return this.fetchUserProfile(tokenData.access_token);
      }).then((profile) => {
        session.defaultSession.cookies.set({
          url: 'https://canica.com',
          name: 'profile',
          value: JSON.stringify(profile),
        });
      });
  }

  /**
   * Starts the OAuth flow opening the provider login window and capturing the auth code
   */
  private getAuthorizationCode(): Promise<string> {
    const authWindow = new BrowserWindow({ width: 500, height: 500, show: true });
    const authUrl = `${GOOGLE_AUTHORIZATION_URL}?${stringify(AUTH_URL_PARAMS)}`;

    return new Promise((resolve, reject) => {
      authWindow.on('closed', () => {
        reject(new Error('Auth window was closed by user'));
      })

      authWindow.webContents.on('will-navigate', (event, url) => {
        this.handleNavigation(authWindow, url, resolve, reject);
      });

      authWindow.webContents.on('will-redirect', (event, url) => {
        this.handleNavigation(authWindow, url, resolve, reject);
      });
      authWindow.loadURL(authUrl);
    });
  }

  /**
   * Callback to handle OAuth redirect with the access code necessary to get the token
   *
   * @param authWindow the window showing the login form
   * @param url the OAuth redirect URL
   * @param resolve handler for the auth code
   * @param reject handler for errors
   */
  private handleNavigation(authWindow: BrowserWindow, url: string, resolve: PromiseCallback, reject: PromiseCallback): void {
    // const query = parse(url, true).query
    const query = new URL(url).searchParams;
    if (query) {
      if (query.has('error')) {
        reject(new Error(`There was an error: ${query.get('error')}`))
      } else if (query.has('code')) {
        // Login is complete
        authWindow.removeAllListeners('closed')
        setImmediate(() => authWindow.close());
        // This is the authorization code we need to request tokens
        resolve(query.get('code'));
      }
    }
  }

  /**
   * Does fetch the access token with the given OAuth code
   *
   * @param code authorization code given in the OAuth redirect
   */
  private fetchAccessToken(code: string): Promise<FetchTokenResponse> {
    return fetch(GOOGLE_TOKEN_URL, {
      method: 'POST',
      body: stringify({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
    .then((netResponse) => netResponse.json<FetchTokenResponse>())
    .then((tokenResponse: FetchTokenResponse) => {
      if (tokenResponse.error) {
        throw new Error(tokenResponse.error_description);
      }
      return tokenResponse;
    });
  }

  /**
   * Returns details of the profile
   *
   * @param accessToken token to authenticate to the server
   */
  private fetchUserProfile(accessToken: string): Promise<GoogleProfile> {
    return fetch(GOOGLE_PROFILE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      }
    }).then(resp => resp.json<GoogleProfile>());
  }
}
