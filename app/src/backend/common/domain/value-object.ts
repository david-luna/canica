import { shallowEqual } from "shallow-equal-object";

/**
 * ValueObjects are objects that we determine their equality through their structural property.
 */
export abstract class ValueObject<PropsType> {
  public readonly props: PropsType;

  constructor(props: PropsType) {
    this.props = Object.freeze(props);
  }

  public equals(valueObject?: ValueObject<PropsType>): boolean {
    if (valueObject === null || valueObject === undefined) {
      return false;
    }
    if (valueObject.props === undefined) {
      return false;
    }
    return shallowEqual(this.props, valueObject.props);
  }
}
