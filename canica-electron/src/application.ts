import { ElectronModule } from 'annotatron';
import { CommonModule } from './common';
import { SchoolModule } from './school';

@ElectronModule({
  imports: [
    CommonModule,
    SchoolModule
  ],
  providers: [],
})
export class Application {
}
