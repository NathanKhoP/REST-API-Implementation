import formatResponse from "@/utils/formatResponse";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface JwtPayloadExtended extends jwt.JwtPayload {
  id: string;
  role: string;
}

export interface CustomRequest extends Request {
  user?: JwtPayloadExtended;
}

export const authMiddleware = (
  req: CustomRequest, 
  res: Response, 
  next: NextFunction
) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json(formatResponse("failed", "Access denied. No token provided...", null));
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json(formatResponse("failed", "Access denied. Invalid token format...", null));
      return;
    }

    try {
      // Verify the token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayloadExtended;
      
      if (!decoded || !decoded.id) {
        res.status(401).json(formatResponse("failed", "Invalid token content...", null));
        return;
      }
      
      // Attach user info to request
      req.user = decoded;
      
      // Proceed to next middleware/controller
      next();
    } catch (jwtError) {
      // Handle JWT specific errors
      res.status(401).json(formatResponse("failed", "Invalid or expired token", null));
      return;
    }
  } catch (error) {
    // Catch any other error
    console.error("Auth middleware error:", error);
    res.status(500).json(formatResponse("error", "Authentication error", null));
    return;
  }
};
