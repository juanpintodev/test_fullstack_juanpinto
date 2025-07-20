const Task = require("../models/Task");
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");

// Helper function to check if user is logged in
function checkAuth(context) {
  if (!context.isAuthenticated || !context.user) {
    throw new AuthenticationError("You need to be logged in");
  }
}

// Helper function to check if user owns the task
function checkTaskOwner(task, userId) {
  if (task.userId !== userId) {
    throw new AuthenticationError("This is not your task");
  }
}

// All our GraphQL resolvers
const resolvers = {
  Query: {
    // Get all tasks for the current user
    tasks: async (parent, args, context) => {
      checkAuth(context);

      const tasks = await Task.find({ userId: context.user.sub }).sort({
        createdAt: -1,
      });

      return tasks;
    },

    // Get one specific task
    task: async (parent, { id }, context) => {
      checkAuth(context);

      const task = await Task.findById(id);
      if (!task) {
        throw new UserInputError("Task not found");
      }

      checkTaskOwner(task, context.user.sub);
      return task;
    },

    // Get tasks by completion status
    tasksByStatus: async (parent, { completed }, context) => {
      checkAuth(context);

      const tasks = await Task.find({
        userId: context.user.sub,
        completed: completed,
      }).sort({ createdAt: -1 });

      return tasks;
    },

    // Get current user info
    me: async (parent, args, context) => {
      checkAuth(context);

      return {
        id: context.user.sub,
        email: context.user.email,
        username: context.user.username,
      };
    },
  },

  Mutation: {
    // Create a new task
    createTask: async (parent, { input }, context) => {
      checkAuth(context);

      const task = new Task({
        title: input.title,
        description: input.description,
        priority: input.priority || "medium",
        dueDate: input.dueDate ? new Date(input.dueDate) : null,
        userId: context.user.sub,
      });

      const savedTask = await task.save();
      return savedTask;
    },

    // Update an existing task
    updateTask: async (parent, { id, input }, context) => {
      checkAuth(context);

      const task = await Task.findById(id);
      if (!task) {
        throw new UserInputError("Task not found");
      }

      checkTaskOwner(task, context.user.sub);

      // Update the task
      if (input.title) task.title = input.title;
      if (input.description !== undefined) task.description = input.description;
      if (input.completed !== undefined) task.completed = input.completed;
      if (input.priority) task.priority = input.priority;
      if (input.dueDate) task.dueDate = new Date(input.dueDate);

      const updatedTask = await task.save();
      return updatedTask;
    },

    // Delete a task
    deleteTask: async (parent, { id }, context) => {
      checkAuth(context);

      const task = await Task.findById(id);
      if (!task) {
        throw new UserInputError("Task not found");
      }

      checkTaskOwner(task, context.user.sub);

      await Task.findByIdAndDelete(id);
      return true;
    },

    // Mark task as done (this is the "cloud function")
    markTaskAsDone: async (parent, { id }, context) => {
      checkAuth(context);

      console.log(`Marking task ${id} as done for user ${context.user.sub}`);

      const task = await Task.findById(id);
      if (!task) {
        throw new UserInputError("Task not found");
      }

      checkTaskOwner(task, context.user.sub);

      task.completed = true;
      task.updatedAt = new Date();

      const updatedTask = await task.save();
      return updatedTask;
    },

    // Toggle task completion
    toggleTaskCompletion: async (parent, { id }, context) => {
      checkAuth(context);

      const task = await Task.findById(id);
      if (!task) {
        throw new UserInputError("Task not found");
      }

      checkTaskOwner(task, context.user.sub);

      task.completed = !task.completed;
      task.updatedAt = new Date();

      const updatedTask = await task.save();
      return updatedTask;
    },
  },

  // Format the data before sending to client
  Task: {
    id: (parent) => parent._id.toString(),
    createdAt: (parent) => parent.createdAt.toISOString(),
    updatedAt: (parent) => parent.updatedAt.toISOString(),
    dueDate: (parent) => (parent.dueDate ? parent.dueDate.toISOString() : null),
  },
};

module.exports = { resolvers };
