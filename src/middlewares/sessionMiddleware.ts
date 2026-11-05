import session from "express-session";
import MongoStore from "connect-mongo";

export const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET ?? "secret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  }),
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24, // 1 dia
  },
});