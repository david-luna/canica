import { ElectronModule } from 'annotatron';
import { SchoolModule } from './school';

@ElectronModule({
  imports: [SchoolModule],
  providers: [],
})
export class Application {
}
