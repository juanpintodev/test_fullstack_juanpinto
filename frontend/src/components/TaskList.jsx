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

// Function to get color for priority
function getPriorityColor(priority) {
  if (priority === "high") return "error";
  if (priority === "medium") return "warning";
  if (priority === "low") return "success";
  return "default";
}

export default function TaskList({ tasks, onDelete, onMarkAsDone, onEdit }) {
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
            {/* Checkbox */}
            <Checkbox
              checked={task.completed}
              onChange={() => onMarkAsDone(task.id)}
              color="primary"
            />

            {/* Task info */}
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
                    color={getPriorityColor(task.priority)}
                  />
                </Box>
              }
              secondary={
                <Box>
                  {/* Description */}
                  {task.description && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {task.description}
                    </Typography>
                  )}

                  {/* Dates and status */}
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    {/* Created date */}
                    <Typography variant="caption" color="text.secondary">
                      Created:{" "}
                      {format(new Date(task.createdAt), "MMM dd, yyyy")}
                    </Typography>

                    {/* Due date */}
                    {task.dueDate && (
                      <Typography variant="caption" color="text.secondary">
                        Due: {format(new Date(task.dueDate), "MMM dd, yyyy")}
                      </Typography>
                    )}

                    {/* Completed status */}
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
                    disabled={task.completed}
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
