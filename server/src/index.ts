import express from "express";
import { config } from "dotenv";
import tasks from "@/routes/tasks";
import connectDb from "@/db/connect";
import { zodMiddleware } from "@/middleware/zod.middleware";
import cors from "cors";
import notFound from "./middleware/notFound";
import errorHandlerMiddleware from "./middleware/errorHandler";

import z from "zod";
config();
const app = express();
const envVariables = z.object({
  PORT: z.string(),
  MONGO_URI: z.string(),
});
envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}

app.use(cors());

// middleware
app.use(express.json());

// routes
app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(zodMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
