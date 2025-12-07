import { Request, Response, NextFunction } from "express";
import { CognitoJwtVerifier } from "aws-jwt-verify";

// Extend the Express Request type to include a user property
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

const userPoolId = process.env.COGNITO_USER_POOL_ID || "us-east-1_DtnocJvlT";
const userPoolClientId = process.env.COGNITO_USER_POOL_CLIENT_ID || "369r0jq8ac35oc8euioocqgrj2";

let verifier: ReturnType<typeof CognitoJwtVerifier.create> | null = null;

try {
  verifier = CognitoJwtVerifier.create({
    userPoolId,
    tokenUse: "access",
    clientId: userPoolClientId,
  });
} catch (error) {
  console.warn(
    "Failed to create Cognito JWT verifier. Auth will not work until Cognito is properly configured:",
    error
  );
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ") && verifier) {
    const token = authHeader.split(" ")[1];
    try {
      const payload = await verifier.verify(token);
      req.user = {
        uid: payload.sub as string,
        email: (payload.email as string) || (payload.username as string) || "",
        displayName: (payload["cognito:username"] || payload.username || payload.name) as string | undefined,
      };
    } catch (error) {
      // Token is invalid or expired, but we don't block the request.
      // GraphQL resolvers will handle authorization.
      console.log("JWT verification failed:", (error as Error).message);
    }
  }
  next();
};