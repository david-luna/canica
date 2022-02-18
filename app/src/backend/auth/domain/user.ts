import { Entity } from "@/backend/common/domain";
import { Email } from "./email";

export interface UserProps {
  name: string;
  email: Email;
  picture: string;
}

export class User extends Entity<UserProps> {
  constructor(props: UserProps) {
    super(props);
  }

  get name(): string {
    return this.props.name;
  }

  get email(): Email {
    return this.props.email;
  }

  get picture(): string {
    return this.props.picture;
  }
}
