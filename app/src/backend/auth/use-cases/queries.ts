export enum AuthQueryTypes {
  CheckConfig = "checkConfig",
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CheckConfigQuery {}

export interface CheckConfigResultSuccess {
  success: true;
}

export interface CheckConfigResultFailure {
  success: false;
  message: string;
}

export interface CheckConfigResult {
  type: AuthQueryTypes.CheckConfig;
  payload: CheckConfigResultSuccess | CheckConfigResultFailure;
}
