const jwt = require("jsonwebtoken");

// Middleware to check authentication
function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    // If no auth header, continue without user
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      req.user = null;
      return next();
    }

    // Get the token from the header
    const token = authHeader.substring(7); // Remove 'Bearer ' part

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

    // Add user info to request
    req.user = {
      sub: decoded.sub,
      email: decoded.email,
      username: decoded.username,
    };

    next();
  } catch (error) {
    console.error("Auth error:", error);
    req.user = null;
    next();
  }
}

// Function to require authentication
function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "You need to be logged in" });
  }
  next();
}

module.exports = { authMiddleware, requireAuth };
