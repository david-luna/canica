export enum AuthCommandTypes {
  Login = 'login',
}

export interface LoginCommand {
  vendor: 'google'; // TODO: maybe others?
}

export interface LoginResultPayload {
  name: string;
  email: string;
}
export interface LoginResult {
  type: AuthCommandTypes.Login;
  payload: LoginResultPayload;
}
