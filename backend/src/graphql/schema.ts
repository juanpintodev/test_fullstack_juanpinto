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
    tasks: [Task!]!
    task(id: ID!): Task
    tasksByStatus(completed: Boolean!): [Task!]!
    me: User
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task!
    updateTask(id: ID!, input: UpdateTaskInput!): Task!
    deleteTask(id: ID!): Boolean!
    markTaskAsDone(id: ID!): Task!
    toggleTaskCompletion(id: ID!): Task!
  }
`;
