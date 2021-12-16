export enum AuthCommandTypes {
  Login = 'login',
}

export interface LoginCommand {
  vendor: 'google'; // TODO: maybe others?
}

export interface LoginResult {
  type: AuthCommandTypes.Login;
}
