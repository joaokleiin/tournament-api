import mongoose from "mongoose";

export async function setupTestDB(): Promise<void> {
  process.env.JWT_SECRET = "test-secret-key";
  process.env.JWT_EXPIRES_IN = "1h";

  const uri = "mongodb://admin:eusguri@localhost:27017/tournamentdb_test?authSource=admin";

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
}

export async function teardownTestDB(): Promise<void> {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  }
}