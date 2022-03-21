import { Identifier } from "@/backend/common/domain";
import { Area, Evaluation, Quarter, StudentsGroup } from "../domain";

import { EvaluationDataTransfer } from "../data-transfer";
import { AreaMapper } from "./area-mapper";
import { StudentMapper } from "./student-mapper";
import { GradeMapper } from "./grade-mapper";

export type EvaluationStorageProps = {
  id: string;
  quarterId: string;
  groupId: string;
  groupName: string;
  areaCode: string;
  areaName: string;
};

export class EvaluationMapper {
  static toDataTransfer(evaluation: Evaluation): EvaluationDataTransfer {
    return {
      _id: evaluation.id.toString(),
      label: evaluation.label.toString(),
      quarter: {
        number: evaluation.quarter.number,
        term: {
          start: evaluation.quarter.term.start.toISOString(),
          finish: evaluation.quarter.term.finish.toISOString(),
        },
      },
      area: AreaMapper.toDataTransfer(evaluation.props.area),
      grades: evaluation.grades.map(GradeMapper.toDataTransfer),
      group: {
        _id: evaluation.group.id.toString(),
        name: evaluation.group.name.toString(),
        students: evaluation.group.students.map(StudentMapper.toDataTransfer),
      },
    };
  }

  static fromDataTransfer(evaluation: EvaluationDataTransfer): Evaluation {
    return Evaluation.create(
      {
        label: evaluation.label,
        area: AreaMapper.fromDataTransfer(evaluation.area),
        grades: evaluation.grades.map(GradeMapper.toDomain),
        quarter: Quarter.fromDate(new Date(evaluation.quarter.term.start)),
        group: StudentsGroup.create(
          {
            name: evaluation.group.name,
            students: evaluation.group.students.map(StudentMapper.toDomain),
          },
          new Identifier(evaluation.group._id)
        ),
      },
      new Identifier(evaluation._id)
    );
  }

  static toStorageProps(evaluation: Evaluation): EvaluationStorageProps {
    const { quarter, area, group } = evaluation;

    return {
      id: evaluation.id.toString(),
      quarterId: quarter.toString(),
      groupId: group.id.toString(),
      groupName: group.name.toString(),
      areaCode: area.code.toString(),
      areaName: area.name.toString(),
    };
  }

  static fromStorageProps(props: EvaluationStorageProps): Evaluation {
    return Evaluation.create(
      {
        label: props.id,
        quarter: Quarter.fromString(props.quarterId),
        grades: [],
        group: StudentsGroup.create({ name: props.groupName, students: [] }),
        area: Area.create({
          code: props.areaCode,
          name: props.areaName,
          dimensions: [],
        }),
      },
      new Identifier(props.id)
    );
  }
}
