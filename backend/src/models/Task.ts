import mongoose, { Document, Schema } from "mongoose";

// Modelo de datos para las tareas en MongoDB usando Mongoose
export interface ITask extends Document {
  title: string; // Task title (required)
  description?: string; // Task description (optional)
  completed: boolean; // Is the task done?
  userId: string; // Who owns this task
  priority: "low" | "medium" | "high"; // Task priority
  dueDate?: Date; // When is it due? (optional)
  createdAt: Date; // When was it created
  updatedAt: Date; // When was it last updated
}

// Create the Task schema (database structure)
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

// Create indexes for faster queries
TaskSchema.index({ userId: 1, completed: 1 }); // Find user's tasks by completion status
TaskSchema.index({ userId: 1, dueDate: 1 }); // Find user's tasks by due date

// Export the Task model
export const Task = mongoose.model<ITask>("Task", TaskSchema);
