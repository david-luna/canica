import { ElectronModule } from "annotatron";
import { LoginUseCase } from "./use-cases/login";
import { GoogleAuthService } from "./services/google-auth";
import { AccessTokenRepository } from "./domain/access-token-repository";
import { AccessTokenRepositoryFile } from "./infrastructure/access-token-repository-file";

@ElectronModule({
  imports: [],
  providers: [
    // App use cases
    LoginUseCase,
    // Services
    GoogleAuthService,
    // Infra
    {
      provide: AccessTokenRepository,
      useClass: AccessTokenRepositoryFile,
    },
  ],
})
export class AuthModule {}
