import { BackendClient, CommandQueryEvent } from './types';
import { mocks } from './mock-data';

type BackendHandler = (e: any) => void;

const delay = 1000;
const handlers = {
  results: [] as BackendHandler[],
  errors: [] as BackendHandler[],
  events: [] as BackendHandler[],
};

const notifyHandlers = (type: keyof typeof handlers, event: CommandQueryEvent<any>) => {
  handlers[type].forEach((handler) => {
    try {
      console.log(`Notify channel ${type}`, event);
      handler(event);
    } catch (handlerError) {
      console.log('App UI handler error', handlerError);
    }
  });
};

const dispatch = (commandOrQuery: { type: string, payload: any }): void => {
  console.log('dispatch to backend', commandOrQuery);
  const { type } = commandOrQuery;
  const wrapper = mocks[type];
  const { ok, payload } = wrapper.responses[wrapper.index];
  const channel = ok ? 'results' : 'errors';

  setTimeout(() => notifyHandlers(channel, { type, payload }), delay);
  wrapper.index = (wrapper.index + 1) % wrapper.responses.length;
}

const stream = (type: keyof typeof handlers) => {
  const handlerList = handlers[type];
  return {
    subscribe(handler: BackendHandler) {
      handlerList.push(handler);

      return {
        unsubscribe() {
          handlerList.splice(handlerList.findIndex(handler), 1);
        }
      }
    }
  };
};

export const mockBackend: BackendClient = {
  dispatchCommand: dispatch,
  dispatchQuery: dispatch,
  results$: stream('results'),
  errors$: stream('errors'),
  events$: stream('events'),
};
