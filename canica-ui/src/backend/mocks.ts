import { AuthCommandTypes, CommandQueryEvent } from './types';

export const mocks: Record<string, CommandQueryEvent<any>> = {
  'login': {
    type: AuthCommandTypes.Login,
    payload: {
      name: 'Teacher Name',
      email: 'teacher@scool.com'
    },
  },
};