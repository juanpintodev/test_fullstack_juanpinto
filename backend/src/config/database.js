const mongoose = require("mongoose");

// Connect to MongoDB
async function connectDB() {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MONGODB_URI is not set in environment variables");
    }

    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
}

// Disconnect from MongoDB
async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error disconnecting from database:", error);
  }
}

module.exports = { connectDB, disconnectDB };
