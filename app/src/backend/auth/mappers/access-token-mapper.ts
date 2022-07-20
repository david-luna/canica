import { Identifier } from "@/backend/common/domain";
import { safeStorage } from "electron";
import { AccessToken } from "../domain/access-token";

export interface AccessTokenStorageProps {
  id: string;
  value: number[];
}

export class AccessTokenMapper {
  static toStorageProps(token: AccessToken): AccessTokenStorageProps {
    const encrypted = safeStorage.encryptString(token.value);
    const numbers = new Uint8Array(encrypted.buffer);

    return {
      id: token.id,
      value: Array.from(numbers),
    };
  }

  static fromStorageProps(props: AccessTokenStorageProps): AccessToken {
    const buffer = Buffer.from(new Uint8Array(props.value));

    return new AccessToken(
      {
        value: safeStorage.decryptString(buffer),
      },
      new Identifier(props.id)
    );
  }
}
