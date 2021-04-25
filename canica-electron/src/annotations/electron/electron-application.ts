/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenericClassDecorator, Type } from '../types';
import { COMMANDS_METADATA_KEY, QUERIES_METADATA_KEY, EVENTS_METADATA_KEY } from './command-query-event';
import { Injector } from '../injectable';

interface EventFromRenderer {
  // Partial of: https://electronjs.org/docs/api/structures/ipc-main-event
  frameId: number;
  processId: number;
  // WebContents partial
  sender: {
    send(channel: string, ...args: any[]): void;
  };
}

export interface App {
  on(event: string, handler: (event: EventFromRenderer, args: unknown[]) => void): void;
}

export interface ElectronParams {
  // windowFactory: BrowserWindow;
  app: App;
}

/**
 * Tells if the value is a promise
 * @param value the value to check
 */
const isPromise = (value: any): value is Promise<unknown> => {
  return value && typeof value.then === 'function';
};

// const resolveSubscriptions = (metadataKey: string, target: any, app: App): void => {
const resolveSubscriptions = (metadataKey: string, type: Type<unknown>, app: App): void => {
  const observedTypes = (Reflect.getMetadata(metadataKey, type) || {}) as Record<string, string[]>;
  const instance = Injector.resolve(type) as any;
  const channel = metadataKey.replace('metadata:', '');

  Object.keys(observedTypes).forEach((type) => {
    const eventName = `${channel}:${type}`;
    const targetMethods = observedTypes[type]

    targetMethods.forEach((method) => {
      app.on(eventName, (evt, args) => {
        try {
          const result = instance[method](args[0]);

          if (isPromise(result)) {
            result
              .then((value) => evt.sender.send('result', [value]))
              .catch((error) => evt.sender.send('error', [error]));
          } else {
            evt.sender.send('result', [result])
          }
        } catch (error) {
          evt.sender.send('error', [error])
        }
      })
    });
  });
};


/**
 * @returns {GenericClassDecorator<Type<unknown>>}
 * @constructor
 */
export const ElectronApplication = (params: ElectronParams): GenericClassDecorator<Type<unknown>> => {
  return (target: Type<unknown>): unknown => {
    // TODO: create the window and the bus
    // console.log('params', params);

    const types = (Reflect.getMetadata('design:paramtypes', target) || []) as Type<unknown>[];

    types.forEach((type) => {
      resolveSubscriptions(COMMANDS_METADATA_KEY, type, params.app)
      resolveSubscriptions(QUERIES_METADATA_KEY, type, params.app)
      resolveSubscriptions(EVENTS_METADATA_KEY, type, params.app)
    });

    return (): unknown => {
      return new target(...types.map(t => Injector.resolve(t)));
    };
  };
};
