import { Injectable, Command } from "annotatron";
import { UseCase } from "@/backend/common/domain";
import { AuthCommandTypes, LoginCommand, LoginResult } from "./commands";
import { GoogleAuthService } from "../services/google-auth";

@Injectable()
export class LoginUseCase implements UseCase<LoginCommand, LoginResult> {
  constructor(private readonly googleAuth: GoogleAuthService) {
    console.log('use case created', googleAuth)
  }

  @Command(AuthCommandTypes.Login)
  async execute(/*request: LoginCommand*/): Promise<LoginResult> {
    console.log("received login command!!!!", this.googleAuth);
    const { name, email } = await this.googleAuth.login();

    return {
      type: AuthCommandTypes.Login,
      payload: { success: true, name, email },
    };
  }
}
