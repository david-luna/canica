import { Identifier } from "@/backend/common/domain";
import { safeStorage } from "electron";
import { AccessToken } from "../domain/access-token";

export interface AccessTokenStorageProps {
  id: string;
  value: string;
}

export class AccessTokenMapper {
  static toStorageProps(token: AccessToken): AccessTokenStorageProps {
    return {
      id: token.id,
      value: safeStorage.encryptString(token.value).toString(),
    };
  }

  static fromStorageProps(props: AccessTokenStorageProps): AccessToken {
    return new AccessToken(
      {
        value: safeStorage.decryptString(Buffer.from(props.value)),
      },
      new Identifier(props.id)
    );
  }
}
