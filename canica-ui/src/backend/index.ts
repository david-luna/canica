import { mockBackend } from './mock-backend';
import { BackendClient, CommandQueryEvent } from './types';
declare global {
  interface Window { canica: BackendClient; }
}

export * from './types';
export const backend: BackendClient = window.canica ? window.canica : mockBackend;
export const onBackendEvent = <T>(type: string, handler: (event: CommandQueryEvent<T>) => void ): void => {
  backend.events$.subscribe((event) => {
    if (event.type === type) {
      handler(event);
    }
  });
};
