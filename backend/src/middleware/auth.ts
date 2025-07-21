import { Request, Response, NextFunction } from "express";
import admin from "../config/firebase";

declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        email: string;
        displayName?: string;
      };
    }
  }
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      req.user = undefined;
      return next();
    }

    const token = authHeader.substring(7);
    const decodedToken = await admin.auth().verifyIdToken(token);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || "",
      displayName: decodedToken.name || undefined,
    };

    next();
  } catch (error) {
    console.error("Auth error:", error);
    req.user = undefined;
    next();
  }
}

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }
  next();
}
