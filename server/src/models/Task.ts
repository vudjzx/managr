import {Schema, model} from 'mongoose';
import {ITask} from '../interfaces/ITask';

const taskSchema = new Schema<ITask>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    deadline: {
      type: Date,
      required: true,
      default: new Date(),
    },
    priority: {
      type: String,
      required: true,
      enum: ['low', 'medium', 'high'],
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
  },
  {timestamps: true},
);

const Task = model<ITask>('Task', taskSchema);

export default Task;
