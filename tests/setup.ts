import { MongoMemoryServer } from "mongodb-memory-server";

let mongod: MongoMemoryServer;

export default async function globalSetup(): Promise<void> {
  mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri();
  process.env.JWT_SECRET = "test-secret-key";
  process.env.JWT_EXPIRES_IN = "1h";
  (global as any).__MONGOD__ = mongod;
}