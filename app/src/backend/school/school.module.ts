import { ElectronModule } from "annotatron";
import { AreaRepository, EvaluationRepository } from "./domain";
import {
  AreaRepositoryStatic,
  EvaluationRepositoryGoogle,
} from "./infrastructure";
import { PortalService } from "./services/portal.service";
import {
  ImportEvaluationsUseCase,
  ListAreasUseCase,
  ListEvaluationsUseCase,
} from "./use-cases";
import { UploadEvaluationsUseCase } from "./use-cases/upload-evaluations";

@ElectronModule({
  imports: [],
  providers: [
    // App use cases
    ListAreasUseCase,
    ListEvaluationsUseCase,
    ImportEvaluationsUseCase,
    UploadEvaluationsUseCase,
    // Services
    PortalService,
    // Infra
    {
      provide: EvaluationRepository,
      useClass: EvaluationRepositoryGoogle,
    },
    {
      provide: AreaRepository,
      useClass: AreaRepositoryStatic,
    },
    // Subscribers to events (none for now)
  ],
})
export class SchoolModule {}
