import { Injectable, Event } from 'annotatron';
import { OAuth2Client } from 'google-auth-library';
import { drive, drive_v3 } from '@googleapis/drive';
import { EntityIdentifier, DomainEventsBus, Identifier } from '@common/domain';
import { SchoolClass, SchoolClassRepository, SchoolYear, Teacher, SchoolClassProps } from '../domain';
import { SchoolClassMapper } from '../mappers';

interface GoogleToken {
  access_token: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AuthRequired(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: unknown[]) {
      if (!target.googleDrive) {
        throw new Error('Forbidden access to query data');
      }
      return originalMethod.apply(this, args);
  }
}

@Injectable()
export class SchoolClassRepositoryGoogleDrive extends SchoolClassRepository {
  private googleDrive: drive_v3.Drive;
  private classes: SchoolClass[];

  constructor (private eventsBus: DomainEventsBus) {
    super();
    this.classes = [];
  }

  @AuthRequired
  async exists(schoolClass: SchoolClass): Promise<boolean> {
    await this.driveSync();

    const isCached = !!this.classes.find(c => c.equals(schoolClass));

    return Promise.resolve(isCached);
  }

  @AuthRequired
  async findClassById(id: EntityIdentifier): Promise<SchoolClass | null> {
    await this.driveSync();

    const filterClass = new SchoolClass({} as SchoolClassProps, id);
    
    return Promise.resolve(this.classes.find((c) => c.equals(filterClass)) || null);
  }

  @AuthRequired
  async findClassesByYear(year: SchoolYear): Promise<SchoolClass[]> {
    await this.driveSync();
    return Promise.resolve(this.classes.filter((c) => c.year.equals(year)));
  }

  @AuthRequired
  async delete(schoolClass: SchoolClass): Promise<unknown> {
    const index = this.classes.findIndex(c => c.equals(schoolClass));

    // Remove form drive
    await this.googleDrive.files.delete({ fileId: schoolClass.id.toString() })

    // Remove from memory
    this.classes.splice(index, 1);
    
    return Promise.resolve();
  }

  @AuthRequired
  async save(schoolClass: SchoolClass): Promise<unknown> {
    const index = this.classes.findIndex(c => c.equals(schoolClass));

    // TODO: update via google drive API (create the file)
    
    if (index !== -1) {
      this.classes.splice(index, 1, schoolClass);
    } else {
      this.classes.push(schoolClass);
    }

    this.eventsBus.dispatchEvents(schoolClass);
    return Promise.resolve();
  }


  /**
   * Configures the drive API for data manipulation
   *
   * @param token the auth token
   */
  @Event('google_authorized')
  private updateToken(token: GoogleToken): void {
    console.log('received authorization!!!');
    const authClient = new OAuth2Client();

    authClient.setCredentials(token);
    this.googleDrive = drive({ version: 'v3', auth: authClient });
  }

  /**
   * Gets the classes info from the drive API and puts them into memory
   */
  private async driveSync(): Promise<void> {
    if (this.classes.length !== 0) return;

    const result = await this.googleDrive.files.list({
      corpora: 'user',
      spaces: 'drive',
      q: `name contains 'canica'`,
    });

    result.data.files.forEach(file => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [ app, label, startYear, endYear, teacherName ] = file.name.split('__');

      this.classes.push(new SchoolClass({
        label: label,
        teacher: new Teacher({ name: teacherName }),
        year: new SchoolYear({
          start: new Date(`09/01/${startYear}`),
          end: new Date(`06/21/${endYear}`),
        }),
        // TODO: add students
        students: [],
      }, new Identifier(file.id) ))
    });
  }
}
