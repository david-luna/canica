/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from 'annotatron';
import { Repository } from '@common/domain';
import { SchoolClass } from './school-class';

@Injectable()
export class SchoolClassRepository extends Repository<SchoolClass> {
  exists(t: SchoolClass): Promise<boolean> {
    throw new Error('SchoolClassRepository should not be used');
  }
  delete(t: SchoolClass): Promise<unknown> {
    throw new Error('SchoolClassRepository should not be used');
  }
  save(t: SchoolClass): Promise<unknown> {
    throw new Error('SchoolClassRepository should not be used');
  }
}
