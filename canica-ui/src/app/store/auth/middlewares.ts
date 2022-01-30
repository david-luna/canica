import { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import {
  AuthCommandTypes,
  AuthQueryTypes,
  backend,
  Subscription
} from "../../../backend";
import { AppRoutes } from "../../../routes";
import { navigate } from "../navigation/slice";
import { AuthActions } from './slice';


export const authCommandTypes = Object.values(AuthCommandTypes);
export const authQueryTypes = Object.values(AuthQueryTypes);
const authSubscriptions: Record<string, Subscription> = {};

const connectAuth = (store: MiddlewareAPI) => {
  authSubscriptions.results = backend.results$.subscribe((event) => {
    const { type, payload } = event;

    switch(type) {
      case AuthQueryTypes.CheckConfig:
        store.dispatch(AuthActions.checkConfigComplete());
        break;
      case AuthCommandTypes.SetConfig:
        store.dispatch(AuthActions.setConfigComplete());
        break;
      case AuthCommandTypes.Login:
        store.dispatch(AuthActions.loginComplete({
          name: payload.name,
          email: payload.email,
        }));
        break;
    }
  });
  authSubscriptions.errors = backend.errors$.subscribe((event) => {
    const allTypes = [...authCommandTypes, ...authQueryTypes];

    if (allTypes.some(type => type === event.type)) {
      const { type, payload } = event;
      store.dispatch(AuthActions.setError({ type, payload }));
    }
  });
}

export const authMiddleware: Middleware = (store) => {
  return next => action => {
    // Connect backend the 1st time
    if (!authSubscriptions.results && !authSubscriptions.errors) {
      connectAuth(store);
    }

    // Catch here navigation on login complete
    if (action.type === 'auth/loginComplete') {
      store.dispatch(navigate(AppRoutes.Files));
      return;
    }

    // pass through actions
    next(action);
  };
};
