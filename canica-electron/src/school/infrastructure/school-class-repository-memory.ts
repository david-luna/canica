import { Injectable } from 'annotatron';
import { SchoolClass, SchoolClassRepository } from '../domain';

@Injectable()
export class SchoolClassRepositoryMemory extends SchoolClassRepository {
  private classes: SchoolClass[] = [];

  exists(schoolClass: SchoolClass): Promise<boolean> {
    return Promise.resolve(!!this.classes.find(c => c.equals(schoolClass)));
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
