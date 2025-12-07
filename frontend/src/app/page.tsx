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
import { useAuth } from "react-oidc-context";
import { cognitoDomain, cognitoConfig } from "@/lib/cognito-config";
import { GET_TASKS } from "@/graphql/queries";
import { DELETE_TASK, TOGGLE_TASK_COMPLETION } from "@/graphql/mutations";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import AuthComponent from "@/components/AuthComponent";
import { Task } from "@/types/task";
import Providers from "@/components/Providers";

// Main page of the app: handles authentication and displays the user's tasks
function HomePageContent() {
  const auth = useAuth();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const isAuthenticated = auth.isAuthenticated;

  const { data, loading, error: queryError, refetch } = useQuery(GET_TASKS, {
    skip: !isAuthenticated || auth.isLoading,
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
    if (auth.isAuthenticated) {
      setError(null);
    }
  }, [auth.isAuthenticated]);

  const client = useApolloClient();
  const handleSignOut = async () => {
    try {
      await client.resetStore();
      
      // If we have the Cognito domain, use manual logout URL
      if (cognitoDomain && typeof window !== "undefined") {
        const logoutUri = window.location.origin;
        const logoutUrl = `${cognitoDomain}/logout?client_id=${cognitoConfig.client_id}&logout_uri=${encodeURIComponent(logoutUri)}`;
        await auth.removeUser();
        window.location.href = logoutUrl;
      } else {
        // Fallback to signoutRedirect
        try {
          await auth.signoutRedirect();
        } catch (signoutError) {
          // If signoutRedirect fails, manually clear user and redirect
          await auth.removeUser();
          if (typeof window !== "undefined") {
            window.location.href = "/";
          }
        }
      }
    } catch (error) {
      console.error("Error signing out:", error);
      // Fallback: clear user and reload
      await auth.removeUser();
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
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

  if (auth.isLoading) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (auth.error) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            Authentication error: {auth.error.message}
          </Alert>
          <Button 
            variant="contained" 
            onClick={() => auth.signinRedirect({
              extraQueryParams: {
                prompt: "login",
              },
            })}
          >
            Try Again
          </Button>
        </Box>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Task List App
          </Typography>
          <AuthComponent onAuthSuccess={() => {}} />
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
