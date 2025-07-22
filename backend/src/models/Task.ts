import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  priority: "low" | "medium" | "high";
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    completed: {
      type: Boolean,
      default: false, // Tasks start as not completed
    },
    userId: {
      type: String,
      required: [true, "User ID is required"],
      index: true, // Makes queries faster
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium", // Default priority
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

TaskSchema.index({ userId: 1, completed: 1 }); // Find user's tasks by completion status
TaskSchema.index({ userId: 1, dueDate: 1 }); // Find user's tasks by due date

export const Task = mongoose.model<ITask>("Task", TaskSchema);
