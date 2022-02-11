export interface Day {
  _id?: string;
  date: Date;
  isThereSchool: boolean;
  alternation: String;
}

export interface Week {
  _id?: string;
  weekdays: Day[];
  weekNumber: Number;
}

export interface Calendar {
  _id?: string;
  weeks: Week[];
  startDate: Date;
  endDate: Date;
  vacationWeek: Week;
}
