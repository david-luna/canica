import { ElectronModule } from 'annotatron';
import { SchoolClassRepository } from './domain';
import { SchoolClassRepositoryGoogleDrive } from './infrastructure';
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
  ],
})
export class SchoolModule {}
