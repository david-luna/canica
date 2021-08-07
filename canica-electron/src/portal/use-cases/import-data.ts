import { Injectable, Command } from 'annotatron';
import { UseCase } from '@common/domain';
import { ImportDataCommand, ImportDataResult } from './commands';

@Injectable()
export class ImportDataUseCase implements UseCase<ImportDataCommand, ImportDataResult> {

  @Command('import-data')
  async execute(/*request: ImportDataCommand*/): Promise<ImportDataResult> {
    // TODO: call service to import data (classes with students)

    console.log('importing data!!!!')

    return { type: 'import-data' };
  }
}
