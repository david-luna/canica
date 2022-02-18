// TODO: criteria type?????

/**
 * Base API for repositories
 */
export abstract class Repository<EntityType> {
  abstract exists(t: EntityType): Promise<boolean>;
  abstract delete(t: EntityType): Promise<unknown>;
  abstract save(t: EntityType): Promise<unknown>;
}
