import { EnhancedStore, Middleware } from '@reduxjs/toolkit';
import { backend } from '../../backend';
import { authCommandTypes, authQueryTypes } from './auth/middlewares';

export type AnyStore = EnhancedStore<any>;
export type AnyDispatch = AnyStore['dispatch'];
export type AnyGetState = AnyStore['getState'];

const allCommandTypes = [...authCommandTypes];
const allQueryTypes = [...authQueryTypes];


export const backendProcessMiddleware: Middleware = (store) => {
  return next => action => {
    const commandType = allCommandTypes.find(type => action.type.endsWith(`/${type}`))
    // Connect backend the 1st time
    if (commandType) {
      backend.dispatchCommand({ ...action, type: commandType });
    }

    const queryType = allQueryTypes.find(type => action.type.endsWith(`/${type}`))
    if (queryType) {
      backend.dispatchCommand({ ...action, type: queryType });
    }
    // pass through since a reduced may need it
    next(action);
  };
};
