import { ElectronModule } from 'annotatron';
import { ImportDataUseCase } from './use-cases';

@ElectronModule({
  imports: [],
  providers: [
    // App use cases
    ImportDataUseCase,
  ],
})
export class PortalModule {}
