import { Injectable, Event } from 'annotatron';
import { OAuth2Client } from 'google-auth-library';
import { drive, drive_v3 } from '@googleapis/drive';
import { EntityIdentifier, DomainEventsBus, Identifier } from '@common/domain';
import { SchoolClass, SchoolClassRepository, SchoolYear, Teacher } from '../domain';

interface GoogleToken {
  access_token: string;
}

interface FileDetails {
  id: string;
  name: string;
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

  constructor (private eventsBus: DomainEventsBus) {
    super();
  }

  @AuthRequired
  async exists(schoolClass: SchoolClass): Promise<boolean> {
    const result = await this.googleDrive.files.list({
      corpora: 'user',
      spaces : 'drive',
      fields : 'files/id, files/name',
      q      : `name contains 'canica'`,
    });

    return result.data.files.some(file => file.id === schoolClass.id.toString());
  }

  @AuthRequired
  async findClassById(id: EntityIdentifier): Promise<SchoolClass | null> {
    const result = await this.googleDrive.files.get({
      fileId: id.toString(),
      fields: 'id, name',
    });

    return await this.fromDetails(result.data as FileDetails)
  }

  @AuthRequired
  async findClassesByYear(year: SchoolYear): Promise<SchoolClass[]> {
    const result = await this.googleDrive.files.list({
      corpora: 'user',
      spaces : 'drive',
      fields : 'files/id, files/name',
      q      : `name contains 'canica'`,
    });

    const filtered = result.data.files.filter(({ name }) => {
      const yearString = [
        year.start.getFullYear().toString(),
        year.end.getFullYear().toString()
      ].join('__');

      return name.indexOf(yearString) !== -1
    });

    return Promise.all(filtered.map(file => this.fromDetails(file as FileDetails)))
  }

  @AuthRequired
  async delete(schoolClass: SchoolClass): Promise<unknown> {
    await this.googleDrive.files.delete({ fileId: schoolClass.id.toString() })

    return Promise.resolve();
  }

  @AuthRequired
  async save(schoolClass: SchoolClass): Promise<unknown> {
    // TODO: update via google drive API (create the file or update)


    this.eventsBus.dispatchEvents(schoolClass);
    return Promise.resolve();
  }

  /**
   * Returns a school class object form the file details
   *
   * @param file the drive file details (id, name, ...)
   */
  private async fromDetails(file: FileDetails): Promise<SchoolClass> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ app, label, startYear, endYear, teacherName ] = file.name.split('__');

    return Promise.resolve(new SchoolClass({
      label: label,
      teacher: new Teacher({ name: teacherName }),
      year: new SchoolYear({
        start: new Date(`09/01/${startYear}`),
        end: new Date(`06/21/${endYear}`),
      }),
      // TODO: add students
      students: [],
    }, new Identifier(file.id) ))
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
}
