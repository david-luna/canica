import { Entity, EntityIdentifier } from "@/backend/common/domain";

export interface AccessTokenProps {
  value: string;
}

export class AccessToken extends Entity<AccessTokenProps> {
  constructor(props: AccessTokenProps, id?: EntityIdentifier) {
    super(props, id);
  }

  get id(): string {
    return this._id.toString();
  }

  get value(): string {
    return this.props.value;
  }
}
