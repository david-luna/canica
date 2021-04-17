/**
 * Type for what object is instances of
 */
export interface Type<T> {
  new(...args: unknown[]): T;
}

/**
 * Generic `ClassDecorator` type
 */
export type GenericClassDecorator<T> = (target: T) => void;

/**
 * Use to configure the injection
 */
export interface InjectableParams {
  overrides?: Function;
}

