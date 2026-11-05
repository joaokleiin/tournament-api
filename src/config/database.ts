import mongoose from "mongoose";

export async function connectDatabase(uri?: string): Promise<void> {
  const mongoUri = uri ?? process.env.MONGO_URI ?? "";

  if (!mongoUri) {
    throw new Error("MONGO_URI não definida nas variáveis de ambiente.");
  }

  await mongoose.connect(mongoUri);
  console.log("Conectado ao MongoDB");
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
  console.log("Desconectado do MongoDB");
}