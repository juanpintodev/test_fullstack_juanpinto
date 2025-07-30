"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { GET_TASKS } from "@/graphql/queries";
import { DELETE_TASK, TOGGLE_TASK_COMPLETION } from "@/graphql/mutations";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import AuthComponent from "@/components/AuthComponent";
import { Task } from "@/types/task";
import Providers from "@/components/Providers";

// Main page of the app: handles authentication and displays the user's tasks
function HomePageContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data, loading, error: queryError, refetch } = useQuery(GET_TASKS, {
    skip: !isAuthenticated,
    onError: (error) => {
      console.error("GraphQL error:", error);
      setError("Error loading tasks. Please try again.");
    },
  });

  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
    onError: (error) => {
      console.error("Delete error:", error);
      setError("Error deleting task. Please try again.");
    },
  });

  const [toggleTaskCompletion] = useMutation(TOGGLE_TASK_COMPLETION, {
    refetchQueries: [{ query: GET_TASKS }],
    onError: (error) => {
      console.error("Toggle error:", error);
      setError("Error updating task. Please try again.");
    },
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      if (user) {
        setError(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const client = useApolloClient();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      await client.resetStore();
      setError(null);
    } catch (error) {
      console.error("Error signing out:", error);
      setError("Error signing out. Please try again.");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask({ variables: { id: taskId } });
      setError(null);
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Error deleting task. Please try again.");
    }
  };

  const handleMarkAsDone = async (taskId: string) => {
    try {
      await toggleTaskCompletion({ variables: { id: taskId } });
      setError(null);
    } catch (error) {
      console.error("Error marking task as done:", error);
      setError("Error updating task. Please try again.");
    }
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setShowTaskForm(true);
  };

  const handleTaskFormClose = () => {
    setShowTaskForm(false);
    setSelectedTask(null);
    refetch();
    setError(null);
  };

  const isMobile = useMediaQuery("(max-width:425px)");

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Task List App
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            gutterBottom
            component="span"
          >
            Sign in to manage your tasks
          </Typography>
          <AuthComponent onAuthSuccess={() => setIsAuthenticated(true)} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1">
            My Tasks
          </Typography>
          <Stack direction={isMobile ? "column" : "row"} spacing={0.5}>
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
          </Stack>
        </Box>

        {(error || queryError) && (
          <Alert 
            severity="error" 
            sx={{ mb: 2 }}
            onClose={() => setError(null)}
          >
            {error || queryError?.message || "An error occurred. Please try again."}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TaskList
            tasks={data?.tasks || []}
            onDelete={handleDeleteTask}
            onMarkAsDone={handleMarkAsDone}
            onEdit={handleEditTask}
          />
        )}

        <TaskForm
          open={showTaskForm}
          onClose={handleTaskFormClose}
          task={selectedTask}
        />
      </Box>
    </Container>
  );
}

export default function HomePage() {
  return (
    <Providers>
      <HomePageContent />
    </Providers>
  );
}
