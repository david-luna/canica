import { Entity } from "@/backend/common/domain";

export interface EmailProps {
  address: string;
}

export class Email extends Entity<EmailProps> {
  constructor(props: EmailProps) {
    super(props);
  }

  get address(): string {
    return this.props.address;
  }
}
