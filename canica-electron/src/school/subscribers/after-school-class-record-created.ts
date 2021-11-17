import { Event, Injectable, emitEvent } from 'annotatron';
import { DomainEventHandler, Identifier } from '@common/domain';
import { SchoolClassRecordCreated } from '@portal/domain';
import { SchoolClassRepository } from '@school/domain';
import { SchoolClassRecordDataTransfer } from '@portal/data-transfer';
import { SchoolClassMapper } from '@school/mappers';

@Injectable()
export class AfterSchoolClassRecordCreated implements DomainEventHandler<SchoolClassRecordDataTransfer> {
  constructor(private schoolClassRepository: SchoolClassRepository) {}

  @Event(SchoolClassRecordCreated.name)
  async handle(payload: SchoolClassRecordDataTransfer): Promise<void> {
    console.log('handling record created', payload);
    const schoolClass = SchoolClassMapper.toDomain({
      _id: payload._id,
      label: payload.label,
      year: payload.year,
      teacher: { name: 'teacher name' },
      students: payload.students.map(s => ({
        code: s.code,
        name: s.name,
        grades: [],
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
