
export type LoginCommandType = 'login';
export type LoginCommandVendor = 'google'; // TODO: maybe others?

export interface LoginCommand {
  vendor: LoginCommandVendor;
}

export interface LoginResult {
  type: LoginCommandType;
}
