// https://github.com/subhendukundu/Electron-GoogleSheet/blob/master/src/main.js
import { Identifier } from "@/backend/common/domain";
import { Injectable, emitEvent } from "annotatron";
import { BrowserWindow, session } from "electron";
import fetch from "electron-fetch";
import { stringify } from "qs";
import { AccessToken } from "../domain/access-token";
import { AccessTokenRepository } from "../domain/access-token-repository";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RejectCallback = (reason: any) => void;
type ResolveCallback<T> = (value: T | PromiseLike<T>) => void;

interface FetchTokenResponse {
  access_token: string;
  error?: string;
  error_description?: string;
}

interface GoogleProfile {
  name: string;
  given_name: string;
  family_name: string;
  email: string;
  verified_email: boolean;
  picture: string;
  locale: string;
}

const GOOGLE_AUTHORIZATION_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://www.googleapis.com/oauth2/v4/token";
const GOOGLE_PROFILE_URL = "https://www.googleapis.com/userinfo/v2/me";
const GOOGLE_REDIRECT_URI = "http://localhost";
// TODO: to be removed & passed by the user
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const AUTH_URL_PARAMS = {
  response_type: "code",
  redirect_uri: GOOGLE_REDIRECT_URI,
  client_id: GOOGLE_CLIENT_ID,
  scope: [
    "profile email openid",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/spreadsheets",
  ].join(" "),
};

@Injectable()
export class GoogleAuthService {
  constructor(private readonly accessTokenRepo: AccessTokenRepository) {}

  async login(): Promise<GoogleProfile> {
    let accessToken = await this.accessTokenRepo.findById("canica");

    console.log("saved token", accessToken);
    const isValidToken = await this.isValidToken(accessToken);
    console.log(`token valid ${isValidToken}`);

    if (!isValidToken) {
      accessToken = await this.refreshToken();
      await this.accessTokenRepo.save(accessToken);
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tokenValue = accessToken!.value;
    const profile = await this.fetchUserProfile(tokenValue);

    // TODO: check if necessary
    session.defaultSession.cookies.set({
      url: "https://canica.com",
      name: "token",
      value: tokenValue,
    });
    session.defaultSession.cookies.set({
      url: "https://canica.com",
      name: "profile",
      value: JSON.stringify(profile),
    });
    emitEvent({
      type: "google_authorized",
      payload: { access_token: tokenValue },
    });

    return profile;
  }

  /**
   * Requests Google OAuth th generate a new token
   *
   * @returns the new token
   */
  private async refreshToken(): Promise<AccessToken> {
    const authCode = await this.getAuthorizationCode();
    const tokenResopnse = await this.fetchAccessToken(authCode);

    return new AccessToken(
      { value: tokenResopnse.access_token },
      new Identifier("canica")
    );
  }

  /**
   * Starts the OAuth flow opening the provider login window and capturing the auth code
   */
  private getAuthorizationCode(): Promise<string> {
    const authWindow = new BrowserWindow({
      width: 500,
      height: 500,
      show: true,
      frame: false,
    });
    const authUrl = `${GOOGLE_AUTHORIZATION_URL}?${stringify(AUTH_URL_PARAMS)}`;

    return new Promise((resolve, reject) => {
      authWindow.on("closed", () => {
        reject(new Error("Auth window was closed by user"));
      });

      authWindow.webContents.on("will-navigate", (event, url) => {
        this.handleNavigation(authWindow, url, resolve, reject);
      });

      authWindow.webContents.on("will-redirect", (event, url) => {
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
  private handleNavigation(
    authWindow: BrowserWindow,
    url: string,
    resolve: ResolveCallback<string>,
    reject: RejectCallback
  ): void {
    // const query = parse(url, true).query
    const query = new URL(url).searchParams;
    if (query) {
      if (query.has("error")) {
        reject(new Error(`There was an error: ${query.get("error")}`));
      } else if (query.has("code")) {
        // Login is complete
        authWindow.removeAllListeners("closed");
        setImmediate(() => authWindow.close());
        // This is the authorization code we need to request tokens
        resolve(query.get("code") || "");
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
      method: "POST",
      body: stringify({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
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
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((resp) => resp.json<GoogleProfile>());
  }

  /**
   * Tells if the given token is valid
   *
   * @param token the token to check or null
   * @returns true if token is not null and valid
   */
  private async isValidToken(token: AccessToken | null): Promise<boolean> {
    if (token) {
      try {
        await this.fetchUserProfile(token.value);
        return Promise.resolve(true);
      } catch {
        return Promise.resolve(false);
      }
    }

    return Promise.resolve(false);
  }
}
