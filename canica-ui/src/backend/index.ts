import { mockBackend } from './mock-backend';
import { BackendClient, CommandQueryEvent } from './types';
declare global {
  interface Window { canica: BackendClient; }
}

export * from './types';
export const backend: BackendClient = window.canica ? window.canica : mockBackend;
export const request = <T>(commandOrQuery: CommandQueryEvent<unknown>): Promise<T> => {
    backend.dispatchCommand(commandOrQuery);

    return new Promise<T>((resolve, reject) => {
      const subscription = backend.events$.subscribe((event) => {
        if (event.type === commandOrQuery.type) {
          const { payload } = event;
          const callback = payload.success ? resolve : reject;
          // TODO: remove success flag
          // const { success, ...rest } = payload;

          callback(payload);
          subscription.unsubscribe();
        }
      });
    });
  };