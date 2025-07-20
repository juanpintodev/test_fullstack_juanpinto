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
import { GET_TASKS } from "../graphql/queries";
import { DELETE_TASK, MARK_TASK_AS_DONE } from "../graphql/mutations";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import AuthComponent from "../components/AuthComponent";

export default function HomePage() {
  // State variables
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // GraphQL queries
  const { data, loading, error, refetch } = useQuery(GET_TASKS, {
    skip: !isLoggedIn,
  });

  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  const [markTaskAsDone] = useMutation(MARK_TASK_AS_DONE, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  // Check if user is logged in when page loads
  useEffect(() => {
    checkIfLoggedIn();
  }, []);

  // Function to check if user is logged in
  async function checkIfLoggedIn() {
    try {
      await Auth.currentAuthenticatedUser();
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
    }
  }

  // Function to sign out
  async function handleSignOut() {
    try {
      await Auth.signOut();
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  // Function to delete a task
  async function handleDeleteTask(taskId) {
    try {
      await deleteTask({ variables: { id: taskId } });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  // Function to mark task as done
  async function handleMarkAsDone(taskId) {
    try {
      await markTaskAsDone({ variables: { id: taskId } });
    } catch (error) {
      console.error("Error marking task as done:", error);
    }
  }

  // Function to edit a task
  function handleEditTask(task) {
    setSelectedTask(task);
    setShowForm(true);
  }

  // Function to close the form
  function handleCloseForm() {
    setShowForm(false);
    setSelectedTask(null);
    refetch();
  }

  // Show login page if not logged in
  if (!isLoggedIn) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Task List App
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Sign in to manage your tasks
          </Typography>
          <AuthComponent onAuthSuccess={checkIfLoggedIn} />
        </Box>
      </Container>
    );
  }

  // Show main page
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* Header */}
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
              onClick={() => setShowForm(true)}
              sx={{ mr: 2 }}
            >
              Add Task
            </Button>
            <Button variant="outlined" onClick={handleSignOut}>
              Sign Out
            </Button>
          </Box>
        </Box>

        {/* Error message */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Error: {error.message}
          </Alert>
        )}

        {/* Loading spinner */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          /* Task list */
          <TaskList
            tasks={data?.tasks || []}
            onDelete={handleDeleteTask}
            onMarkAsDone={handleMarkAsDone}
            onEdit={handleEditTask}
          />
        )}

        {/* Task form */}
        <TaskForm
          open={showForm}
          onClose={handleCloseForm}
          task={selectedTask}
        />
      </Box>
    </Container>
  );
}
