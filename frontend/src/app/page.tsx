"use client";

import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useQuery, useMutation } from "@apollo/client";
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import { GET_TASKS } from "@/graphql/queries";
import { DELETE_TASK, MARK_TASK_AS_DONE } from "@/graphql/mutations";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import AuthComponent from "@/components/AuthComponent";
import { Task } from "@/types/task";

export default function HomePage() {
  // State variables
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // GraphQL queries and mutations
  const { data, loading, error, refetch } = useQuery(GET_TASKS, {
    skip: !isAuthenticated, // Only run query if user is logged in
  });

  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS }], // Refresh task list after deletion
  });

  const [markTaskAsDone] = useMutation(MARK_TASK_AS_DONE, {
    refetchQueries: [{ query: GET_TASKS }], // Refresh task list after marking as done
  });

  // Check if user is logged in when page loads
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Function to check if user is logged in
  const checkAuthStatus = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  // Function to sign out
  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Function to delete a task
  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask({ variables: { id: taskId } });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Function to mark a task as done
  const handleMarkAsDone = async (taskId: string) => {
    try {
      await markTaskAsDone({ variables: { id: taskId } });
    } catch (error) {
      console.error("Error marking task as done:", error);
    }
  };

  // Function to edit a task
  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setShowTaskForm(true);
  };

  // Function to close the task form
  const handleTaskFormClose = () => {
    setShowTaskForm(false);
    setSelectedTask(null);
    refetch(); // Refresh the task list
  };

  // Show login page if user is not authenticated
  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Task List App
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Sign in to manage your tasks
          </Typography>
          <AuthComponent onAuthSuccess={checkAuthStatus} />
        </Box>
      </Container>
    );
  }

  // Show main task list page
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* Header with title and buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h1">
            My Tasks
          </Typography>
          <Box>
            <Button
              variant="contained"
              onClick={() => setShowTaskForm(true)}
              sx={{ mr: 2 }}
            >
              Add Task
            </Button>
            <Button variant="outlined" onClick={handleSignOut}>
              Sign Out
            </Button>
          </Box>
        </Box>

        {/* Show error message if there's an error */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Error loading tasks: {error.message}
          </Alert>
        )}

        {/* Show loading spinner while loading */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          /* Show task list */
          <TaskList
            tasks={data?.tasks || []}
            onDelete={handleDeleteTask}
            onMarkAsDone={handleMarkAsDone}
            onEdit={handleEditTask}
          />
        )}

        {/* Task form dialog */}
        <TaskForm
          open={showTaskForm}
          onClose={handleTaskFormClose}
          task={selectedTask}
        />
      </Box>
    </Container>
  );
}
