/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from "annotatron";
import { Repository } from "@/backend/common/domain";
import { AccessToken } from "./access-token";

const errorMessage =
  "TokenRepository abstraction should not be used. Use an implementation instead";

@Injectable()
export class AccessTokenRepository extends Repository<AccessToken> {
  findById(id: string): Promise<AccessToken | null> {
    throw new Error(errorMessage);
  }

  exists(token: AccessToken): Promise<boolean> {
    throw new Error(errorMessage);
  }

  delete(token: AccessToken): Promise<unknown> {
    throw new Error(errorMessage);
  }

  save(token: AccessToken): Promise<unknown> {
    throw new Error(errorMessage);
  }
}
