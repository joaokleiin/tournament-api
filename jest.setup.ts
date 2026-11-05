import mongoose from "mongoose";

beforeAll(async () => {
  await mongoose.connect(
    "mongodb://admin:eusguri@localhost:27017/tournamentdb_test?authSource=admin"
  );
}, 60000);

afterAll(async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  }
}, 60000);