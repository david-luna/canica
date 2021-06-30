/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from 'annotatron';
import { Repository, EntityIdentifier } from '@common/domain';
import { SchoolClass } from './school-class';

@Injectable()
export class SchoolClassRepository extends Repository<SchoolClass> {
  findClassById(id: EntityIdentifier): Promise<SchoolClass | null> {
    throw new Error('SchoolClassRepository should not be used');
  }
  exists(schoolClass: SchoolClass): Promise<boolean> {
    throw new Error('SchoolClassRepository should not be used');
  }
  delete(schoolClass: SchoolClass): Promise<unknown> {
    throw new Error('SchoolClassRepository should not be used');
  }
  save(schoolClass: SchoolClass): Promise<unknown> {
    throw new Error('SchoolClassRepository should not be used');
  }
}
