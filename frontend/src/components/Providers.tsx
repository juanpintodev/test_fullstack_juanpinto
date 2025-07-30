"use client";

import { ApolloProvider } from "@apollo/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { client } from "@/lib/apollo-client";
import Box from "@mui/material/Box";

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

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
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
        </Box>
      </ThemeProvider>
    </ApolloProvider>
  );
} 