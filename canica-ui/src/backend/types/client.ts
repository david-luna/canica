export interface CommandQueryEvent {
  type: string;
  payload: unknown;
}

export interface Subscription {
  unsubscribe: () => void;
}

export interface Observable<T> {
  subscribe: (handler: (e: T) => void) => Subscription;
}

export interface BackendClient {
  dispatchCommand: (command: CommandQueryEvent) => void;
  dispatchQuery: (query: CommandQueryEvent) => void;
  events$: Observable<CommandQueryEvent>;
}
