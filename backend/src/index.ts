// Main entry point for the backend: sets up Express, Apollo Server, and MongoDB connection
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./config/database";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { authMiddleware } from "./middleware/auth";

// Load environment variables - try backend/.env first, then root .env
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const app = express();
const PORT = process.env.PORT || 4000;

<<<<<<< HEAD
// Use environment variable for CORS origin in production for flexibility
const allowedOrigins = [
  "http://localhost:3000",
  "https://task-list-frontend-vr8s.onrender.com",
];

if (process.env.CORS_ORIGIN) {
  allowedOrigins.push(process.env.CORS_ORIGIN);
}
=======
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" 
      ? ["https://task-list-frontend.onrender.com", "https://task-list-app.onrender.com"]
      : "http://localhost:3000",
    credentials: true,
  })
);
>>>>>>> parent of e851630 (fix index/backend)

const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(authMiddleware);

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Task List API is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Task List API",
    version: "1.0.0",
    status: "running",
  });
});

async function startServer() {
  try {
    console.log("Connecting to MongoDB...");
    await connectDB();
    console.log("Connected to MongoDB successfully");

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => ({
        user: req.user,
        isAuthenticated: !!req.user,
      }),
    });

    await server.start();

    // Apply Apollo middleware
    server.applyMiddleware({
      app: app as any,
      path: "/graphql",
    });

    app.listen(PORT, () => {
      console.log("Server is running!");
      console.log(`Backend URL: http://localhost:${PORT}`);
      console.log(`GraphQL Playground: http://localhost:${PORT}/graphql`);
      console.log(`Health Check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
