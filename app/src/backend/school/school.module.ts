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

@ElectronModule({
  imports: [],
  providers: [
    // App use cases
    ListAreasUseCase,
    ListEvaluationsUseCase,
    ImportEvaluationsUseCase,
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
