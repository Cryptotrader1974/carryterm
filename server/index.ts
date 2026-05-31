import express from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes.js";
import { startIngestion } from "./ingestion.js";
import { startAlertEngine } from "./alerts.js";
import { setupVite } from "./vite.js";
import { serveStatic } from "./static.js";

const app = express();
app.use(express.json());

const httpServer = createServer(app);

registerRoutes(httpServer, app);

(async () => {
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, httpServer);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT ?? "5000");
  httpServer.listen(port, "0.0.0.0", () => {
    console.log(`[Server] Running on port ${port}`);
    startIngestion();
    startAlertEngine();
  });
})();
