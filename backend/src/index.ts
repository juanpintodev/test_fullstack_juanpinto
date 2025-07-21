// Punto de entrada principal del backend: configura Express, Apollo Server y la conexión a MongoDB
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
    // origin: "http://localhost:3000",
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
