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
  Paper,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { format } from "date-fns";
import { Task } from "@/types/task";

interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onMarkAsDone: (taskId: string) => void;
  onEdit: (task: Task) => void;
}

// Componente que muestra la lista de tareas del usuario autenticado

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
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:425px)");
  // Show message if no tasks
  if (tasks.length === 0) {
    return (
      <Paper
        elevation={1}
        sx={{
          p: isMobile ? 2 : 4,
          textAlign: "center",
          width: isMobile ? "100vw" : 400,
          mx: "auto",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No tasks yet. Create your first task!
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ width: isMobile ? "100%" : 600, mx: "auto" }}>
      <List>
        {tasks.map((task: Task) => (
          <Paper key={task.id} elevation={1} sx={{ mb: 2, width: "100%" }}>
            <ListItem
              sx={{
                textDecoration: task.completed ? "line-through" : "none",
                opacity: task.completed ? 0.7 : 1,
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "flex-start" : "center",
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
                  <Box
                    component="span"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Typography
                      variant="h6"
                      component="span"
                      sx={{
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
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
                  <Box component="span">
                    {/* Task description */}
                    {task.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                        component="span"
                      >
                        {task.description}
                      </Typography>
                    )}

                    {/* Task metadata */}
                    <Box
                      component="span"
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                        flexWrap: isMobile ? "wrap" : "nowrap",
                      }}
                    >
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
                          component="span"
                          sx={{
                            width: isMobile ? "100%" : 400,
                            maxWidth: isMobile ? "100%" : 400,
                            ml: isMobile ? 0 : "auto",
                            mr: isMobile ? 0 : "auto",
                            px: isMobile ? 0 : 2,
                            py: 3,
                            borderRadius: isMobile ? 0 : 2,
                            boxSizing: "border-box",
                          }}
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

              {/* Action buttons (ahora dentro del ListItem, no ListItemSecondaryAction) */}
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  mt: isMobile ? 2 : 0,
                  alignSelf: isMobile ? "stretch" : "center",
                  justifyContent: isMobile ? "flex-end" : "flex-end",
                  width: isMobile ? "100%" : "auto",
                }}
              >
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
            </ListItem>
          </Paper>
        ))}
      </List>
    </Box>
  );
}
