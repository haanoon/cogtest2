import { familiesHandler } from "./routes/families";
import { categoriesHandler } from "./routes/categories";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { metricsHandler, trendHandler } from "./routes/forecast";
import { replenishmentHandler } from "./routes/operations";

export function createServer() {
  const app = express();
  app.get("/api/families", familiesHandler);
  app.get("/api/categories", categoriesHandler);
  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Forecasting routes
  app.get("/api/forecast/metrics", metricsHandler);
  app.get("/api/forecast/trend", trendHandler);

  // Operations routes
  app.get("/api/operations/replenishment", replenishmentHandler);

  return app;
}
