import { ElectronModule } from 'annotatron';
import { DomainEventsBus } from './domain';
import { DomainEventsBusElectron } from './infrastructure';

@ElectronModule({
  imports: [],
  providers: [
    {
      provide: DomainEventsBus,
      useClass: DomainEventsBusElectron,
    }
  ],
})
export class CommonModule {}
