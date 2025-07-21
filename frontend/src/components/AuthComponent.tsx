"use client";

import { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

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

// Función para traducir y personalizar los mensajes de error de Firebase
function getFirebaseAuthErrorMessage(error: any) {
  if (!error || !error.code) return "Ocurrió un error desconocido.";
  switch (error.code) {
    case "auth/invalid-email":
      return "El correo electrónico no es válido.";
    case "auth/user-not-found":
      return "No existe una cuenta con este correo.";
    case "auth/wrong-password":
      return "La contraseña es incorrecta.";
    case "auth/email-already-in-use":
      return "Este correo ya está registrado.";
    case "auth/weak-password":
      return "La contraseña debe tener al menos 6 caracteres.";
    default:
      return "Error de autenticación. No esta registrado o introdujo un dato incorrecto";
  }
}

export default function AuthComponent({ onAuthSuccess }: AuthComponentProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:425px)");
  const isVerySmall = useMediaQuery("(max-width:375px)");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onAuthSuccess();
    } catch (error: any) {
      setError(error); // Guarda el error completo para traducirlo
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onAuthSuccess();
    } catch (error: any) {
      setError(error); // Guarda el error completo para traducirlo
    } finally {
      setLoading(false);
    }
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
      <form>
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
          helperText="Password must be at least 6 characters"
        />
        {error && (
          <Alert
            severity="error"
            sx={{
              mt: 2,
              fontWeight: "bold",
              color: "#fff",
              background: "linear-gradient(90deg, #d32f2f 60%, #ff7961 100%)",
              borderRadius: 2,
              boxShadow: 2,
              fontSize: "1rem",
              letterSpacing: "0.5px",
            }}
            icon={false}
          >
            {getFirebaseAuthErrorMessage(error)}
          </Alert>
        )}
        <Stack direction={isVerySmall ? "column" : "row"} spacing={2} mt={3}>
          <Button
            type="button"
            fullWidth={isMobile}
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={handleSignIn}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
          <Button
            type="button"
            fullWidth={isMobile}
            variant="outlined"
            color="primary"
            disabled={loading}
            onClick={handleSignUp}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
