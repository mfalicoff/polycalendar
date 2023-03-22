import { Schema } from 'mongoose';

export interface Day {
  _id?: string;
  date: Date;
  dayValue: Number;
  alternation: String;
}

export interface Calendar {
  _id?: string;
  startDate: Date;
  endDate: Date;
  days: Schema.Types.ObjectId;
}
