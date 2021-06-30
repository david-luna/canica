import { Entity, EntityIdentifier } from '@common/domain';

export interface SchoolYearProps {
  start: Date;
  end: Date;
}

export class SchoolYear extends Entity<SchoolYearProps> {
  constructor (props: SchoolYearProps, id?: EntityIdentifier) {
    super(props, id);
  }

  get start(): Date {
    return this.props.start;
  }

  get end(): Date {
    return this.props.end;
  }
}
