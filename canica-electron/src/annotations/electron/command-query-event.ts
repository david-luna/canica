import 'reflect-metadata';
import { GenericMethodDecorator } from '../types';

export const COMMANDS_METADATA_KEY = 'metadata:commands';
export const QUERIES_METADATA_KEY = 'metadata:queries';
export const EVENTS_METADATA_KEY = 'metadata:events';

/**
 * Creates a decorator that saves the names of the methods listening for a specific type
 *
 * @param metadataKey the ley where to store the metadata
 * @returns the decorator function using that metadata key
 */
const createDecorator = (metadataKey: string) => {
  return (type: string): GenericMethodDecorator => {
    return function (
      target: unknown,
      key: string,
      descriptor: PropertyDescriptor
    ): PropertyDescriptor {
      const metadata = (Reflect.getMetadata(metadataKey, target.constructor) || {}) as Record<string, string[]>;
  
      metadata[type] = metadata[type] ? metadata[type].concat([key]) : [key];
      Reflect.defineMetadata(metadataKey, metadata, target.constructor);
  
      return descriptor;
    };
  }
};

export const Command = createDecorator(COMMANDS_METADATA_KEY);
export const Query = createDecorator(QUERIES_METADATA_KEY);
export const Event = createDecorator(EVENTS_METADATA_KEY);
