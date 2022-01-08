import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AuthCommandTypes,
  AuthQueryTypes,
  backend,
  CheckConfigQuery,
  CheckConfigResultPayload,
  CommandQueryEvent,
  LoginCommand,
  LoginResultPayload
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

    return new Promise<CheckConfigResultPayload>((resolve, reject) => {
      once<CheckConfigResultPayload>(AuthQueryTypes.CheckConfig, (event) => {
        if (event.payload.success) {
          resolve(event.payload);
        } else {
          reject(event.payload.message);
        }
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
    
    return new Promise<LoginResultPayload>((resolve, reject) => {
      once<LoginResultPayload>(AuthCommandTypes.Login, (event) => {
        if (event.payload.name) {
          resolve(event.payload);
        } else {
          reject(event.payload);
        }
      });
    });
  }
);
