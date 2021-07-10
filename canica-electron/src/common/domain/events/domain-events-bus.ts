import { AggregateRoot } from "../aggregate-root";

export abstract class DomainEventsBus {
  abstract dispatchEvents(aggregate: AggregateRoot<unknown>): void;
}