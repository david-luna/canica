import { BackendClient, CommandQueryEvent } from './types';
import { mocks } from './mocks';
declare global {
  interface Window { canica: BackendClient; }
}
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
}

const mockBackend: BackendClient = {
  dispatchCommand(command): void {
    console.log('dispatching command', command);
    setTimeout(() => notifySubscriptions(mocks[command.type]), delay);
  },
  dispatchQuery(query): void {
    console.log('dispatching query', query);
    setTimeout(() => notifySubscriptions(mocks[query.type]), delay);
  },
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
}

export * from './types';
export const backend: BackendClient = window.canica ? window.canica : mockBackend;