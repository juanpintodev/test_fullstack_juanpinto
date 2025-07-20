export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  userId: string;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: string;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: "low" | "medium" | "high";
  dueDate?: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
}

export interface TasksQueryResult {
  tasks: Task[];
}

export interface TaskQueryResult {
  task: Task;
}

export interface TasksByStatusQueryResult {
  tasksByStatus: Task[];
}

export interface TasksByPriorityQueryResult {
  tasksByPriority: Task[];
}

export interface MeQueryResult {
  me: User;
}

export interface CreateTaskMutationResult {
  createTask: Task;
}

export interface UpdateTaskMutationResult {
  updateTask: Task;
}

export interface DeleteTaskMutationResult {
  deleteTask: boolean;
}

export interface MarkTaskAsDoneMutationResult {
  markTaskAsDone: Task;
}

export interface ToggleTaskCompletionMutationResult {
  toggleTaskCompletion: Task;
}

export interface MarkMultipleTasksAsDoneMutationResult {
  markMultipleTasksAsDone: Task[];
}

export interface DeleteMultipleTasksMutationResult {
  deleteMultipleTasks: boolean;
}
