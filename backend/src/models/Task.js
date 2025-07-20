const mongoose = require("mongoose");

// Task schema - this defines what a task looks like in the database
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt automatically
  }
);

// Create indexes to make queries faster
taskSchema.index({ userId: 1, completed: 1 });
taskSchema.index({ userId: 1, dueDate: 1 });

// Export the Task model
module.exports = mongoose.model("Task", taskSchema);
