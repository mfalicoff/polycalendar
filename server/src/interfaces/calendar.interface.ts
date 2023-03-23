import { Schema } from 'mongoose';

export interface Day {
  _id?: string;
  date: Date;
  dayValue: Number;
  alternation: String;
}

export interface Calendar {
  _id?: string;
  name: string;
  days: Schema.Types.ObjectId;
}
