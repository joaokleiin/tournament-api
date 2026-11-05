import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { sessionMiddleware } from "./middlewares/sessionMiddleware";
import authRoutes from "./routes/authRoutes";
import sessionRoutes from "./routes/sessionRoutes";
import playerRoutes from "./routes/playerRoutes";
import teamRoutes from "./routes/teamRoutes";
import tournamentRoutes from "./routes/tournamentRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(sessionMiddleware);

// Documentação
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use("/auth", authRoutes);
app.use("/sessao", sessionRoutes);
app.use("/players", playerRoutes);
app.use("/teams", teamRoutes);
app.use("/tournaments", tournamentRoutes);

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(errorHandler);

export default app;