export enum PortalCommandTypes {
  ImportData = 'import-data',
}

export interface ImportDataCommand {
  username: string;
  password: string;
  debug: boolean;
}

export interface ImportDataResult {
  type: PortalCommandTypes.ImportData;
}

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
