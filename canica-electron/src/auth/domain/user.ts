import { Entity } from '@common/domain';
import { Email } from './email';

export interface UserProps {
  name: string;
  birth: Date;
  email: Email;
}

export class User extends Entity<UserProps> {
  constructor (props: UserProps) {
    super(props);
  }

  get name(): string {
    return this.props.name;
  }

  get birth(): Date {
    return this.props.birth;
  }

  get email(): Email {
    return this.props.email;
  }
}
