import "./loadEnv";
import express from "express";
import connectDB from "./db/connectDB";
import cors from "cors";
import morgan from "morgan";
import { ok } from "./utils/envelop";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import { clerkMiddleware } from "@clerk/express";
import authRouter from "./routes/auth.route";

async function mainEntryFunction() {
  await connectDB();

  const app = express();

  const corOrigin = (process.env.CORS_ORIGIN || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.use(
    cors({
      origin: corOrigin,
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(morgan("dev"));
  const publishableKey = process.env.CLERK_PUBLISHABLE_KEY;
  const secretKey = process.env.CLERK_SECRET_KEY;

  if (!publishableKey?.trim() || !secretKey?.trim()) {
    throw new Error(
      "Missing CLERK_PUBLISHABLE_KEY or CLERK_SECRET_KEY. Set them in server/.env and restart the process (nodemon does not reload when only .env changes)."
    );
  }

  app.use(
    clerkMiddleware({
      publishableKey,
      secretKey,
    })
  );

  app.get("/health", (_req, res) => {
    return res.status(200).json(
      ok({
        message: "Server is running",
      })
    );
  });

  app.use("/api/v1/auth", authRouter);
  
  app.use(notFound);
  app.use(errorHandler);

  const port = Number(process.env.PORT) || 5000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

mainEntryFunction().catch((err) => {
  console.error("failed to start", err);
  process.exit(1);
});
