import { ElectronModule } from 'annotatron';
import { LoginUseCase } from './use-cases/login';
import { GoogleAuthService } from './services/google-auth';

@ElectronModule({
  imports: [],
  providers: [
    // App use cases
    LoginUseCase,
    // Services
    GoogleAuthService,
  ],
})
export class AuthModule {}
