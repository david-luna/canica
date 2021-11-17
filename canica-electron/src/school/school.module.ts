import { ElectronModule } from 'annotatron';
import { SchoolClassRepository } from './domain';
import { SchoolClassRepositoryGoogleDrive } from './infrastructure';
import { AfterSchoolClassRecordCreated } from './subscribers/after-school-class-record-created';
import { ListSchoolClassesUseCase } from './use-cases/list-school-classes';

@ElectronModule({
  imports: [],
  providers: [
    // App use cases
    ListSchoolClassesUseCase,
    // Infra
    {
      provide: SchoolClassRepository,
      useClass: SchoolClassRepositoryGoogleDrive,
    },
    // Subscribers to events
    AfterSchoolClassRecordCreated,
  ],
})
export class SchoolModule {}
