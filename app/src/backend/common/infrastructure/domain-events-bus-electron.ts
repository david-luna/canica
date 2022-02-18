import { emitEvent, Injectable } from "annotatron";
import { AggregateRoot, DomainEventsBus, DomainEvent } from "../domain";

@Injectable()
export class DomainEventsBusElectron extends DomainEventsBus {
  dispatchEvents(aggregate: AggregateRoot<unknown>): void {
    aggregate.domainEvents.forEach((domainEvent: DomainEvent<unknown>) => {
      emitEvent({
        type: domainEvent.constructor.name,
        payload: domainEvent.payload,
      });
    });
  }
}
