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
  SetConfig = 'setconfig',
  Login = 'login',
}

export interface SetConfigCommand {
  client: string;
  secret: string;
}

export interface SetConfigResultPayload {
  success: boolean;
  message?: string;
}

export interface SetConfigResult {
  type: AuthCommandTypes.SetConfig;
  payload: SetConfigResultPayload;
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
