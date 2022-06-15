import { Injectable, Command } from "annotatron";
import { UseCase } from "@/backend/common/domain";
import { AuthCommandTypes, LoginCommand, LoginResult } from "./commands";
import { GoogleAuthService } from "../services/google-auth";

@Injectable()
export class LoginUseCase implements UseCase<LoginCommand, LoginResult> {
  constructor(private readonly googleAuth: GoogleAuthService) {}

  @Command(AuthCommandTypes.Login)
  async execute(): Promise<LoginResult> {
    const { name, email } = await this.googleAuth.login();

    return {
      type: AuthCommandTypes.Login,
      payload: { success: true, name, email },
    };
  }
}
