import { Entity } from '@common/domain';

export interface EmailProps {
  address: string;
  domain: string;
}

export class Email extends Entity<EmailProps> {
  constructor (props: EmailProps) {
    super(props);
  }

  get address(): string {
    return this.props.address;
  }

  get domain(): string {
    return this.props.domain;
  }
}
