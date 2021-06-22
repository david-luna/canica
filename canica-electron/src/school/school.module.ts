import { ElectronModule } from 'annotatron';
import { SchoolClassRepository } from './domain';
import { SchoolClassRepositoryMemory } from './infrastructure';

@ElectronModule({
  imports: [],
  providers: [
    {
      provide: SchoolClassRepository,
      useClass: SchoolClassRepositoryMemory,
    },
  ],
})
export class SchoolModule {}
