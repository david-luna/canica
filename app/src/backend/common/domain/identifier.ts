export class Identifier<T> {
  constructor(private value: T) {
    this.value = value;
  }

  equals(id?: Identifier<T>): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    return id.toValue() === this.value;
  }

  /**
   * Returns the string representation
   */
  toString(): string {
    return String(this.value);
  }

  /**
   * Return raw value of identifier
   */
  toValue(): T {
    return this.value;
  }
}

export type EntityIdentifier = Identifier<string | number>;
