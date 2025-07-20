const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
require("dotenv").config();

// Import our files
const { connectDB } = require("./config/database");
const { typeDefs } = require("./graphql/schema");
const { resolvers } = require("./graphql/resolvers");
const { authMiddleware } = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(authMiddleware);

// Simple health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
    time: new Date().toISOString(),
  });
});

// Start server function
async function startServer() {
  try {
    // Connect to database
    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connected!");

    // Create GraphQL server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        return {
          user: req.user,
          isAuthenticated: !!req.user,
        };
      },
    });

    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    // Start the server
    app.listen(PORT, () => {
      console.log("Server is running!");
      console.log(`Backend: http://localhost:${PORT}`);
      console.log(`GraphQL: http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();
