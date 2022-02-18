import {
  DomainEvent,
  EntityIdentifier,
  Identifier,
} from "@/backend/common/domain";
import {
  SchoolClassDataTransfer,
  SchoolClassMapper,
} from "@/backend/school/mappers";
import { SchoolClass } from "../school-class";

export class SchoolClassCreated
  implements DomainEvent<SchoolClassDataTransfer>
{
  timestamp: Date;
  payload: SchoolClassDataTransfer;

  constructor(schoolClass: SchoolClass) {
    this.timestamp = new Date();
    this.payload = SchoolClassMapper.toDataTransfer(schoolClass);
  }

  aggregateId(): EntityIdentifier {
    return new Identifier(this.payload._id);
  }
}
