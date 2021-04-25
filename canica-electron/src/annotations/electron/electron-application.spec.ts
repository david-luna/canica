/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '../injectable';
import { Command, Event, Query } from './command-query-event';
import { ElectronApplication } from './electron-application';

const mockApp = { on: jest.fn() };

@Injectable()
class TestClass {
  @Command('my-command')
  commandHandler(): void { console.log('implementations'); }
  @Query('my-query')
  queryHandler(): void { console.log('implementations'); }
  @Event('my-event')
  eventHandler(): void { console.log('implementations'); }
}

describe('The @ElectronApplication decorator', () => {
  it('should add metadata on which commands the class accepts', () => {
    @ElectronApplication({
      app: mockApp,
    })
    class ApplicationToTest {
      constructor(private test: TestClass) { }
    }

    expect(mockApp.on).toHaveBeenCalledTimes(3);
    expect(mockApp.on).toHaveBeenNthCalledWith(1, 'commands:my-command', expect.any(Function));
    expect(mockApp.on).toHaveBeenNthCalledWith(2, 'queries:my-query', expect.any(Function));
    expect(mockApp.on).toHaveBeenNthCalledWith(3, 'events:my-event', expect.any(Function));
  });
});
