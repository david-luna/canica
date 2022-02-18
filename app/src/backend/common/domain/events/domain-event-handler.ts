export interface DomainEventHandler<T> {
  handle(payload: T): void;
}
