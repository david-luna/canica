import { Entity } from '@common/domain';

interface SchoolYearProps {
  start: Date;
  end: Date;
}

export class SchoolYear extends Entity<SchoolYearProps> {
  constructor (props: SchoolYearProps) {
    super(props);
  }

  get start(): Date {
    return this.props.start;
  }

  get end(): Date {
    return this.props.end;
  }
}
