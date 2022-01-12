import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AuthCommandTypes,
  AuthQueryTypes,
  backend,
  CheckConfigQuery,
  CheckConfigResult,
  CommandQueryEvent,
  LoginCommand,
  LoginResult,
} from '../../../backend';

const once = <T>(type: string, handler:(event: CommandQueryEvent<T>) => void): void => {
  const subscription = backend.events$.subscribe((event) => {
    if (event.type === type) {
      handler(event);
      subscription.unsubscribe();
    }
  });
};


// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const checkConfigAsync = createAsyncThunk(
  'auth/checkconfig',
  async () => {
    console.log('check async thunk!!!');
    const payload: CheckConfigQuery = {};
    backend.dispatchCommand({ type: AuthQueryTypes.CheckConfig, payload });

    return new Promise<any>((resolve, reject) => {
      once<CheckConfigResult['payload']>(AuthQueryTypes.CheckConfig, (event) => {
        const { payload } = event;
        const callback = payload.success ? resolve : reject;

        callback(payload);
      });
    });
  },
);

export const loginAsync = createAsyncThunk(
  'auth/login',
  async () => {
    console.log('login async thunk!!!');
    const payload: LoginCommand = { vendor: 'google' };
    backend.dispatchCommand({ type: AuthCommandTypes.Login, payload });
    
    return new Promise<any>((resolve, reject) => {
      once<LoginResult['payload']>(AuthCommandTypes.Login, (event) => {
        const { payload } = event;
        const callback = payload.success ? resolve : reject;

        callback(payload);
      });
    });
  }
);
