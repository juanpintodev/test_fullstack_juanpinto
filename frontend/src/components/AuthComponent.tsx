"use client";

import { useState } from "react";
import { Auth } from "aws-amplify";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";

interface AuthComponentProps {
  onAuthSuccess: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AuthComponent({ onAuthSuccess }: AuthComponentProps) {
  const [tabValue, setTabValue] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError("");
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await Auth.signIn(email, password);
      onAuthSuccess();
    } catch (error: any) {
      setError(error.message || "An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
        },
      });
      setError("");
      setTabValue(0); // Switch to sign in tab
      alert("Account created successfully! Please sign in.");
    } catch (error: any) {
      setError(error.message || "An error occurred during sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 400, mx: "auto" }}>
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Sign In" />
        <Tab label="Sign Up" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Box component="form" onSubmit={handleSignIn}>
          <Typography variant="h6" gutterBottom>
            Sign In
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box component="form" onSubmit={handleSignUp}>
          <Typography variant="h6" gutterBottom>
            Create Account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </Box>
      </TabPanel>
    </Paper>
  );
}
