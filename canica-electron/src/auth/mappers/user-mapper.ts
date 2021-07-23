import { User, Email } from '../domain'
import { UserDataTransfer } from '../data-transfer';

export class UserMapper {
  static toDataTransfer(user: User): UserDataTransfer {
    return {
      name: user.name.toString(),
      birth: user.birth.toString(),
      email: {
        address: user.email.address,
        domain: user.email.domain,
      }
    };
  }

  static toDomain(data: UserDataTransfer): User {
    return new User({
      name: data.name,
      birth: new Date(data.birth),
      email: new Email(data.email),
    });
  }
}
