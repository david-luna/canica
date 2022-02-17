import { createSlice } from '@reduxjs/toolkit';
import { AuthCommandTypes } from '../../../backend/types';
import { RootState } from '../../store';
// import { checkConfigAsync, loginAsync, setConfigAsync } from './thunks';

export interface User {
  name: string;
  email: string;
}

export interface AuthState {
  hasConfig: boolean | void;
  error: string;
  status: 'idle' | 'loading' | 'complete' | 'error';
  user: User | void;
}

const initialState: AuthState = {
  hasConfig: void 0,
  error: '',
  status: 'idle',
  user: void 0,
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setError: (state, action) => {
      state.status = 'error';
      state.error = action.payload.message;
    },
    checkConfig: (state) => {
      state.status = 'loading';
    },
    checkConfigComplete: (state) => {
      state.status = 'idle';
      state.hasConfig = true;
    },
    [AuthCommandTypes.SetConfig]: (state, action: any) => {
      state.status = 'loading';
    },
    setConfigComplete: (state) => {
      state.status = 'idle';
      state.hasConfig = true;
    },
    login: (state) => {
      state.status = 'loading';
    },
    loginComplete: (state, action) => {
      state.status = 'idle';
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = void 0;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(loginAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(loginAsync.fulfilled, (state, action) => {
  //       const { success, ...user } = action.payload;
  //       state.status = 'complete';
  //       state.user = user;
  //     })
  //     .addCase(loginAsync.rejected, (state, action) => {
  //       state.status = 'error';
  //       state.user = void 0;
  //     });

  //   builder
  //     .addCase(checkConfigAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(checkConfigAsync.fulfilled, (state, action) => {
  //       state.status = 'complete';
  //       state.hasConfig = action.payload.success;
  //     })
  //     .addCase(checkConfigAsync.rejected, (state, action) => {
  //       state.status = 'error';
  //       state.hasConfig = false;
  //     });
  //   builder
  //     .addCase(setConfigAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(setConfigAsync.fulfilled, (state, action) => {
  //       state.status = 'complete';
  //       state.hasConfig = action.payload.success;
  //     })
  //     .addCase(setConfigAsync.rejected, (state, action) => {
  //       state.status = 'error';
  //       state.hasConfig = false;
  //     });
  // },
});

export const AuthActions = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file.
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthHasConfig = (state: RootState) => state.auth.hasConfig;

export default authSlice.reducer;