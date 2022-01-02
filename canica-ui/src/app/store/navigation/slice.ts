import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppRoutes } from '../../../routes';
import { RootState } from '../../store';


export interface NavigationState {
  route: AppRoutes;
}

const initialState: NavigationState = {
  route: AppRoutes.Setup,
};


export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    navigate: (state, action: PayloadAction<AppRoutes>) => {
      state.route = action.payload;
    },
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file.
export const selectRoute = (state: RootState) => state.navigation.route;
export const { navigate } = navigationSlice.actions;
export default navigationSlice.reducer;
