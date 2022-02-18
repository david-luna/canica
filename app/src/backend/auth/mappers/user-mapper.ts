import { User, Email } from "../domain";
import { UserDataTransfer } from "../data-transfer";

export class UserMapper {
  static toDataTransfer(user: User): UserDataTransfer {
    return {
      name: user.name.toString(),
      email: { address: user.email.address },
      picture: user.picture.toString(),
    };
  }

  static toDomain(data: UserDataTransfer): User {
    return new User({
      name: data.name,
      email: new Email(data.email),
      picture: data.picture,
    });
  }
}
