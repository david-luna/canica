import { AggregateRoot } from "../aggregate-root";
import { Injectable } from "annotatron";
import { DomainEvent } from './domain-event';

@Injectable()
export class DomainEventsBus {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dispatchEvents(aggregate: AggregateRoot<unknown>): void {
    throw new Error(`DomainEventsBus abstraction should not be used. Use an implementation instead`);
  }
}