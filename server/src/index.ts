import "reflect-metadata";

import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import connectRedis from "connect-redis";

import { redis } from "./redis.js";
import { connectDB } from "./utils/db.js";
import UserResolvers from "./resolvers/user.resolvers.js";
import {
  COOKIE_AGE,
  COOKIE_NAME,
  FRONT_END_URL,
  PORT,
  SESSION_SECRET,
} from "./constants.js";

declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}

await connectDB();

const app: Express = express();

const RedisStore = connectRedis(session);

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      credentials: true,
      origin: FRONT_END_URL,
    })
  );
}

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

app.use(
  session({
    name: COOKIE_NAME,
    secret: SESSION_SECRET,
    store: new RedisStore({
      client: redis,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: COOKIE_AGE,
    },
  })
);

const schema = await buildSchema({
  resolvers: [UserResolvers],
  authChecker: ({ context: { req } }) => {
    return !!req.session.userId;
  },
  emitSchemaFile: true,
});

const apolloServer = new ApolloServer({
  schema,
  context: ({ req, res }: any) => ({ req, res }),
});

apolloServer.applyMiddleware({
  app,
  cors: false,
});

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
});
