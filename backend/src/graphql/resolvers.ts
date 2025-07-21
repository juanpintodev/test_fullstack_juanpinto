import { Task, ITask } from "../models/Task";
import { AuthenticationError, UserInputError } from "apollo-server-express";

interface User {
  uid: string;
  email: string;
  displayName?: string;
}

interface Context {
  user?: User;
  isAuthenticated: boolean;
}

function requireAuth(context: Context): void {
  if (!context.isAuthenticated || !context.user) {
    throw new AuthenticationError("You must be logged in to do this");
  }
}

function checkTaskOwnership(task: ITask, userId: string): void {
  if (task.userId !== userId) {
    throw new AuthenticationError("You can only access your own tasks");
  }
}

export const resolvers = {
  Query: {
    tasks: async (_: any, __: any, context: Context): Promise<ITask[]> => {
      requireAuth(context);
      return await Task.find({ userId: context.user!.uid }).sort({
        createdAt: -1,
      });
    },

    task: async (
      _: any,
      { id }: { id: string },
      context: Context
    ): Promise<ITask | null> => {
      requireAuth(context);

      const task = await Task.findById(id);
      if (!task) {
        throw new UserInputError("Task not found");
      }

      checkTaskOwnership(task, context.user!.uid);
      return task;
    },

    tasksByStatus: async (
      _: any,
      { completed }: { completed: boolean },
      context: Context
    ): Promise<ITask[]> => {
      requireAuth(context);
      return await Task.find({
        userId: context.user!.uid,
        completed,
      }).sort({ createdAt: -1 });
    },

    me: async (_: any, __: any, context: Context) => {
      requireAuth(context);
      return {
        id: context.user!.uid,
        email: context.user!.email,
        username: context.user!.displayName || context.user!.email,
      };
    },
  },

  Mutation: {
    createTask: async (
      _: any,
      { input }: { input: any },
      context: Context
    ): Promise<ITask> => {
      requireAuth(context);

      const task = new Task({
        ...input,
        userId: context.user!.uid,
        dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
      });

      return await task.save();
    },

    updateTask: async (
      _: any,
      { id, input }: { id: string; input: any },
      context: Context
    ): Promise<ITask> => {
      requireAuth(context);

      const task = await Task.findById(id);
      if (!task) {
        throw new UserInputError("Task not found");
      }

      checkTaskOwnership(task, context.user!.uid);

      const updateData = { ...input };
      if (input.dueDate) {
        updateData.dueDate = new Date(input.dueDate);
      }

      const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedTask) {
        throw new UserInputError("Failed to update task");
      }

      return updatedTask;
    },

    deleteTask: async (
      _: any,
      { id }: { id: string },
      context: Context
    ): Promise<boolean> => {
      requireAuth(context);

      const task = await Task.findById(id);
      if (!task) {
        throw new UserInputError("Task not found");
      }

      checkTaskOwnership(task, context.user!.uid);

      await Task.findByIdAndDelete(id);
      return true;
    },

    markTaskAsDone: async (
      _: any,
      { id }: { id: string },
      context: Context
    ): Promise<ITask> => {
      requireAuth(context);

      console.log(
        `Cloud Function: Marking task ${id} as done for user ${
          context.user!.uid
        }`
      );

      const task = await Task.findById(id);
      if (!task) {
        throw new UserInputError("Task not found");
      }

      checkTaskOwnership(task, context.user!.uid);

      task.completed = true;
      task.updatedAt = new Date();

      return await task.save();
    },

    toggleTaskCompletion: async (
      _: any,
      { id }: { id: string },
      context: Context
    ): Promise<ITask> => {
      requireAuth(context);

      const task = await Task.findById(id);
      if (!task) {
        throw new UserInputError("Task not found");
      }

      checkTaskOwnership(task, context.user!.uid);

      task.completed = !task.completed;
      task.updatedAt = new Date();

      return await task.save();
    },
  },

  Task: {
    id: (parent: { _id: any }) => parent._id.toString(),
    createdAt: (parent: ITask) => parent.createdAt.toISOString(),
    updatedAt: (parent: ITask) => parent.updatedAt.toISOString(),
    dueDate: (parent: ITask) => parent.dueDate?.toISOString(),
  },
};
