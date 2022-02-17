export interface CommandQueryEvent<T> {
  type: string;
  payload: T;
}

export interface Subscription {
  unsubscribe: () => void;
}

export interface Observable<T> {
  subscribe: (handler: (e: T) => void) => Subscription;
}

export interface BackendClient {
  dispatchCommand: (command: CommandQueryEvent<unknown>) => void;
  dispatchQuery: (query: CommandQueryEvent<unknown>) => void;
  results$: Observable<CommandQueryEvent<any>>;
  errors$: Observable<CommandQueryEvent<any>>;
  events$: Observable<CommandQueryEvent<any>>;
}
