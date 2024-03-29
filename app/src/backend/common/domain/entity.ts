import { v4 as uuidv4 } from "uuid";
import { Identifier, EntityIdentifier } from "./identifier";

export abstract class Entity<T> {
  protected readonly _id: EntityIdentifier;
  public readonly props: T;

  constructor(props: T, id?: EntityIdentifier) {
    this._id = id ? id : new Identifier(uuidv4());
    this.props = props;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!(object instanceof Entity)) {
      return false;
    }

    return this._id.equals(object._id);
  }
}
