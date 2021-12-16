import { Injectable, Command } from 'annotatron';
import { UseCase } from '@common/domain';
import { ImportDataCommand, ImportDataResult, PortalCommandTypes } from './commands';
import { WebScrappingService } from '../services/web-scrapping';

@Injectable()
export class ImportDataUseCase implements UseCase<ImportDataCommand, ImportDataResult> {

  constructor(private webScrappingService: WebScrappingService) {}

  @Command(PortalCommandTypes.ImportData)
  async execute(request: ImportDataCommand): Promise<ImportDataResult> {
    // TODO: call service to import data (classes with students)

    await this.webScrappingService.execute({ debug: request.debug });

    return { type: PortalCommandTypes.ImportData };
  }
}
