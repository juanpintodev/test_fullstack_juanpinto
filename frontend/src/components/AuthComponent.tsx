"use client";

import { useAuth } from "react-oidc-context";
import {
  Paper,
  Button,
  Typography,
  Alert,
  Stack,
  useMediaQuery,
  CircularProgress,
  Box,
} from "@mui/material";

interface AuthComponentProps {
  onAuthSuccess: () => void;
}

export default function AuthComponent({ onAuthSuccess }: AuthComponentProps) {
  const auth = useAuth();
  const isMobile = useMediaQuery("(max-width:425px)");
  const isVerySmall = useMediaQuery("(max-width:375px)");

  if (auth.isLoading) {
    return (
      <Paper
        elevation={isMobile ? 0 : 3}
        sx={{
          width: isMobile ? "100%" : 400,
          maxWidth: isMobile ? "100%" : 400,
          ml: isMobile ? 0 : "auto",
          mr: isMobile ? 0 : "auto",
          px: isMobile ? 2 : 2,
          py: 3,
          borderRadius: isMobile ? 0 : 2,
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Paper>
    );
  }

  if (auth.error) {
    return (
      <Paper
        elevation={isMobile ? 0 : 3}
        sx={{
          width: isMobile ? "100%" : 400,
          maxWidth: isMobile ? "100%" : 400,
          ml: isMobile ? 0 : "auto",
          mr: isMobile ? 0 : "auto",
          px: isMobile ? 2 : 2,
          py: 3,
          borderRadius: isMobile ? 0 : 2,
          boxSizing: "border-box",
        }}
      >
        <Alert severity="error" sx={{ mb: 2 }}>
          Authentication error: {auth.error.message}
        </Alert>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => auth.signinRedirect({
            extraQueryParams: {
              prompt: "login",
            },
          })}
        >
          Try Again
        </Button>
      </Paper>
    );
  }

  if (auth.isAuthenticated) {
    if (onAuthSuccess) {
      onAuthSuccess();
    }
    return null;
  }

  const handleSignIn = () => {
    auth.signinRedirect({
      extraQueryParams: {
        prompt: "login",
      },
    });
  };

  return (
    <Paper
      elevation={isMobile ? 0 : 3}
      sx={{
        width: isMobile ? "100%" : 400,
        maxWidth: isMobile ? "100%" : 400,
        ml: isMobile ? 0 : "auto",
        mr: isMobile ? 0 : "auto",
        px: isMobile ? 2 : 2,
        py: 3,
        borderRadius: isMobile ? 0 : 2,
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h5" align="center" mb={2}>
        Welcome
      </Typography>
      <Typography variant="body2" align="center" color="text.secondary" mb={3}>
        Sign in to manage your tasks
      </Typography>
      <Stack spacing={2}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSignIn}
          size="large"
        >
          Sign In / Sign Up
        </Button>
      </Stack>
    </Paper>
  );
}
