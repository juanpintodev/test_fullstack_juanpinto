import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "@/components/TaskList";
import { Task } from "@/types/task";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Test Task 1",
    description: "Test Description 1",
    completed: false,
    userId: "user1",
    priority: "high",
    dueDate: "2024-01-15T00:00:00.000Z",
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    title: "Test Task 2",
    description: "Test Description 2",
    completed: true,
    userId: "user1",
    priority: "medium",
    createdAt: "2024-01-02T00:00:00.000Z",
    updatedAt: "2024-01-02T00:00:00.000Z",
  },
];

const mockOnDelete = jest.fn();
const mockOnMarkAsDone = jest.fn();
const mockOnEdit = jest.fn();

describe("TaskList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders empty state when no tasks", () => {
    render(
      <TaskList
        tasks={[]}
        onDelete={mockOnDelete}
        onMarkAsDone={mockOnMarkAsDone}
        onEdit={mockOnEdit}
      />
    );

    expect(
      screen.getByText("No tasks yet. Create your first task!")
    ).toBeInTheDocument();
  });

  it("renders tasks correctly", () => {
    render(
      <TaskList
        tasks={mockTasks}
        onDelete={mockOnDelete}
        onMarkAsDone={mockOnMarkAsDone}
        onEdit={mockOnEdit}
      />
    );

    expect(screen.getByText("Test Task 1")).toBeInTheDocument();
    expect(screen.getByText("Test Task 2")).toBeInTheDocument();
    expect(screen.getByText("Test Description 1")).toBeInTheDocument();
    expect(screen.getByText("Test Description 2")).toBeInTheDocument();
  });

  it("shows priority chips", () => {
    render(
      <TaskList
        tasks={mockTasks}
        onDelete={mockOnDelete}
        onMarkAsDone={mockOnMarkAsDone}
        onEdit={mockOnEdit}
      />
    );

    expect(screen.getByText("high")).toBeInTheDocument();
    expect(screen.getByText("medium")).toBeInTheDocument();
  });

  it("calls onMarkAsDone when checkbox is clicked", () => {
    render(
      <TaskList
        tasks={mockTasks}
        onDelete={mockOnDelete}
        onMarkAsDone={mockOnMarkAsDone}
        onEdit={mockOnEdit}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);

    expect(mockOnMarkAsDone).toHaveBeenCalledWith("1");
  });

  it("calls onDelete when delete button is clicked", () => {
    render(
      <TaskList
        tasks={mockTasks}
        onDelete={mockOnDelete}
        onMarkAsDone={mockOnMarkAsDone}
        onEdit={mockOnEdit}
      />
    );

    const deleteButtons = screen.getAllByLabelText("Delete Task");
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });

  it("calls onEdit when edit button is clicked", () => {
    render(
      <TaskList
        tasks={mockTasks}
        onDelete={mockOnDelete}
        onMarkAsDone={mockOnMarkAsDone}
        onEdit={mockOnEdit}
      />
    );

    const editButtons = screen.getAllByLabelText("Edit Task");
    fireEvent.click(editButtons[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockTasks[0]);
  });

  it("disables edit button for completed tasks", () => {
    render(
      <TaskList
        tasks={mockTasks}
        onDelete={mockOnDelete}
        onMarkAsDone={mockOnMarkAsDone}
        onEdit={mockOnEdit}
      />
    );

    const editButtons = screen.getAllByLabelText("Edit Task");
    expect(editButtons[1]).toBeDisabled(); // Second task is completed
  });

  it("shows completed status for completed tasks", () => {
    render(
      <TaskList
        tasks={mockTasks}
        onDelete={mockOnDelete}
        onMarkAsDone={mockOnMarkAsDone}
        onEdit={mockOnEdit}
      />
    );

    expect(screen.getByText("Completed")).toBeInTheDocument();
  });
});
