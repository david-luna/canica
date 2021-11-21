import { Event, Injectable, emitEvent } from 'annotatron';
import { DomainEventHandler } from '@common/domain';
import { SchoolClassRecordCreated } from '@portal/domain';
import { SchoolClassRepository } from '@school/domain';
import { SchoolClassRecordDataTransfer } from '@portal/data-transfer';
import { SchoolClassMapper } from '@school/mappers';
import { Grade } from '@school/domain/grade';

@Injectable()
export class AfterSchoolClassRecordCreated implements DomainEventHandler<SchoolClassRecordDataTransfer> {
  constructor(private schoolClassRepository: SchoolClassRepository) {}

  @Event(SchoolClassRecordCreated.name)
  async handle(payload: SchoolClassRecordDataTransfer): Promise<void> {
    const schoolClass = SchoolClassMapper.toDomain({
      _id: payload._id,
      label: payload.label,
      year: payload.year,
      teacher: { name: 'teacher name' },
      students: payload.students.map(s => ({
        code: s.code,
        name: s.name,
        grades: s.grades.map(value => new Grade({ name: '', formula: '', value })),
      })),
    });

    try {
      await this.schoolClassRepository.save(schoolClass);
    } catch (error) {
      // TODO: proper error to propagate to the UI
      emitEvent({
        type: 'GoogleError',
        payload: error,
      });
    }
    
  }
}
