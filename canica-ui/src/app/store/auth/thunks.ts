import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthCommandTypes, backend, CommandQueryEvent, LoginCommand, LoginResultPayload } from '../../../backend';


// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const loginAsync = createAsyncThunk(
  'auth/login',
  async () => {
    console.log('async thunk!!!');
    const payload: LoginCommand = { vendor: 'google' };
    backend.dispatchCommand({ type: AuthCommandTypes.Login, payload });
    
    return new Promise<LoginResultPayload>((resolve, reject) => {
      const subscription = backend.events$
        .subscribe((event: CommandQueryEvent<LoginResultPayload>) => {
          console.log('thunk receiving message!!!', event)
          if (event.type === AuthCommandTypes.Login) {
            if (event.payload.name) {
              resolve(event.payload);
            } else {
              reject(event.payload);
            }
            subscription.unsubscribe();
          }
        });
    });
  }
);
