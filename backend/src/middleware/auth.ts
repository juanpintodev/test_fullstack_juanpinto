import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AWS from "aws-sdk";

interface AuthenticatedRequest extends Request {
  user?: {
    sub: string;
    email: string;
    username: string;
    groups?: string[];
  };
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      // Allow GraphQL introspection queries without authentication
      if (
        req.body &&
        req.body.query &&
        req.body.query.includes("IntrospectionQuery")
      ) {
        return next();
      }

      // For other requests, continue without user context
      req.user = undefined;
      return next();
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify JWT token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret"
    ) as any;

    req.user = {
      sub: decoded.sub,
      email: decoded.email,
      username: decoded.username,
      groups: decoded["cognito:groups"] || [],
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    req.user = undefined;
    next();
  }
};

export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }
  next();
};

export const verifyCognitoToken = async (token: string): Promise<any> => {
  try {
    const cognito = new AWS.CognitoIdentityServiceProvider({
      region: process.env.AWS_REGION || "us-east-1",
    });

    const params = {
      AccessToken: token,
    };

    const result = await cognito.getUser(params).promise();
    return result;
  } catch (error) {
    console.error("Cognito token verification error:", error);
    throw new Error("Invalid token");
  }
};
