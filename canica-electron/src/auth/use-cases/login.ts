import { Injectable, Command } from 'annotatron';
import { UseCase } from '@common/domain';
import { LoginCommand, LoginResult } from './commands';
import { GoogleAuthService } from '../services/google-auth';

@Injectable()
export class LoginUseCase implements UseCase<LoginCommand, LoginResult> {

  constructor(private readonly googleAuth: GoogleAuthService) {}

  @Command('login')
  async execute(/*request: LoginCommand*/): Promise<LoginResult> {
    await this.googleAuth.login();

    return { type: 'login' }
  }
}
