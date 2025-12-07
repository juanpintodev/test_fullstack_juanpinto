"use client";

import { ApolloProvider } from "@apollo/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAuth, AuthProvider } from "react-oidc-context";
import CssBaseline from "@mui/material/CssBaseline";
import { createApolloClient } from "@/lib/apollo-client";
import { cognitoConfig } from "@/lib/cognito-config";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

function AppProviders({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const client = createApolloClient(auth);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          style={{
            width: "100vw",
            maxWidth: "100vw",
            overflowX: "hidden",
            margin: 0,
            padding: 0,
            minHeight: "100vh",
            backgroundColor: "#fff",
          }}
        >
          {children}
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider {...cognitoConfig}>
      <AppProviders>{children}</AppProviders>
    </AuthProvider>
  );
} 