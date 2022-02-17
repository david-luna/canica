import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AuthCommandTypes,
  AuthQueryTypes,
  CheckConfigQuery,
  CheckConfigResultSuccess,
  LoginCommand,
  LoginCommandSuccess,
  request,
  SetConfigCommand,
  SetConfigResult,
  SetConfigResultPayload,
} from '../../../backend';



// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const checkConfigAsync = createAsyncThunk/*<CheckConfigResult['payload']>*/(
  'auth/checkconfig',
  async () => {
    const type = AuthQueryTypes.CheckConfig;
    const payload: CheckConfigQuery = {};
    const result = await request<CheckConfigResultSuccess>({ type, payload });
    return result;
  },
);

export const setConfigAsync = createAsyncThunk<SetConfigResultPayload, SetConfigCommand>(
  'auth/setconfig',
  async (config: SetConfigCommand) => {
    const type = AuthCommandTypes.SetConfig;
    const payload = config;
    const result = await request<SetConfigResultPayload>({ type, payload });
    return result;
  },
);

export const loginAsync = createAsyncThunk(
  'auth/login',
  async () => {
    const type = AuthCommandTypes.Login;
    const payload: LoginCommand = { vendor: 'google' };
    const result = await request<LoginCommandSuccess>({ type, payload });
    return result;
  }
);
