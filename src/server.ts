import "dotenv/config";

import app from "./app";
import { connectDatabase } from "./config/database";
const PORT = process.env.PORT ?? 3000;

async function start(): Promise<void> {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
  });
}

start().catch((err) => {
  console.error("Falha ao iniciar o servidor:", err);
  process.exit(1);
});