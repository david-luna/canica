import { AuthCommandTypes, AuthQueryTypes, CommandQueryEvent } from './types';

export const mocks: Record<string, CommandQueryEvent<any>> = {
  'checkconfig': {
    type: AuthQueryTypes.CheckConfig,
    payload: {
      success: false,
      message: 'not configured'
    },
  },
  'setconfig': {
    type: AuthCommandTypes.SetConfig,
    payload: {
      success: true,
    },
  },
  'login': {
    type: AuthCommandTypes.Login,
    payload: {
      name: 'Teacher Name',
      email: 'teacher@scool.com'
    },
  },
};