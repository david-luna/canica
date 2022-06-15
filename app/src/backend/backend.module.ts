import { ElectronModule } from "annotatron";
import { CommonModule } from "./common";
import { AuthModule } from "./auth";
import { SchoolModule } from "./school";

@ElectronModule({
  imports: [CommonModule, AuthModule, SchoolModule],
  providers: [],
})
export class BackendModule {}
