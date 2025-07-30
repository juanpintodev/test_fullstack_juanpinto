// Main entry point for the backend: sets up Express, Apollo Server, and MongoDB connection
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";

import { connectDB } from "./config/database";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { authMiddleware } from "./middleware/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.NODE_ENV === "production" 
      ? ["https://task-list-frontend.onrender.com", "https://task-list-app.onrender.com"]
      : "http://localhost:3000",
    credentials: true,
  })
);

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
    server.applyMiddleware({ app: app as any, path: "/graphql" });

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
