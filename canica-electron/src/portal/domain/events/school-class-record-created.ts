import { DomainEvent, EntityIdentifier, Identifier } from '@common/domain';
import { SchoolClassRecord } from '../school-class-record';
import { SchoolClassRecordDataTransfer } from '../../data-transfer'
import { SchoolClassRecordMapper } from '../../mappers/school-class-record-mapper';

export class SchoolClassRecordCreated implements DomainEvent<SchoolClassRecordDataTransfer> {
  timestamp: Date;
  payload: SchoolClassRecordDataTransfer;

  constructor (schoolClassRecord: SchoolClassRecord) {
    this.timestamp = new Date();
    this.payload = SchoolClassRecordMapper.toDataTransfer(schoolClassRecord);
  }

  aggregateId(): EntityIdentifier {
    return new Identifier(this.payload._id);
  }
}