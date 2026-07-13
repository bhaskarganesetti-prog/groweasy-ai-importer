import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import uploadRoutes from "./routes/upload.routes";
import importRoutes from "./routes/import.routes";

const app = express();

// Security
app.use(helmet());

// Allow Frontend Requests
app.use(cors());

// Increase Request Size Limit (Supports Large CSV Imports)
app.use(express.json({ limit: "50mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

// Logging
app.use(morgan("dev"));

// Static Files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/import", importRoutes);

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "GrowEasy AI Importer API is running",
  });
});

export default app;