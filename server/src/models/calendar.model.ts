import { Document, model, Schema } from 'mongoose';
import { Calendar, Day } from '@interfaces/calendar.interface';

const daySchema: Schema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  dayValue: {
    type: Number,
    required: true,
  },
  alternation: {
    type: String,
    required: false,
  },
});

const calendarSchema: Schema = new Schema({
  days: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Day',
    },
  ],
});

export const dayModel = model<Day & Document>('Day', daySchema);
export const calendarModel = model<Calendar & Document>('Calendar', calendarSchema);
