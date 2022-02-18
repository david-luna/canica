import { Event, Injectable, emitEvent } from "annotatron";
import { DomainEventHandler } from "@/backend/common/domain";
import { SchoolClassRecordCreated } from "@/backend/portal/domain";
import { SchoolClassRepository } from "@/backend/school/domain";
import { SchoolClassRecordDataTransfer } from "@/backend/portal/data-transfer";
import { SchoolClassMapper } from "@/backend/school/mappers";
import { Grade } from "@/backend/school/domain/grade";

@Injectable()
export class AfterSchoolClassRecordCreated
  implements DomainEventHandler<SchoolClassRecordDataTransfer>
{
  constructor(private schoolClassRepository: SchoolClassRepository) {}

  @Event(SchoolClassRecordCreated.name)
  async handle(payload: SchoolClassRecordDataTransfer): Promise<void> {
    const schoolClass = SchoolClassMapper.toDomain({
      _id: payload._id,
      label: payload.label,
      year: payload.year,
      teacher: { name: "teacher name" },
      students: payload.students.map((s) => ({
        code: s.code,
        name: s.name,
        grades: s.grades.map((grade) => new Grade({ ...grade, value: "" })),
      })),
    });

    try {
      await this.schoolClassRepository.save(schoolClass);
    } catch (error) {
      // TODO: proper error to propagate to the UI
      emitEvent({
        type: "GoogleError",
        payload: error,
      });
    }
  }
}
