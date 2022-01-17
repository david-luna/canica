import { AuthCommandTypes, AuthQueryTypes } from './types';

interface ResponseWrapper {
  index: number;
  payloads: any[];
}

export const mocks: Record<string, ResponseWrapper> = {
  [AuthQueryTypes.CheckConfig]: {
    index: 0,
    payloads: [
      { success: false, message: 'not configured' },
      { success: true },
    ]
  },
  [AuthCommandTypes.SetConfig]: {
    index: 0,
    payloads: [
      { success: false, message: 'invalid config' },
      { success: true },
    ]
  },
  [AuthCommandTypes.Login]: {
    index: 0,
    payloads: [
      { success: false, message: 'Invalid credentials' },
      { success: true, name: 'Teacher Name', email: 'teacher@scool.com' },
    ]
  },
};
