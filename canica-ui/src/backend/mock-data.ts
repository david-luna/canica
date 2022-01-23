import { AuthCommandTypes, AuthQueryTypes } from './types';

interface ResponseWrapper {
  index: number;
  responses: { ok: boolean, payload: any }[];
}

export const mocks: Record<string, ResponseWrapper> = {
  [AuthQueryTypes.CheckConfig]: {
    index: 0,
    responses: [
      { ok: false, payload: { message: 'not configured' } },
      { ok: true, payload: {} },
    ]
  },
  [AuthCommandTypes.SetConfig]: {
    index: 0,
    responses: [
      { ok: false, payload: { message: 'invalid config' } },
      { ok: true, payload: {} },
    ]
  },
  [AuthCommandTypes.Login]: {
    index: 0,
    responses: [
      { ok: false, payload: { message: 'Invalid credentials' } },
      { ok: true, payload: { name: 'Teacher Name', email: 'teacher@scool.com' } },
    ]
  },
};
