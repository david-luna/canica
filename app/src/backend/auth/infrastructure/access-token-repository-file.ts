/* eslint-disable @typescript-eslint/no-unused-vars */
import { existsSync, readFileSync, writeFileSync } from "original-fs";
import { Injectable } from "annotatron";
import { app, safeStorage } from "electron";
import { AccessToken } from "../domain/access-token";
import { AccessTokenRepository } from "../domain/access-token-repository";
import {
  AccessTokenMapper,
  AccessTokenStorageProps,
} from "../mappers/access-token-mapper";

const tokenFile = `${app.getPath("userData")}/0`;

console.log("tokenFile", tokenFile);

@Injectable()
export class AccessTokenRepositoryFile extends AccessTokenRepository {
  findAll(): Promise<AccessToken[]> {
    const isAvailable = safeStorage.isEncryptionAvailable();
    const isTokenSaved = existsSync(tokenFile);

    if (isAvailable && isTokenSaved) {
      const rawString = readFileSync(tokenFile, { encoding: "utf-8" });
      const storedTokens = JSON.parse(rawString) as AccessTokenStorageProps[];

      return Promise.resolve(
        storedTokens.map(AccessTokenMapper.fromStorageProps)
      );
    }

    return Promise.resolve([]);
  }

  async findById(id: string): Promise<AccessToken | null> {
    const tokens = await this.findAll();

    return tokens.find((t) => t.id === id) || null;
  }

  async exists(token: AccessToken): Promise<boolean> {
    const tokens = await this.findAll();

    return tokens.some((t) => t.equals(token));
  }

  async delete(token: AccessToken): Promise<unknown> {
    const prevTokens = await this.findAll();
    const nextTokens = prevTokens.filter((t) => !t.equals(token));
    const tokenData = JSON.stringify(
      nextTokens.map(AccessTokenMapper.toStorageProps)
    );

    writeFileSync(tokenFile, tokenData, { encoding: "utf-8" });
    return Promise.resolve(void 0);
  }

  async save(token: AccessToken): Promise<unknown> {
    const prevTokens = await this.findAll();
    const nextTokens = prevTokens.filter((t) => !t.equals(token));
    const tokenData = JSON.stringify(
      nextTokens.map(AccessTokenMapper.toStorageProps).concat([token])
    );

    writeFileSync(tokenFile, tokenData, { encoding: "utf-8" });
    return Promise.resolve(void 0);
  }
}
