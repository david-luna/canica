import { Injectable } from 'annotatron';
import { EntityIdentifier } from '@common/domain';
import { SchoolClass, SchoolClassRepository, SchoolClassProps, SchoolYear } from '../domain';

@Injectable()
export class SchoolClassRepositoryMemory extends SchoolClassRepository {
  private classes: SchoolClass[] = [];

  exists(schoolClass: SchoolClass): Promise<boolean> {
    return Promise.resolve(!!this.classes.find(c => c.equals(schoolClass)));
  }

  findClassById(id: EntityIdentifier): Promise<SchoolClass | null> {
    const filterClass = new SchoolClass({} as SchoolClassProps, id);
    
    return Promise.resolve(this.classes.find((c) => c.equals(filterClass)) || null);
  }

  findClassesByYear(year: SchoolYear): Promise<SchoolClass[]> {
    return Promise.resolve(this.classes.filter((c) => c.year.equals(year)));
  }

  delete(schoolClass: SchoolClass): Promise<unknown> {
    const index = this.classes.findIndex(c => c.equals(schoolClass));

    this.classes.splice(index, 1);
    return Promise.resolve();
  }

  save(schoolClass: SchoolClass): Promise<unknown> {
    const index = this.classes.findIndex(c => c.equals(schoolClass));

    if (index !== -1) {
      this.classes.splice(index, 1, schoolClass);
    } else {
      this.classes.push(schoolClass);
    }
    return Promise.resolve();
  }  
}
