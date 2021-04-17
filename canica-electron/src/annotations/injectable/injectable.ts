import { Injector } from './injector';
import { GenericClassDecorator, InjectableParams, Type } from './types';

/**
 * @returns {GenericClassDecorator<Type<unknown>>}
 * @constructor
 */
export const Injectable = (
  params?: InjectableParams
): GenericClassDecorator<Type<unknown>> => {
  return (target: Type<unknown>): unknown => {
    Injector.register(target, params);

    return target;
  };
};
