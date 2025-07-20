"use client";

import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Chip,
  Typography,
  Box,
  Paper,
  Tooltip,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { format } from "date-fns";
import { Task } from "@/types/task";

// Props that this component receives
interface TaskListProps {
  tasks: Task[]; // Array of tasks to display
  onDelete: (taskId: string) => void; // Function to delete a task
  onMarkAsDone: (taskId: string) => void; // Function to mark task as done
  onEdit: (task: Task) => void; // Function to edit a task
}

// Helper function to get color for priority
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "error"; // Red for high priority
    case "medium":
      return "warning"; // Orange for medium priority
    case "low":
      return "success"; // Green for low priority
    default:
      return "default";
  }
};

export default function TaskList({
  tasks,
  onDelete,
  onMarkAsDone,
  onEdit,
}: TaskListProps) {
  // Show message if no tasks
  if (tasks.length === 0) {
    return (
      <Paper elevation={1} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          No tasks yet. Create your first task!
        </Typography>
      </Paper>
    );
  }

  return (
    <List>
      {tasks.map((task) => (
        <Paper key={task.id} elevation={1} sx={{ mb: 2 }}>
          <ListItem
            sx={{
              textDecoration: task.completed ? "line-through" : "none",
              opacity: task.completed ? 0.7 : 1,
            }}
          >
            {/* Checkbox to mark task as done */}
            <Checkbox
              checked={task.completed}
              onChange={() => onMarkAsDone(task.id)}
              color="primary"
            />

            {/* Task information */}
            <ListItemText
              primary={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    variant="h6"
                    component="span"
                    sx={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.title}
                  </Typography>
                  {/* Priority badge */}
                  <Chip
                    label={task.priority}
                    size="small"
                    color={getPriorityColor(task.priority) as any}
                  />
                </Box>
              }
              secondary={
                <Box>
                  {/* Task description */}
                  {task.description && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {task.description}
                    </Typography>
                  )}

                  {/* Task metadata */}
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    {/* Creation date */}
                    <Typography variant="caption" color="text.secondary">
                      Created:{" "}
                      {format(new Date(task.createdAt), "MMM dd, yyyy")}
                    </Typography>

                    {/* Due date (if exists) */}
                    {task.dueDate && (
                      <Typography variant="caption" color="text.secondary">
                        Due: {format(new Date(task.dueDate), "MMM dd, yyyy")}
                      </Typography>
                    )}

                    {/* Completion status */}
                    {task.completed && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <CheckCircleIcon fontSize="small" color="success" />
                        <Typography variant="caption" color="success.main">
                          Completed
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              }
            />

            {/* Action buttons */}
            <ListItemSecondaryAction>
              <Box sx={{ display: "flex", gap: 1 }}>
                {/* Edit button */}
                <Tooltip title="Edit Task">
                  <IconButton
                    edge="end"
                    onClick={() => onEdit(task)}
                    disabled={task.completed} // Can't edit completed tasks
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                {/* Delete button */}
                <Tooltip title="Delete Task">
                  <IconButton
                    edge="end"
                    onClick={() => onDelete(task.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </ListItemSecondaryAction>
          </ListItem>
        </Paper>
      ))}
    </List>
  );
}
