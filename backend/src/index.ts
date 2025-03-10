// src/index.ts
import express, { Express, Request, Response, NextFunction } from "express";
import connDB from "./db-conn";
import cors from "cors";
import formatResponse from "./utils/formatResponse";
import authRoutes from "./router/auth.router";
import foodRouters from "./router/food.router";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// mongodb atlas connection
connDB();

app.get("/", (req: Request, res: Response) => {
  const date = new Date().toLocaleString();
  const response = formatResponse("success", "Hello World", date);
  res.send(response);
});

// routes
app.use("/auth", authRoutes);
app.use("/food", foodRouters);

// Global error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Global error handler caught:", err);
  
  if (res.headersSent) {
    return next(err);
  }  
  res.status(500).json(formatResponse("error", err.message || "An unexpected error occurred", null));
});

// 404 handler for undefined routes
app.use((req: Request, res: Response) => {
  if (!res.headersSent) {
    res.status(404).json(formatResponse("failed", "Route not found", null));
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});