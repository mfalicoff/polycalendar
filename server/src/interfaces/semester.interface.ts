import { Calendar } from '@interfaces/calendar.interface';

export interface DayInterface extends Record<string, any> {
  date: Date;
  alt: string;
  value: number;
}

export interface Semester {
  _id?: string;
  name: string;
  calendar: Calendar;
}
