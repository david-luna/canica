import { ValueObject } from "@/backend/common/domain";

export interface EmailProps {
  address: string;
}

export class Email extends ValueObject<EmailProps> {
  constructor(props: EmailProps) {
    super(props);
  }

  get address(): string {
    return this.props.address;
  }
}
