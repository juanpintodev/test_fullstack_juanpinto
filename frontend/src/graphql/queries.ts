import { gql } from "@apollo/client";
import {
  TasksQueryResult,
  TaskQueryResult,
  TasksByStatusQueryResult,
  TasksByPriorityQueryResult,
  MeQueryResult,
} from "@/types/task";

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      title
      description
      completed
      userId
      priority
      dueDate
      createdAt
      updatedAt
    }
  }
`;

export const GET_TASK = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      title
      description
      completed
      userId
      priority
      dueDate
      createdAt
      updatedAt
    }
  }
`;

export const GET_TASKS_BY_STATUS = gql`
  query GetTasksByStatus($completed: Boolean!) {
    tasksByStatus(completed: $completed) {
      id
      title
      description
      completed
      userId
      priority
      dueDate
      createdAt
      updatedAt
    }
  }
`;

export const GET_TASKS_BY_PRIORITY = gql`
  query GetTasksByPriority($priority: Priority!) {
    tasksByPriority(priority: $priority) {
      id
      title
      description
      completed
      userId
      priority
      dueDate
      createdAt
      updatedAt
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      id
      email
      username
    }
  }
`;

// Type-safe query hooks
export type GetTasksQuery = TasksQueryResult;
export type GetTaskQuery = TaskQueryResult;
export type GetTasksByStatusQuery = TasksByStatusQueryResult;
export type GetTasksByPriorityQuery = TasksByPriorityQueryResult;
export type GetMeQuery = MeQueryResult;
