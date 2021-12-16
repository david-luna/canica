import { CommandQueryEvent } from './types';

type MockMessage = (meesage: CommandQueryEvent) => Promise<CommandQueryEvent>;

export const mocks: Record<string,any> = {

};