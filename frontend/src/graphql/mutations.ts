import { gql } from "@apollo/client";
import {
  CreateTaskMutationResult,
  UpdateTaskMutationResult,
  DeleteTaskMutationResult,
  MarkTaskAsDoneMutationResult,
  ToggleTaskCompletionMutationResult,
  MarkMultipleTasksAsDoneMutationResult,
  DeleteMultipleTasksMutationResult,
} from "@/types/task";

export const CREATE_TASK = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
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

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
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

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

export const MARK_TASK_AS_DONE = gql`
  mutation MarkTaskAsDone($id: ID!) {
    markTaskAsDone(id: $id) {
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

export const TOGGLE_TASK_COMPLETION = gql`
  mutation ToggleTaskCompletion($id: ID!) {
    toggleTaskCompletion(id: $id) {
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

export const MARK_MULTIPLE_TASKS_AS_DONE = gql`
  mutation MarkMultipleTasksAsDone($ids: [ID!]!) {
    markMultipleTasksAsDone(ids: $ids) {
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

export const DELETE_MULTIPLE_TASKS = gql`
  mutation DeleteMultipleTasks($ids: [ID!]!) {
    deleteMultipleTasks(ids: $ids)
  }
`;

// Type-safe mutation hooks
export type CreateTaskMutation = CreateTaskMutationResult;
export type UpdateTaskMutation = UpdateTaskMutationResult;
export type DeleteTaskMutation = DeleteTaskMutationResult;
export type MarkTaskAsDoneMutation = MarkTaskAsDoneMutationResult;
export type ToggleTaskCompletionMutation = ToggleTaskCompletionMutationResult;
export type MarkMultipleTasksAsDoneMutation =
  MarkMultipleTasksAsDoneMutationResult;
export type DeleteMultipleTasksMutation = DeleteMultipleTasksMutationResult;
