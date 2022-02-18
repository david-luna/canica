import { ElectronModule } from "annotatron";
import { WebScrappingService } from "./services/web-scrapping";
import { ImportDataUseCase } from "./use-cases";

@ElectronModule({
  imports: [],
  providers: [
    // App use cases
    ImportDataUseCase,
    // Services
    WebScrappingService,
  ],
})
export class PortalModule {}
