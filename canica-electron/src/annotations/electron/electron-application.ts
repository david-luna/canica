import { GenericClassDecorator, Type } from '../types';

/**
 * @returns {GenericClassDecorator<Type<unknown>>}
 * @constructor
 */
export const ElectronApplication = (): GenericClassDecorator<Type<unknown>> => {
  return (target: Type<unknown>): unknown => {
    // TODO: inspect app and dependencies and wire with the electron comms
    return target;
  };
};
