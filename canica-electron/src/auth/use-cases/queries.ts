export enum AuthQueryTypes {
  CheckConfig = 'checkconfig',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CheckConfigQuery {
}

export interface CheckConfigResultPayload {
  success: boolean;
  message?: string;
}

export interface CheckConfigResult {
  type: AuthQueryTypes.CheckConfig;
  payload: CheckConfigResultPayload;
}
