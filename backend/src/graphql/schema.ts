import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
    userId: String!
    priority: Priority!
    dueDate: String
    createdAt: String!
    updatedAt: String!
  }

  enum Priority {
    low
    medium
    high
  }

  type User {
    id: String!
    email: String!
    username: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input CreateTaskInput {
    title: String!
    description: String
    priority: Priority = medium
    dueDate: String
  }

  input UpdateTaskInput {
    title: String
    description: String
    completed: Boolean
    priority: Priority
    dueDate: String
  }

  type Query {
    # Get all tasks for the authenticated user
    tasks: [Task!]!

    # Get a specific task by ID
    task(id: ID!): Task

    # Get tasks filtered by completion status
    tasksByStatus(completed: Boolean!): [Task!]!

    # Get tasks filtered by priority
    tasksByPriority(priority: Priority!): [Task!]!

    # Get current user information
    me: User
  }

  type Mutation {
    # Create a new task
    createTask(input: CreateTaskInput!): Task!

    # Update an existing task
    updateTask(id: ID!, input: UpdateTaskInput!): Task!

    # Delete a task
    deleteTask(id: ID!): Boolean!

    # Mark a task as completed (Cloud Function/Web Service)
    markTaskAsDone(id: ID!): Task!

    # Toggle task completion status
    toggleTaskCompletion(id: ID!): Task!

    # Bulk operations
    markMultipleTasksAsDone(ids: [ID!]!): [Task!]!
    deleteMultipleTasks(ids: [ID!]!): Boolean!
  }

  type Subscription {
    # Real-time updates for task changes
    taskUpdated: Task!
    taskCreated: Task!
    taskDeleted: ID!
  }
`;
