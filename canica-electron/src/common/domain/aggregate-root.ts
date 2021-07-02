import { Entity } from './entity';
import { EntityIdentifier } from './identifier';

export abstract class AggregateRoot<T> extends Entity<T> {
  get id (): EntityIdentifier {
    return this._id;
  }

  // TODO: add domain events management
}
