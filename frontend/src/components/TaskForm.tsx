"use client";

import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Box,
} from "@mui/material";
import { CREATE_TASK, UPDATE_TASK } from "@/graphql/mutations";
import { GET_TASKS } from "@/graphql/queries";
import { Task, CreateTaskInput, UpdateTaskInput } from "@/types/task";

interface TaskFormProps {
  open: boolean;
  onClose: () => void;
  task?: Task | null;
}

export default function TaskForm({ open, onClose, task }: TaskFormProps) {
  const [formData, setFormData] = useState<CreateTaskInput>({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });
  const [error, setError] = useState("");

  const [createTask, { loading: createLoading }] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  const [updateTask, { loading: updateLoading }] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  const isEditing = !!task;
  const loading = createLoading || updateLoading;

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || "",
        priority: task.priority,
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
      });
    }
    setError("");
  }, [task, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      if (isEditing && task) {
        const updateInput: UpdateTaskInput = {
          title: formData.title,
          description: formData.description || undefined,
          priority: formData.priority,
          dueDate: formData.dueDate || undefined,
        };

        await updateTask({
          variables: {
            id: task.id,
            input: updateInput,
          },
        });
      } else {
        const createInput: CreateTaskInput = {
          title: formData.title,
          description: formData.description || undefined,
          priority: formData.priority,
          dueDate: formData.dueDate || undefined,
        };

        await createTask({
          variables: {
            input: createInput,
          },
        });
      }

      onClose();
    } catch (error: any) {
      setError(error.message || "An error occurred");
    }
  };

  const handleChange = (field: keyof CreateTaskInput, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditing ? "Edit Task" : "Create New Task"}</DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            margin="normal"
            required
            autoFocus
          />

          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            margin="normal"
            multiline
            rows={3}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              value={formData.priority}
              label="Priority"
              onChange={(e) => handleChange("priority", e.target.value)}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading
              ? isEditing
                ? "Updating..."
                : "Creating..."
              : isEditing
              ? "Update Task"
              : "Create Task"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
