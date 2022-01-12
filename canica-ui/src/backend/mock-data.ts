import { AuthCommandTypes, AuthQueryTypes } from './types';

interface ResponseWrapper {
  index: number;
  payloads: any[];
}

export const mocks: Record<string, ResponseWrapper> = {
  [AuthQueryTypes.CheckConfig]: {
    index: 0,
    payloads: [
      { success: true },
      { success: false, message: 'not configured' },
    ]
  },
  [AuthCommandTypes.SetConfig]: {
    index: 0,
    payloads: [
      { success: true },
      { success: false },
    ]
  },
  [AuthCommandTypes.Login]: {
    index: 0,
    payloads: [
      { success: true, name: 'Teacher Name', email: 'teacher@scool.com' },
      { success: false, message: 'Invalid credentials' },
    ]
  },
};
