import { BackendClient, CommandQueryEvent } from './types';
import { mocks } from './mock-data';

const delay = 1000;
const handlers: any[] = [];

const notifySubscriptions = (event: CommandQueryEvent<any>) => {
  handlers.forEach((handler) => {
    try {
      console.log('Notify event', event);
      handler(event);
    } catch (handlerError) {
      console.log('App UI handler error', handlerError);
    }
  });
};

const dispatch = (commandOrQuery: { type: string, payload: any }): void => {
  const { type } = commandOrQuery;
  const wrapper = mocks[type];
  const payload = wrapper.payloads[wrapper.index];

  setTimeout(() => notifySubscriptions({ type, payload }), delay);
  wrapper.index = (wrapper.index + 1) % wrapper.payloads.length;
}

export const mockBackend: BackendClient = {
  dispatchCommand: dispatch,
  dispatchQuery: dispatch,
  events$: {
    subscribe(handler) {
      handlers.push(handler);

      return {
        unsubscribe() {
          handlers.splice(handlers.findIndex(handler), 1);
        }
      }
    }
  }
};
