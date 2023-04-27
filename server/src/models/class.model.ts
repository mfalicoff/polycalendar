import { Document, model, Schema } from 'mongoose';
import { Class } from '@interfaces/class.interface';

const classSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  schedule: {
    type: Array,
    required: true,
  },
});

const classModel = model<Class & Document>('Class', classSchema);

export default classModel;
