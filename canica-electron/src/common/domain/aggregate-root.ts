import { Entity } from './entity';
import { EntityIdentifier } from './identifier';
import { DomainEvent } from './events/domain-event';

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: DomainEvent<unknown>[] = [];

  get id (): EntityIdentifier {
    return this._id;
  }

  get domainEvents(): DomainEvent<unknown>[] {
    return this._domainEvents;
  }

  addDomainEvent(event: DomainEvent<unknown>): void {
    this.domainEvents.push(event);
  }

  clearDomainEvents(): void {
    this.domainEvents.length = 0;
  }
}
