import express from "express";
import pino from "pino";
import cors from "cors";
import expressPino from "express-pino-logger";
import UserRoutes from "./routes/UserRoutes.js";
import MovieRoutes from "./routes/MovieRoutes.js";

export const logger = pino({ level: "info" });
const expressLogger = expressPino({ logger});

const app = express();
app.use(express.json());
app.use(cors({ origin: true}));
app.use(expressLogger);

app.use(UserRoutes);
app.use(MovieRoutes);

app.listen(5000, () => {
  logger.info("Server started on port 5000");
});
