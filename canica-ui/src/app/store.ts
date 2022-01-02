import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import navigationReducer from './store/navigation/slice';
import authReducer from './store/auth/slice';

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
