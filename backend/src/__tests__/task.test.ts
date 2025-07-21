import { Task, ITask } from "../models/Task";
import { resolvers } from "../graphql/resolvers";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

const mockContext = {
  user: {
    uid: "test-user-id",
    email: "test@example.com",
    username: "testuser",
    groups: [],
  },
  isAuthenticated: true,
};

const mockUnauthenticatedContext = {
  user: undefined,
  isAuthenticated: false,
};

describe("Task Model", () => {
  it("should create a task with required fields", async () => {
    const taskData = {
      title: "Test Task",
      description: "Test Description",
      userId: "test-user-id",
      priority: "medium" as const,
    };

    const task = new Task(taskData);
    const savedTask = await task.save();

    expect(savedTask.title).toBe(taskData.title);
    expect(savedTask.description).toBe(taskData.description);
    expect(savedTask.userId).toBe(taskData.userId);
    expect(savedTask.completed).toBe(false);
    expect(savedTask.priority).toBe(taskData.priority);
  }, 20000); // 20 segundos

  it("should require title field", async () => {
    const taskData = {
      description: "Test Description",
      userId: "test-user-id",
    };

    const task = new Task(taskData);

    try {
      await task.save();
      fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.errors.title).toBeDefined();
    }
  });

  it("should require userId field", async () => {
    const taskData = {
      title: "Test Task",
      description: "Test Description",
    };

    const task = new Task(taskData);

    try {
      await task.save();
      fail("Should have thrown validation error");
    } catch (error: any) {
      expect(error.errors.userId).toBeDefined();
    }
  });
});

describe("GraphQL Resolvers", () => {
  beforeEach(async () => {
    await Task.deleteMany({});
  });

  describe("Query resolvers", () => {
    it("should return tasks for authenticated user", async () => {
      const task1 = await Task.create({
        title: "Task 1",
        userId: "test-user-id",
      });

      const task2 = await Task.create({
        title: "Task 2",
        userId: "test-user-id",
      });

      const result = await resolvers.Query.tasks(null, null, mockContext);

      expect(result).toHaveLength(2);
      expect(result.map((t) => t.title)).toContain("Task 1");
      expect(result.map((t) => t.title)).toContain("Task 2");
    });

    it("should throw error for unauthenticated user", async () => {
      try {
        await resolvers.Query.tasks(null, null, mockUnauthenticatedContext);
        fail("Should have thrown authentication error");
      } catch (error: any) {
        expect(error.message).toBe("Authentication required");
      }
    });

    it("should return tasks filtered by status", async () => {
      await Task.create({
        title: "Completed Task",
        userId: "test-user-id",
        completed: true,
      });

      await Task.create({
        title: "Pending Task",
        userId: "test-user-id",
        completed: false,
      });

      const completedTasks = await resolvers.Query.tasksByStatus(
        null,
        { completed: true },
        mockContext
      );

      const pendingTasks = await resolvers.Query.tasksByStatus(
        null,
        { completed: false },
        mockContext
      );

      expect(completedTasks).toHaveLength(1);
      expect(completedTasks[0].title).toBe("Completed Task");

      expect(pendingTasks).toHaveLength(1);
      expect(pendingTasks[0].title).toBe("Pending Task");
    });
  });

  describe("Mutation resolvers", () => {
    it("should create a new task", async () => {
      const input = {
        title: "New Task",
        description: "New Description",
        priority: "high" as const,
      };

      const result = await resolvers.Mutation.createTask(
        null,
        { input },
        mockContext
      );

      expect(result.title).toBe(input.title);
      expect(result.description).toBe(input.description);
      expect(result.priority).toBe(input.priority);
      expect(result.userId).toBe(mockContext.user!.uid);
      expect(result.completed).toBe(false);
    });

    it("should update an existing task", async () => {
      const task = await Task.create({
        title: "Original Title",
        userId: "test-user-id",
      });

      const input = {
        title: "Updated Title",
        description: "Updated Description",
      };

      const result = await resolvers.Mutation.updateTask(
        null,
        { id: task.id.toString(), input },
        mockContext
      );

      expect(result.title).toBe(input.title);
      expect(result.description).toBe(input.description);
    });

    it("should delete a task", async () => {
      const task = await Task.create({
        title: "Task to Delete",
        userId: "test-user-id",
      });

      const result = await resolvers.Mutation.deleteTask(
        null,
        { id: task.id.toString() },
        mockContext
      );

      expect(result).toBe(true);

      const deletedTask = await Task.findById(task.id);
      expect(deletedTask).toBeNull();
    });

    it("should mark task as done (cloud function)", async () => {
      const task = await Task.create({
        title: "Task to Complete",
        userId: "test-user-id",
        completed: false,
      });

      const result = await resolvers.Mutation.markTaskAsDone(
        null,
        { id: task.id.toString() },
        mockContext
      );

      expect(result.completed).toBe(true);
    });

    it("should toggle task completion", async () => {
      const task = await Task.create({
        title: "Task to Toggle",
        userId: "test-user-id",
        completed: false,
      });

      // Toggle to completed
      const result1 = await resolvers.Mutation.toggleTaskCompletion(
        null,
        { id: task.id.toString() },
        mockContext
      );
      expect(result1.completed).toBe(true);

      // Toggle back to incomplete
      const result2 = await resolvers.Mutation.toggleTaskCompletion(
        null,
        { id: task.id.toString() },
        mockContext
      );
      expect(result2.completed).toBe(false);
    });
  });
});
