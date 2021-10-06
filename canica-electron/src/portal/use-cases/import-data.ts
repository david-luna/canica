import { Injectable, Command } from 'annotatron';
import { UseCase } from '@common/domain';
import { ImportDataCommand, ImportDataResult, CommandTypes } from './commands';

@Injectable()
export class ImportDataUseCase implements UseCase<ImportDataCommand, ImportDataResult> {

  @Command(CommandTypes.ImportData)
  async execute(request: ImportDataCommand): Promise<ImportDataResult> {
    // TODO: call service to import data (classes with students)

    console.log('importing data!!!!', request)

    return { type: 'import-data' };
  }
}
