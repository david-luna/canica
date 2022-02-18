import { EntityIdentifier } from "../identifier";

export interface DomainEvent<T> {
  timestamp: Date;
  aggregateId(): EntityIdentifier;
  payload: T;
}
