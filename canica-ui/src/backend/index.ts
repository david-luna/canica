import { BackendClient, CommandQueryEvent } from './types';

declare global {
  interface Window { canica: BackendClient; }
}

const handlers: any[] = [];
const mockBackend: BackendClient = {
  dispatchCommand(command: CommandQueryEvent): void {
    // TODO: mock lookup and call handlers with return data
  },
  dispatchQuery(command: CommandQueryEvent): void {
    // TODO: mock lookup and call handlers with return data
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

export const backend: BackendClient = window.canica ? window.canica : mockBackend;