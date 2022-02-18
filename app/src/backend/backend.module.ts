import { ElectronModule } from "annotatron";
import { CommonModule } from "./common";
import { AuthModule } from "./auth";
import { SchoolModule } from "./school";
import { PortalModule } from "./portal";

@ElectronModule({
  imports: [CommonModule, AuthModule, SchoolModule, PortalModule],
  providers: [],
})
export class BackendModule {}
